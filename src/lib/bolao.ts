import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { seedMatches } from '#/lib/world-cup-2026'

type ScoreValue = number | null
type MatchRow = {
  id: string
  matchNumber: number | null
  round: string
  group: string
  homeTeam: string
  awayTeam: string
  homeSource: string | null
  awaySource: string | null
  homeScore: ScoreValue
  awayScore: ScoreValue
  homePenaltyScore?: ScoreValue
  awayPenaltyScore?: ScoreValue
  winnerTeam?: string | null
}

function getOutcome(homeScore: ScoreValue, awayScore: ScoreValue) {
  if (homeScore === null || awayScore === null) return null
  if (homeScore > awayScore) return 'home'
  if (homeScore < awayScore) return 'away'
  return 'draw'
}

function calculatePoints(
  guess: {
    homeScore: number
    awayScore: number
    guessWinnerTeam?: string | null
    match: {
      homeScore: ScoreValue
      awayScore: ScoreValue
      winnerTeam?: string | null
      homeTeam?: string
      awayTeam?: string
    }
  },
  oddsMultiplier = 1,
) {
  const resultHome = guess.match.homeScore
  const resultAway = guess.match.awayScore

  if (resultHome === null || resultAway === null) {
    return { points: 0, hitOutcome: false, hitExact: false, hitWinner: false, oddsMultiplier: 1 }
  }

  const hitOutcome =
    getOutcome(guess.homeScore, guess.awayScore) ===
    getOutcome(resultHome, resultAway)
  const hitExact =
    guess.homeScore === resultHome && guess.awayScore === resultAway

  // Acertou o classificado no mata-mata (+1 ponto)
  const actualWinner = guess.match.winnerTeam
    ?? (resultHome > resultAway ? guess.match.homeTeam : resultAway > resultHome ? guess.match.awayTeam : null)
  const hitWinner =
    !!guess.guessWinnerTeam && !!actualWinner && guess.guessWinnerTeam === actualWinner

  // Odds multiplicam apenas o ponto extra do placar exato, nao o ponto de resultado
  const exactBonus = hitExact ? Math.round(1 * oddsMultiplier) : 0
  const winnerBonus = hitWinner ? 1 : 0
  const points = hitOutcome ? 2 + exactBonus + winnerBonus : 0

  return { points, hitOutcome, hitExact, hitWinner, oddsMultiplier }
}

// Estima as odds pre-jogo com base em quantos jogadores tem o mesmo palpite exato.
// Quanto mais raro o palpite, maior o potencial multiplicador.
function estimatePreMatchOdds(
  matchId: string,
  homeScore: number,
  awayScore: number,
  guessRows: GuessRow[],
): number {
  const matchGuesses = guessRows.filter((g) => g.matchId === matchId)
  if (matchGuesses.length === 0) return 6

  const sameGuess = matchGuesses.filter(
    (g) => g.homeScore === homeScore && g.awayScore === awayScore,
  ).length

  const ratio = sameGuess / matchGuesses.length
  if (ratio > 0.5) return 1
  if (ratio > 0.2) return 2
  if (ratio > 0.1) return 3
  if (ratio > 0.05) return 4
  if (sameGuess > 0) return 5
  return 6
}

// Calcula o multiplicador de odds de um placar exato com base na proporcao
// de jogadores que acertaram. Quanto menor a proporcao, maior o multiplicador.
// So se aplica apos o resultado ser confirmado.
function getOddsMultiplier(
  matchId: string,
  match: { homeScore: ScoreValue; awayScore: ScoreValue },
  guessRows: GuessRow[],
): number {
  if (match.homeScore === null || match.awayScore === null) return 1

  const matchGuesses = guessRows.filter((g) => g.matchId === matchId)
  if (matchGuesses.length === 0) return 5

  const exactHits = matchGuesses.filter(
    (g) => g.homeScore === match.homeScore && g.awayScore === match.awayScore,
  ).length

  const ratio = exactHits / matchGuesses.length

  if (ratio > 0.5) return 1
  if (ratio > 0.2) return 2
  if (ratio > 0.1) return 3
  if (ratio > 0.05) return 4
  if (exactHits > 0) return 5
  return 6 // ninguem acertou
}

async function getSessionUser() {
  const [{ getRequestHeaders }, { auth }] = await Promise.all([
    import('@tanstack/react-start/server'),
    import('#/lib/auth'),
  ])
  const session = await auth.api.getSession({
    headers: getRequestHeaders(),
  })

  return session?.user ?? null
}

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

function isAdminEmail(email?: string | null) {
  if (!email) return false

  return getAdminEmails().includes(email.toLowerCase())
}

async function requireAdminUser() {
  const sessionUser = await getSessionUser()

  if (!sessionUser) {
    throw new Error('Voce precisa entrar para acessar o admin.')
  }

  if (!isAdminEmail(sessionUser.email)) {
    throw new Error('Seu email nao tem permissao de admin.')
  }

  return sessionUser
}

async function ensureSeedMatches() {
  const [{ eq }, { db }, { matches }] = await Promise.all([
    import('drizzle-orm'),
    import('#/db'),
    import('#/db/schema'),
  ])

  await db.insert(matches).values(seedMatches).onConflictDoNothing()

  const existingSeeds = await db
    .select({
      id: matches.id,
      matchNumber: matches.matchNumber,
      round: matches.round,
      group: matches.group,
      homeTeam: matches.homeTeam,
      awayTeam: matches.awayTeam,
      homeSource: matches.homeSource,
      awaySource: matches.awaySource,
      venue: matches.venue,
      startsAt: matches.startsAt,
    })
    .from(matches)

  const existingById = new Map(existingSeeds.map((match) => [match.id, match]))

  for (const seed of seedMatches) {
    const existing = existingById.get(seed.id)
    if (!existing) continue

    if (existing.round === 'Fase de grupos') {
      const shouldUpdate =
        existing.matchNumber !== seed.matchNumber ||
        existing.group !== seed.group ||
        existing.homeTeam !== seed.homeTeam ||
        existing.awayTeam !== seed.awayTeam ||
        existing.venue !== seed.venue ||
        existing.startsAt.getTime() !== seed.startsAt.getTime()

      if (!shouldUpdate) continue

      await db
        .update(matches)
        .set({
          matchNumber: seed.matchNumber,
          group: seed.group,
          homeTeam: seed.homeTeam,
          awayTeam: seed.awayTeam,
          venue: seed.venue,
          startsAt: seed.startsAt,
          updatedAt: new Date(),
        })
        .where(eq(matches.id, seed.id))
    } else {
      // Mata-mata: sincroniza times quando o seed tem times confirmados
      // (nomes reais, nao placeholders como "1º Grupo A")
      const isPlaceholder = (name: string) =>
        /^\d[ºo]/.test(name) || /^[WL]\d+/.test(name) || name.includes('Grupo') || name.includes('Vencedor')

      const seedHasHomeTeam = !isPlaceholder(seed.homeTeam)
      const seedHasAwayTeam = !isPlaceholder(seed.awayTeam)

      const update: Record<string, unknown> = {}
      if (seedHasHomeTeam && existing.homeTeam !== seed.homeTeam) update.homeTeam = seed.homeTeam
      if (seedHasAwayTeam && existing.awayTeam !== seed.awayTeam) update.awayTeam = seed.awayTeam

      if (Object.keys(update).length === 0) continue

      await db
        .update(matches)
        .set({ ...update, updatedAt: new Date() })
        .where(eq(matches.id, seed.id))
    }
  }
}

function getMatchWinner(match: MatchRow) {
  if (match.winnerTeam) return match.winnerTeam
  if (match.homeScore === null || match.awayScore === null) return null
  if (match.homeScore === match.awayScore) return null

  return match.homeScore > match.awayScore ? match.homeTeam : match.awayTeam
}

function getMatchLoser(match: MatchRow) {
  if (match.winnerTeam) {
    if (match.winnerTeam === match.homeTeam) return match.awayTeam
    if (match.winnerTeam === match.awayTeam) return match.homeTeam

    return null
  }

  if (match.homeScore === null || match.awayScore === null) return null
  if (match.homeScore === match.awayScore) return null

  return match.homeScore < match.awayScore ? match.homeTeam : match.awayTeam
}

function getCompletedGroupStandings(
  matchRows: MatchRow[],
  groupLetter: string,
) {
  const group = `Grupo ${groupLetter}`
  const groupMatches = matchRows.filter(
    (match) => match.round === 'Fase de grupos' && match.group === group,
  )

  if (
    groupMatches.length !== 6 ||
    groupMatches.some(
      (match) => match.homeScore === null || match.awayScore === null,
    )
  ) {
    return null
  }

  const table = new Map<
    string,
    { team: string; points: number; goalsFor: number; goalsAgainst: number }
  >()

  for (const match of groupMatches) {
    for (const team of [match.homeTeam, match.awayTeam]) {
      if (!table.has(team)) {
        table.set(team, { team, points: 0, goalsFor: 0, goalsAgainst: 0 })
      }
    }

    const home = table.get(match.homeTeam)!
    const away = table.get(match.awayTeam)!
    const homeScore = match.homeScore!
    const awayScore = match.awayScore!

    home.goalsFor += homeScore
    home.goalsAgainst += awayScore
    away.goalsFor += awayScore
    away.goalsAgainst += homeScore

    if (homeScore > awayScore) {
      home.points += 3
    } else if (homeScore < awayScore) {
      away.points += 3
    } else {
      home.points += 1
      away.points += 1
    }
  }

  return [...table.values()].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points

    const goalDifferenceA = a.goalsFor - a.goalsAgainst
    const goalDifferenceB = b.goalsFor - b.goalsAgainst

    if (goalDifferenceB !== goalDifferenceA)
      return goalDifferenceB - goalDifferenceA
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor

    return a.team.localeCompare(b.team)
  })
}

function resolveTeamSource(source: string | null, matchRows: MatchRow[]) {
  if (!source) return null
  if (source.startsWith('3')) return null

  const groupSource = source.match(/^([12])([A-L])$/)

  if (groupSource) {
    const [, position, groupLetter] = groupSource
    const standings = getCompletedGroupStandings(matchRows, groupLetter)

    return standings?.[Number(position) - 1]?.team ?? null
  }

  const knockoutSource = source.match(/^([WL])(\d+)$/)

  if (knockoutSource) {
    const [, type, matchNumber] = knockoutSource
    const match = matchRows.find(
      (row) => row.matchNumber === Number(matchNumber),
    )

    if (!match) return null

    return type === 'W' ? getMatchWinner(match) : getMatchLoser(match)
  }

  return null
}

async function refreshKnockoutTeams(matchRows: MatchRow[]) {
  const [{ eq }, { db }, { matches }] = await Promise.all([
    import('drizzle-orm'),
    import('#/db'),
    import('#/db/schema'),
  ])

  for (const match of matchRows) {
    if (match.round === 'Fase de grupos') continue

    const nextHomeTeam = resolveTeamSource(match.homeSource, matchRows)
    const nextAwayTeam = resolveTeamSource(match.awaySource, matchRows)
    const update: Partial<{
      homeTeam: string
      awayTeam: string
      updatedAt: Date
    }> = {}

    if (nextHomeTeam && nextHomeTeam !== match.homeTeam) {
      update.homeTeam = nextHomeTeam
      match.homeTeam = nextHomeTeam
    }

    if (nextAwayTeam && nextAwayTeam !== match.awayTeam) {
      update.awayTeam = nextAwayTeam
      match.awayTeam = nextAwayTeam
    }

    if (Object.keys(update).length === 0) continue

    await db
      .update(matches)
      .set({ ...update, updatedAt: new Date() })
      .where(eq(matches.id, match.id))
  }
}

type GuessRow = {
  userId: string
  matchId: string
  homeScore: number
  awayScore: number
  guessWinnerTeam?: string | null
}

type ChallengeRow = {
  id: string
  matchId: string
  challengerId: string
  opponentId: string
  stake: number
  status: string
}

type PlayerRow = { id: string; name: string | null; email: string }

// Resolve um X1 aceito em partida finalizada. Retorna o vencedor (userId) ou
// null em caso de push (empate de pontos e de placar exato).
function resolveX1Winner(
  challenge: ChallengeRow,
  match: MatchRow,
  guessByKey: Map<string, GuessRow>,
) {
  const challengerGuess = guessByKey.get(
    `${challenge.challengerId}:${challenge.matchId}`,
  )
  const opponentGuess = guessByKey.get(
    `${challenge.opponentId}:${challenge.matchId}`,
  )
  const challengerResult = challengerGuess
    ? calculatePoints({
        homeScore: challengerGuess.homeScore,
        awayScore: challengerGuess.awayScore,
        match,
      })
    : { points: 0, hitExact: false, hitOutcome: false }
  const opponentResult = opponentGuess
    ? calculatePoints({
        homeScore: opponentGuess.homeScore,
        awayScore: opponentGuess.awayScore,
        match,
      })
    : { points: 0, hitExact: false, hitOutcome: false }

  let winnerId: string | null
  if (challengerResult.points !== opponentResult.points) {
    winnerId =
      challengerResult.points > opponentResult.points
        ? challenge.challengerId
        : challenge.opponentId
  } else if (challengerResult.hitExact !== opponentResult.hitExact) {
    winnerId = challengerResult.hitExact
      ? challenge.challengerId
      : challenge.opponentId
  } else {
    winnerId = null
  }

  const loserId = winnerId
    ? winnerId === challenge.challengerId
      ? challenge.opponentId
      : challenge.challengerId
    : null
  const loserResult =
    loserId === challenge.challengerId ? challengerResult : opponentResult

  return { winnerId, loserId, loserPoints: loserResult.points }
}

type ChampionPickRow = {
  userId: string
  team: string
  bonusPoints: number
}

// Fases do torneio em ordem, com o bonus do "Guru do Futebol" disponivel
// enquanto aquela fase e a mais avancada ja iniciada. A Final bloqueia palpites.
const CHAMPION_PHASES = [
  { round: 'Fase de grupos', points: 50 },
  { round: '16 avos de final', points: 40 },
  { round: 'Oitavas de final', points: 30 },
  { round: 'Quartas de final', points: 20 },
  { round: 'Semifinal', points: 10 },
] as const

// Fase atual do torneio = a mais avancada que ja teve algum jogo iniciado.
// Quando a Final comeca, o palpite de campeao fica bloqueado.
function getChampionPhase(matchRows: { round: string; startsAt: Date }[]) {
  const now = Date.now()
  const hasStarted = (round: string) =>
    matchRows.some(
      (match) => match.round === round && match.startsAt.getTime() <= now,
    )

  if (hasStarted('Final')) {
    return { label: 'Final', points: null as number | null, locked: true }
  }

  let current: { round: string; points: number } = CHAMPION_PHASES[0]
  for (const phase of CHAMPION_PHASES) {
    if (hasStarted(phase.round)) current = phase
  }

  return {
    label: current.round,
    points: current.points as number | null,
    locked: false,
  }
}

// Campeao = vencedor da Final, quando o resultado ja foi confirmado.
function getChampionTeam(matchById: Map<string, MatchRow>) {
  for (const match of matchById.values()) {
    if (
      match.round === 'Final' &&
      match.homeScore !== null &&
      match.awayScore !== null
    ) {
      return getMatchWinner(match)
    }
  }

  return null
}

// Ranking principal: soma pontos dos palpites e bonus de campeao.
type CardRow = {
  userId: string
  cardId: string
  usedOnMatchId: string | null
  usedAt: Date | null
}

// X1 NAO afeta mais o ranking principal — tem seu proprio ranking em /x1.
function computeStandings(
  userRows: PlayerRow[],
  guessRows: GuessRow[],
  matchById: Map<string, MatchRow>,
  _challengeRows: ChallengeRow[],
  championPicks: ChampionPickRow[] = [],
  cardRows: CardRow[] = [],
) {
  const tally = new Map(
    userRows.map((player) => [
      player.id,
      {
        id: player.id,
        name: player.name || player.email,
        guessesCount: 0,
        points: 0,
        exactHits: 0,
        outcomeHits: 0,
      },
    ]),
  )

  // Pre-calcula odds por partida com base em todos os palpites
  const oddsMultiplierByMatch = new Map<string, number>()
  for (const [matchId, match] of matchById) {
    oddsMultiplierByMatch.set(
      matchId,
      getOddsMultiplier(matchId, match, guessRows),
    )
  }

  // Indice de cartas usadas: userId:matchId -> cardId[]
  const cardsByUserMatch = new Map<string, string[]>()
  for (const card of cardRows) {
    if (!card.usedAt || !card.usedOnMatchId) continue
    const key = `${card.userId}:${card.usedOnMatchId}`
    if (!cardsByUserMatch.has(key)) cardsByUserMatch.set(key, [])
    cardsByUserMatch.get(key)!.push(card.cardId)
  }

  // Primeira passagem: calcula pontos base com odds e efeitos de carta
  const pointsEntries: {
    userId: string
    matchId: string
    basePoints: number
    cards: string[]
  }[] = []

  for (const guess of guessRows) {
    const entry = tally.get(guess.userId)
    const match = matchById.get(guess.matchId)
    if (!entry || !match) continue

    entry.guessesCount += 1
    const oddsMultiplier = oddsMultiplierByMatch.get(guess.matchId) ?? 1
    const result = calculatePoints(
      { homeScore: guess.homeScore, awayScore: guess.awayScore, guessWinnerTeam: guess.guessWinnerTeam, match },
      oddsMultiplier,
    )

    const cards = cardsByUserMatch.get(`${guess.userId}:${guess.matchId}`) ?? []
    let pts = result.points

    if (cards.includes('shield') && pts < 0) pts = 0
    if (cards.includes('momentum') && result.hitOutcome) pts += 2
    if (cards.includes('exact_boost') && result.hitExact) pts += 2
    if (cards.includes('double_or_nothing')) pts = result.hitOutcome ? pts * 2 : 0

    pointsEntries.push({
      userId: guess.userId,
      matchId: guess.matchId,
      basePoints: pts,
      cards,
    })

    entry.points += pts
    entry.exactHits += result.hitExact ? 1 : 0
    entry.outcomeHits += result.hitOutcome ? 1 : 0
  }

  // Aplicar carta "comeback": se usuario esta em ultimo, dobra seus pontos desta partida
  // (precisa de uma segunda passagem apos saber a posicao relativa)
  const tempRanking = [...tally.values()].sort(
    (a, b) => b.points - a.points,
  )
  const lastPlaceId =
    tempRanking.length > 0
      ? tempRanking[tempRanking.length - 1].id
      : null

  if (lastPlaceId) {
    for (const pe of pointsEntries) {
      if (pe.userId !== lastPlaceId) continue
      if (!pe.cards.includes('comeback')) continue
      const entry = tally.get(pe.userId)
      if (entry) entry.points += pe.basePoints // adiciona mais uma vez (dobro)
    }
  }

  // Aplicar carta "steal": rouba 1 ponto do lider por cada carta usada
  const stealCount = new Map<string, number>()
  for (const card of cardRows) {
    if (card.cardId !== 'steal' || !card.usedAt) continue
    const match = card.usedOnMatchId ? matchById.get(card.usedOnMatchId) : null
    if (!match || match.homeScore === null) continue
    stealCount.set(card.userId, (stealCount.get(card.userId) ?? 0) + 1)
  }

  if (stealCount.size > 0) {
    // Identifica o lider temporario
    const sorted = [...tally.values()].sort((a, b) => b.points - a.points)
    const leaderId = sorted.at(0)?.id
    if (leaderId) {
      const leaderEntry = tally.get(leaderId)!
      for (const [userId, count] of stealCount) {
        const thiefEntry = tally.get(userId)
        if (!thiefEntry || userId === leaderId) continue
        leaderEntry.points -= count
        thiefEntry.points += count
      }
    }
  }

  const championTeam = getChampionTeam(matchById)
  if (championTeam) {
    for (const pick of championPicks) {
      if (pick.team !== championTeam) continue
      const entry = tally.get(pick.userId)
      if (entry) entry.points += pick.bonusPoints
    }
  }

  return [...tally.values()]
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      if (b.exactHits !== a.exactHits) return b.exactHits - a.exactHits
      if (b.outcomeHits !== a.outcomeHits) return b.outcomeHits - a.outcomeHits
      return a.name.localeCompare(b.name)
    })
    .map((player, index) => ({ ...player, position: index + 1 }))
}

// Ranking exclusivo de X1: vencedor ganha o stake; perdedor perde o stake.
// Pontos de palpite nao sao transferidos — so o stake.
function computeX1Standings(
  userRows: PlayerRow[],
  challengeRows: ChallengeRow[],
  matchById: Map<string, MatchRow>,
  guessRows: GuessRow[],
  cardRows: { userId: string; cardId: string; acquiredRound: string }[] = [],
) {
  const guessByKey = new Map<string, GuessRow>()
  for (const guess of guessRows) {
    guessByKey.set(`${guess.userId}:${guess.matchId}`, guess)
  }

  const tally = new Map(
    userRows.map((player) => [
      player.id,
      {
        id: player.id,
        name: player.name || player.email,
        wins: 0,
        losses: 0,
        draws: 0,
        points: 0,
      },
    ]),
  )

  const duels: {
    matchId: string
    challengerId: string
    challengerName: string
    opponentId: string
    opponentName: string
    stake: number
    winnerId: string | null
    status: string
  }[] = []

  for (const challenge of challengeRows) {
    if (challenge.status !== 'accepted') continue
    const match = matchById.get(challenge.matchId)
    if (!match || match.homeScore === null || match.awayScore === null) continue

    const { winnerId, loserId } = resolveX1Winner(challenge, match, guessByKey)

    const challengerEntry = tally.get(challenge.challengerId)
    const opponentEntry = tally.get(challenge.opponentId)

    if (winnerId && loserId) {
      if (challengerEntry) {
        if (winnerId === challenge.challengerId) {
          challengerEntry.wins += 1
          challengerEntry.points += challenge.stake
        } else {
          challengerEntry.losses += 1
          challengerEntry.points -= challenge.stake
        }
      }
      if (opponentEntry) {
        if (winnerId === challenge.opponentId) {
          opponentEntry.wins += 1
          opponentEntry.points += challenge.stake
        } else {
          opponentEntry.losses += 1
          opponentEntry.points -= challenge.stake
        }
      }
    } else {
      if (challengerEntry) challengerEntry.draws += 1
      if (opponentEntry) opponentEntry.draws += 1
    }

    duels.push({
      matchId: challenge.matchId,
      challengerId: challenge.challengerId,
      challengerName: tally.get(challenge.challengerId)?.name ?? '',
      opponentId: challenge.opponentId,
      opponentName: tally.get(challenge.opponentId)?.name ?? '',
      stake: challenge.stake,
      winnerId,
      status: match.homeScore !== null ? 'resolved' : 'pending',
    })
  }

  // Deduz custo das cartas compradas com pontos X1
  for (const card of cardRows) {
    if (card.acquiredRound !== 'compra') continue
    const def = CARDS.find((c) => c.id === card.cardId)
    if (!def) continue
    const entry = tally.get(card.userId)
    if (entry) entry.points -= def.cost
  }

  const standings = [...tally.values()]
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      if (b.wins !== a.wins) return b.wins - a.wins
      return a.name.localeCompare(b.name)
    })
    .map((player, index) => ({ ...player, position: index + 1 }))

  return { standings, duels }
}

export const getBolaoData = createServerFn({ method: 'GET' }).handler(
  async () => {
    await ensureSeedMatches()

    const [
      { asc },
      { db },
      {
        guesses,
        matches,
        user,
        rankingSnapshots,
        x1Challenges,
        championPicks,
        userCards,
      },
    ] = await Promise.all([
      import('drizzle-orm'),
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()

    const [
      matchRows,
      guessRows,
      userRows,
      snapshotRows,
      challengeRows,
      championPickRows,
      cardRows,
    ] = await Promise.all([
      db.select().from(matches).orderBy(asc(matches.startsAt)),
      db
        .select({
          id: guesses.id,
          userId: guesses.userId,
          matchId: guesses.matchId,
          homeScore: guesses.homeScore,
          awayScore: guesses.awayScore,
          guessWinnerTeam: guesses.guessWinnerTeam,
        })
        .from(guesses),
      db.select({ id: user.id, name: user.name, email: user.email }).from(user),
      db
        .select({
          userId: rankingSnapshots.userId,
          position: rankingSnapshots.position,
        })
        .from(rankingSnapshots),
      db
        .select({
          id: x1Challenges.id,
          matchId: x1Challenges.matchId,
          challengerId: x1Challenges.challengerId,
          opponentId: x1Challenges.opponentId,
          stake: x1Challenges.stake,
          status: x1Challenges.status,
        })
        .from(x1Challenges),
      db
        .select({
          userId: championPicks.userId,
          team: championPicks.team,
          bonusPoints: championPicks.bonusPoints,
        })
        .from(championPicks),
      db
        .select({
          id: userCards.id,
          userId: userCards.userId,
          cardId: userCards.cardId,
          usedOnMatchId: userCards.usedOnMatchId,
          usedAt: userCards.usedAt,
        })
        .from(userCards),
    ])

    await refreshKnockoutTeams(matchRows)

    const matchById = new Map(matchRows.map((match) => [match.id, match]))
    const guessByKey = new Map<string, GuessRow>()
    for (const guess of guessRows) {
      guessByKey.set(`${guess.userId}:${guess.matchId}`, guess)
    }
    const previousPositionByUser = new Map(
      snapshotRows.map((snapshot) => [snapshot.userId, snapshot.position]),
    )
    const nameById = new Map(
      userRows.map((player) => [player.id, player.name || player.email]),
    )

    const standings = computeStandings(
      userRows,
      guessRows,
      matchById,
      challengeRows,
      championPickRows,
      cardRows,
    ).map((player) => {
      const previousPosition = previousPositionByUser.get(player.id) ?? null
      return {
        ...player,
        previousPosition,
        delta: previousPosition === null ? 0 : previousPosition - player.position,
      }
    })

    const currentUserGuesses = new Map(
      guessRows
        .filter((guess) => guess.userId === sessionUser?.id)
        .map((guess) => [guess.matchId, guess]),
    )

    // Cartas do usuario atual: disponiveis e usadas por partida
    const userAvailableCards = sessionUser
      ? cardRows
          .filter((c) => c.userId === sessionUser.id && !c.usedAt)
          .map((c) => {
            const def = CARDS.find((card) => card.id === c.cardId)
            return {
              instanceId: c.id,
              cardId: c.cardId as CardId,
              name: def?.name ?? c.cardId,
              icon: def?.icon ?? '🃏',
              rarity: (def?.rarity ?? 'common') as CardRarity,
            }
          })
      : []

    const userCardsUsedByMatch = new Map<string, string[]>()
    if (sessionUser) {
      for (const c of cardRows) {
        if (c.userId !== sessionUser.id || !c.usedAt || !c.usedOnMatchId) continue
        if (!userCardsUsedByMatch.has(c.usedOnMatchId))
          userCardsUsedByMatch.set(c.usedOnMatchId, [])
        userCardsUsedByMatch.get(c.usedOnMatchId)!.push(c.cardId)
      }
    }

    return {
      user: sessionUser
        ? {
            id: sessionUser.id,
            name: sessionUser.name,
            email: sessionUser.email,
            isAdmin: isAdminEmail(sessionUser.email),
          }
        : null,
      players: userRows.map((player) => ({
        id: player.id,
        name: player.name || player.email,
      })),
      userAvailableCards,
      matches: matchRows.map((match) => {
        const userGuess = currentUserGuesses.get(match.id)
        const hasResult = match.homeScore !== null && match.awayScore !== null
        const x1 = sessionUser
          ? buildMatchX1View(
              match,
              sessionUser.id,
              challengeRows,
              nameById,
              guessByKey,
              hasResult,
            )
          : null
        const oddsMultiplier = hasResult
          ? getOddsMultiplier(match.id, match, guessRows)
          : null
        const estimatedOdds =
          !hasResult && userGuess
            ? estimatePreMatchOdds(
                match.id,
                userGuess.homeScore,
                userGuess.awayScore,
                guessRows,
              )
            : null
        const cardsUsed = userCardsUsedByMatch.get(match.id) ?? []

        return {
          ...match,
          startsAt: match.startsAt.toISOString(),
          createdAt: match.createdAt.toISOString(),
          updatedAt: match.updatedAt.toISOString(),
          oddsMultiplier,
          estimatedOdds,
          cardsUsed,
          guess: userGuess
            ? {
                homeScore: userGuess.homeScore,
                awayScore: userGuess.awayScore,
                guessWinnerTeam: userGuess.guessWinnerTeam,
                points: calculatePoints(
                  {
                    homeScore: userGuess.homeScore,
                    awayScore: userGuess.awayScore,
                    guessWinnerTeam: userGuess.guessWinnerTeam,
                    match,
                  },
                  oddsMultiplier ?? 1,
                ).points,
              }
            : null,
          x1,
        }
      }),
      standings,
    }
  },
)

// Monta a visão de X1 do usuário atual para uma partida: convites recebidos,
// enviados, o duelo aceito e o resultado quando a partida já foi finalizada.
function buildMatchX1View(
  match: MatchRow,
  currentUserId: string,
  challengeRows: ChallengeRow[],
  nameById: Map<string, string>,
  guessByKey: Map<string, GuessRow>,
  hasResult: boolean,
) {
  const matchChallenges = challengeRows.filter(
    (challenge) =>
      challenge.matchId === match.id &&
      (challenge.challengerId === currentUserId ||
        challenge.opponentId === currentUserId),
  )

  const active = matchChallenges.find(
    (challenge) =>
      challenge.status === 'pending' || challenge.status === 'accepted',
  )

  let accepted: {
    id: string
    opponentName: string
    stake: number
    outcome: 'won' | 'lost' | 'push' | null
    delta: number
  } | null = null
  let incoming: { id: string; challengerName: string; stake: number } | null =
    null
  let outgoing: { id: string; opponentName: string; stake: number } | null =
    null

  if (active) {
    const isChallenger = active.challengerId === currentUserId
    const otherId = isChallenger ? active.opponentId : active.challengerId
    const otherName = nameById.get(otherId) ?? 'Jogador'

    if (active.status === 'accepted') {
      let outcome: 'won' | 'lost' | 'push' | null = null
      let delta = 0
      if (hasResult) {
        const { winnerId, loserId, loserPoints } = resolveX1Winner(
          active,
          match,
          guessByKey,
        )
        if (!winnerId) {
          outcome = 'push'
        } else if (winnerId === currentUserId) {
          outcome = 'won'
          delta = active.stake
        } else if (loserId === currentUserId) {
          outcome = 'lost'
          delta = -(active.stake + loserPoints)
        }
      }
      accepted = {
        id: active.id,
        opponentName: otherName,
        stake: active.stake,
        outcome,
        delta,
      }
    } else if (isChallenger) {
      outgoing = { id: active.id, opponentName: otherName, stake: active.stake }
    } else {
      incoming = {
        id: active.id,
        challengerName: otherName,
        stake: active.stake,
      }
    }
  }

  return { accepted, incoming, outgoing }
}

export const getAdminData = createServerFn({ method: 'GET' }).handler(
  async () => {
    await ensureSeedMatches()

    const [{ asc }, { db }, { matches }] = await Promise.all([
      import('drizzle-orm'),
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await requireAdminUser()
    const matchRows = await db
      .select()
      .from(matches)
      .orderBy(asc(matches.startsAt))

    await refreshKnockoutTeams(matchRows)

    return {
      user: {
        id: sessionUser.id,
        name: sessionUser.name,
        email: sessionUser.email,
      },
      matches: matchRows.map((match) => ({
        ...match,
        startsAt: match.startsAt.toISOString(),
        createdAt: match.createdAt.toISOString(),
        updatedAt: match.updatedAt.toISOString(),
        resultConfirmedAt: match.resultConfirmedAt?.toISOString() ?? null,
      })),
    }
  },
)

export const saveGuess = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      matchId: z.string().min(1),
      homeScore: z.number().int().min(0).max(30),
      awayScore: z.number().int().min(0).max(30),
      guessWinnerTeam: z.string().min(1).nullable().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await ensureSeedMatches()

    const [{ eq }, { db }, { guesses, matches }] = await Promise.all([
      import('drizzle-orm'),
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()

    if (!sessionUser) {
      throw new Error('Voce precisa entrar para salvar um palpite.')
    }

    const matchRows = await db
      .select()
      .from(matches)
      .where(eq(matches.id, data.matchId))
      .limit(1)
    const match = matchRows.at(0)

    if (!match) {
      throw new Error('Jogo nao encontrado.')
    }

    if (match.startsAt.getTime() <= Date.now()) {
      throw new Error('Palpites ficam bloqueados depois do inicio do jogo.')
    }

    const isKnockout = match.round !== 'Fase de grupos'

    // Em jogos de mata-mata com placar empatado, o classificado e obrigatorio
    if (isKnockout && data.homeScore === data.awayScore && !data.guessWinnerTeam) {
      throw new Error('No empate, escolha quem avança nos pênaltis.')
    }

    // guessWinnerTeam so se aplica a mata-mata
    const guessWinnerTeam = isKnockout ? (data.guessWinnerTeam ?? null) : null

    await db
      .insert(guesses)
      .values({
        id: crypto.randomUUID(),
        userId: sessionUser.id,
        matchId: data.matchId,
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        guessWinnerTeam,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [guesses.userId, guesses.matchId],
        set: {
          homeScore: data.homeScore,
          awayScore: data.awayScore,
          guessWinnerTeam,
          updatedAt: new Date(),
        },
      })

    return { ok: true }
  })

export const saveMatchResult = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      matchId: z.string().min(1),
      homeScore: z.number().int().min(0).max(30).nullable(),
      awayScore: z.number().int().min(0).max(30).nullable(),
      homePenaltyScore: z.number().int().min(0).max(30).nullable(),
      awayPenaltyScore: z.number().int().min(0).max(30).nullable(),
      winnerTeam: z.string().min(1).nullable(),
    }),
  )
  .handler(async ({ data }) => {
    await ensureSeedMatches()
    await requireAdminUser()

    const [{ eq }, { db }, { matches }] = await Promise.all([
      import('drizzle-orm'),
      import('#/db'),
      import('#/db/schema'),
    ])

    const matchRows = await db
      .select()
      .from(matches)
      .where(eq(matches.id, data.matchId))
      .limit(1)
    const match = matchRows.at(0)

    if (!match) {
      throw new Error('Jogo nao encontrado.')
    }

    // Guarda as posicoes atuais antes de aplicar o resultado, para as setas
    // de "subiu/caiu" refletirem o impacto deste jogo.
    await snapshotStandings()

    const isClearing = data.homeScore === null && data.awayScore === null

    if (isClearing) {
      await db
        .update(matches)
        .set({
          homeScore: null,
          awayScore: null,
          homePenaltyScore: null,
          awayPenaltyScore: null,
          winnerTeam: null,
          resultStatus: 'scheduled',
          resultSource: null,
          resultConfirmedAt: null,
          updatedAt: new Date(),
        })
        .where(eq(matches.id, data.matchId))

      return { ok: true }
    }

    if (data.homeScore === null || data.awayScore === null) {
      throw new Error('Informe os dois placares ou limpe os dois campos.')
    }

    const hasPenaltyScore =
      data.homePenaltyScore !== null || data.awayPenaltyScore !== null

    if (
      hasPenaltyScore &&
      (data.homePenaltyScore === null || data.awayPenaltyScore === null)
    ) {
      throw new Error('Informe os dois placares de penalti.')
    }

    if (hasPenaltyScore && data.homeScore !== data.awayScore) {
      throw new Error('Penaltis so fazem sentido quando o jogo empata.')
    }

    const isKnockout = match.round !== 'Fase de grupos'
    let winnerTeam: string | null = null

    if (isKnockout) {
      if (data.homeScore > data.awayScore) {
        winnerTeam = match.homeTeam
      } else if (data.homeScore < data.awayScore) {
        winnerTeam = match.awayTeam
      } else {
        if (![match.homeTeam, match.awayTeam].includes(data.winnerTeam || '')) {
          throw new Error('Escolha o classificado no jogo de mata-mata.')
        }

        winnerTeam = data.winnerTeam
      }
    }

    if (hasPenaltyScore) {
      const homePenaltyScore = data.homePenaltyScore!
      const awayPenaltyScore = data.awayPenaltyScore!

      if (homePenaltyScore === awayPenaltyScore) {
        throw new Error('Placar de penaltis nao pode terminar empatado.')
      }

      const penaltyWinner =
        homePenaltyScore > awayPenaltyScore ? match.homeTeam : match.awayTeam

      if (winnerTeam && winnerTeam !== penaltyWinner) {
        throw new Error('Classificado precisa bater com os penaltis.')
      }

      winnerTeam = penaltyWinner
    }

    await db
      .update(matches)
      .set({
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        homePenaltyScore: data.homePenaltyScore,
        awayPenaltyScore: data.awayPenaltyScore,
        winnerTeam,
        resultStatus: 'confirmed',
        resultSource: 'manual',
        resultConfirmedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(matches.id, data.matchId))

    await distributeRoundCards(match.round)
    await evaluateAllMissions()

    return { ok: true }
  })

// Catalogo de missoes disponíveis no bolao
export const MISSIONS = [
  {
    id: 'hat_trick',
    name: 'Hat-trick',
    description: 'Acerte o resultado de 3 partidas seguidas',
    icon: '🎩',
    goal: 3,
    reward: '1 Carta Rara',
    rewardRarity: 'rare' as const,
  },
  {
    id: 'sniper',
    name: 'Sniper',
    description: 'Acerte 3 placares exatos',
    icon: '🎯',
    goal: 3,
    reward: '1 Carta Rara',
    rewardRarity: 'rare' as const,
  },
  {
    id: 'x1_king',
    name: 'Rei do X1',
    description: 'Ganhe 5 duelos X1',
    icon: '⚔️',
    goal: 5,
    reward: '1 Carta Lendária',
    rewardRarity: 'legendary' as const,
  },
  {
    id: 'underdog',
    name: 'Azarão',
    description: 'Acerte um placar com odds de 3x ou mais',
    icon: '🦁',
    goal: 1,
    reward: '1 Carta Lendária',
    rewardRarity: 'legendary' as const,
  },
  {
    id: 'gold_sequence',
    name: 'Sequência de Ouro',
    description: 'Acerte o resultado de 5 partidas consecutivas',
    icon: '⭐',
    goal: 5,
    reward: '1 Carta Lendária',
    rewardRarity: 'legendary' as const,
  },
  {
    id: 'double_exact',
    name: 'Duplo Craque',
    description: 'Acerte 2 placares exatos no mesmo dia',
    icon: '🔥',
    goal: 2,
    reward: '1 Carta Comum',
    rewardRarity: 'common' as const,
  },
] as const

type MissionId = (typeof MISSIONS)[number]['id']

// Missoes so contam partidas a partir desta data
const MISSIONS_START_DATE = new Date('2026-06-25T00:00:00.000Z')

// Catalogo de cartas especiais
export const CARDS = [
  {
    id: 'double_or_nothing',
    name: 'Dobro ou Nada',
    description:
      'Se acertar o resultado, dobra os pontos da partida. Se errar, perde os pontos normais também.',
    icon: '🎲',
    rarity: 'rare' as const,
    cost: 5,
  },
  {
    id: 'shield',
    name: 'Escudo X1',
    description:
      'Use antes de um duelo X1. Se você perder, a aposta é devolvida — você não perde pontos.',
    icon: '🛡️',
    rarity: 'rare' as const,
    cost: 5,
  },
  {
    id: 'momentum',
    name: 'Ímpeto',
    description: 'Ganhe +2 pontos extras se acertar o resultado desta partida.',
    icon: '⚡',
    rarity: 'rare' as const,
    cost: 5,
  },
  {
    id: 'guru_vision',
    name: 'Visão do Guru',
    description:
      'Revela o palpite de um adversário aleatório nesta partida antes de você confirmar o seu.',
    icon: '👁️',
    rarity: 'common' as const,
    cost: 1,
  },
  {
    id: 'lucky_double',
    name: 'Sorte em Dobro',
    description:
      'Registre dois palpites diferentes nesta partida. Conta o que tiver mais pontos.',
    icon: '🍀',
    rarity: 'legendary' as const,
    cost: 10,
  },
  {
    id: 'steal',
    name: 'Roubo',
    description:
      'Rouba 1 ponto do líder do ranking no momento em que o resultado desta partida for confirmado.',
    icon: '🗡️',
    rarity: 'legendary' as const,
    cost: 10,
  },
  {
    id: 'exact_boost',
    name: 'Faro de Craque',
    description:
      'Se acertar o placar exato, ganha +2 pontos extras além das odds.',
    icon: '🔮',
    rarity: 'rare' as const,
    cost: 5,
  },
  {
    id: 'comeback',
    name: 'Virada',
    description:
      'Se você estiver em último lugar no ranking, seus pontos desta partida valem o dobro.',
    icon: '💥',
    rarity: 'rare' as const,
    cost: 5,
  },
] as const

export type CardId = (typeof CARDS)[number]['id']
export type CardRarity = 'common' | 'rare' | 'legendary'

// Rodadas do torneio em ordem para distribuicao de cartas
const CARD_ROUNDS = [
  'Fase de grupos',
  '16 avos de final',
  'Oitavas de final',
  'Quartas de final',
  'Semifinal',
] as const

// Distribui 1 carta aleatoria para cada usuario no inicio de uma nova rodada.
// Chamada quando o admin confirma o resultado da primeira partida de uma rodada.
async function distributeRoundCards(round: string) {
  if (!CARD_ROUNDS.includes(round as (typeof CARD_ROUNDS)[number])) return

  const [{ db }, { user, userCards }] = await Promise.all([
    import('#/db'),
    import('#/db/schema'),
  ])

  const [userRows, existingCards] = await Promise.all([
    db.select({ id: user.id }).from(user),
    db
      .select({ userId: userCards.userId, acquiredRound: userCards.acquiredRound })
      .from(userCards)
      .where(
        (await import('drizzle-orm')).eq(userCards.acquiredRound, round),
      ),
  ])

  const usersWithCard = new Set(existingCards.map((c) => c.userId))

  const cardsByRarity = {
    common: CARDS.filter((c) => c.rarity === 'common').map((c) => c.id),
    rare: CARDS.filter((c) => c.rarity === 'rare').map((c) => c.id),
    legendary: CARDS.filter((c) => c.rarity === 'legendary').map((c) => c.id),
  }

  function drawCard(): CardId {
    const roll = Math.random()
    let pool: CardId[]
    if (roll < 0.1) pool = cardsByRarity.legendary as unknown as CardId[]
    else if (roll < 0.4) pool = cardsByRarity.rare as unknown as CardId[]
    else pool = cardsByRarity.common as unknown as CardId[]
    return pool[Math.floor(Math.random() * pool.length)]
  }

  const { randomUUID } = await import('node:crypto')

  for (const u of userRows) {
    if (usersWithCard.has(u.id)) continue
    await db.insert(userCards).values({
      id: randomUUID(),
      userId: u.id,
      cardId: drawCard(),
      acquiredRound: round,
      acquiredAt: new Date(),
    })
  }
}

// Avalia e atualiza o progresso de todas as missoes para todos os usuarios.
// Chamada apos cada resultado de partida confirmado.
async function evaluateAllMissions() {
  const [
    { db },
    { guesses, matches, user, x1Challenges, userMissions, userCards },
  ] = await Promise.all([import('#/db'), import('#/db/schema')])

  const [matchRows, guessRows, userRows, challengeRows, existingMissionRows] = await Promise.all([
    db.select().from(matches),
    db
      .select({
        id: guesses.id,
        userId: guesses.userId,
        matchId: guesses.matchId,
        homeScore: guesses.homeScore,
        awayScore: guesses.awayScore,
      })
      .from(guesses),
    db.select({ id: user.id, name: user.name, email: user.email }).from(user),
    db
      .select({
        id: x1Challenges.id,
        matchId: x1Challenges.matchId,
        challengerId: x1Challenges.challengerId,
        opponentId: x1Challenges.opponentId,
        stake: x1Challenges.stake,
        status: x1Challenges.status,
      })
      .from(x1Challenges),
    db
      .select({
        userId: userMissions.userId,
        missionId: userMissions.missionId,
        completedAt: userMissions.completedAt,
      })
      .from(userMissions),
  ])

  // Index das missoes existentes para detectar conclusoes novas
  const existingMissionByKey = new Map(
    existingMissionRows.map((r) => [`${r.userId}:${r.missionId}`, r]),
  )

  const confirmedMatches = matchRows.filter(
    (m) =>
      m.homeScore !== null &&
      m.awayScore !== null &&
      m.startsAt >= MISSIONS_START_DATE,
  )
  const matchById = new Map(matchRows.map((m) => [m.id, m]))

  const guessByKey = new Map<string, (typeof guessRows)[number]>()
  for (const g of guessRows) guessByKey.set(`${g.userId}:${g.matchId}`, g)

  // Pre-calcula odds por partida com base em todos os palpites
  const oddsMultiplierByMatch = new Map<string, number>()
  for (const m of confirmedMatches) {
    oddsMultiplierByMatch.set(m.id, getOddsMultiplier(m.id, m, guessRows))
  }

  // X1: calcular vitórias por usuario
  const x1WinsByUser = new Map<string, number>()
  for (const challenge of challengeRows) {
    if (challenge.status !== 'accepted') continue
    const match = matchById.get(challenge.matchId)
    if (!match || match.homeScore === null || match.awayScore === null) continue
    const { winnerId } = resolveX1Winner(challenge, match, guessByKey)
    if (winnerId) {
      x1WinsByUser.set(winnerId, (x1WinsByUser.get(winnerId) ?? 0) + 1)
    }
  }

  for (const player of userRows) {
    const playerGuesses = guessRows.filter(
      (g) => g.userId === player.id,
    )
    const confirmedPlayerGuesses = playerGuesses.filter((g) => {
      const m = matchById.get(g.matchId)
      return m && m.homeScore !== null && m.awayScore !== null
    })

    // Ordena palpites por horario da partida para calcular sequencias
    const sortedGuesses = confirmedPlayerGuesses
      .map((g) => {
        const m = matchById.get(g.matchId)!
        const result = calculatePoints({ homeScore: g.homeScore, awayScore: g.awayScore, match: m })
        return {
          ...g,
          startsAt: m.startsAt,
          dateKey: m.startsAt.toISOString().slice(0, 10),
          hitOutcome: result.hitOutcome,
          hitExact: result.hitExact,
          oddsMultiplier: oddsMultiplierByMatch.get(g.matchId) ?? 1,
        }
      })
      .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())

    // Hat-trick: maxima sequencia de resultados corretos
    let streak = 0
    let maxStreak = 0
    for (const g of sortedGuesses) {
      if (g.hitOutcome) {
        streak++
        if (streak > maxStreak) maxStreak = streak
      } else {
        streak = 0
      }
    }

    // Sniper: total de placares exatos
    const exactCount = sortedGuesses.filter((g) => g.hitExact).length

    // X1 King: vitórias no X1
    const x1Wins = x1WinsByUser.get(player.id) ?? 0

    // Azarao: acertou algum placar com odds >= 3x
    const underdogHit = sortedGuesses.some(
      (g) => g.hitExact && g.oddsMultiplier >= 3,
    )

    // Duplo Craque: 2 placares exatos no mesmo dia
    const exactByDate = new Map<string, number>()
    for (const g of sortedGuesses) {
      if (g.hitExact) {
        exactByDate.set(g.dateKey, (exactByDate.get(g.dateKey) ?? 0) + 1)
      }
    }
    const maxExactInDay = Math.max(0, ...exactByDate.values())

    const progressMap: Record<MissionId, number> = {
      hat_trick: maxStreak,
      sniper: exactCount,
      x1_king: x1Wins,
      underdog: underdogHit ? 1 : 0,
      gold_sequence: maxStreak,
      double_exact: maxExactInDay,
    }

    const { randomUUID } = await import('node:crypto')

    for (const mission of MISSIONS) {
      const progress = progressMap[mission.id]
      const completed = progress >= mission.goal
      const existingKey = `${player.id}:${mission.id}`
      const existing = existingMissionByKey.get(existingKey)
      const wasCompleted = !!existing?.completedAt
      const completedAt = completed ? (existing?.completedAt ?? new Date()) : null

      await db
        .insert(userMissions)
        .values({
          userId: player.id,
          missionId: mission.id,
          progress,
          completedAt,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: [userMissions.userId, userMissions.missionId],
          set: {
            progress,
            completedAt,
            updatedAt: new Date(),
          },
        })

      // Cria carta de recompensa na primeira vez que a missao e concluida
      if (completed && !wasCompleted) {
        const cardsByRarity = {
          common: CARDS.filter((c) => c.rarity === 'common').map((c) => c.id),
          rare: CARDS.filter((c) => c.rarity === 'rare').map((c) => c.id),
          legendary: CARDS.filter((c) => c.rarity === 'legendary').map((c) => c.id),
        }
        const pool = cardsByRarity[mission.rewardRarity] as CardId[]
        const drawnCardId = pool[Math.floor(Math.random() * pool.length)]
        await db.insert(userCards).values({
          id: randomUUID(),
          userId: player.id,
          cardId: drawnCardId,
          acquiredRound: `missao_${mission.id}`,
          acquiredAt: new Date(),
        })
      }
    }
  }
}

// Calcula o ranking atual e persiste a posicao de cada usuario em
// ranking_snapshots (uma linha por usuario, sobrescrita).
async function snapshotStandings() {
  const [
    { db },
    { guesses, matches, user, rankingSnapshots, x1Challenges, championPicks, userCards },
  ] = await Promise.all([import('#/db'), import('#/db/schema')])

  const [matchRows, guessRows, userRows, challengeRows, championPickRows, cardRows] =
    await Promise.all([
      db.select().from(matches),
      db
        .select({
          id: guesses.id,
          userId: guesses.userId,
          matchId: guesses.matchId,
          homeScore: guesses.homeScore,
          awayScore: guesses.awayScore,
        })
        .from(guesses),
      db.select({ id: user.id, name: user.name, email: user.email }).from(user),
      db
        .select({
          id: x1Challenges.id,
          matchId: x1Challenges.matchId,
          challengerId: x1Challenges.challengerId,
          opponentId: x1Challenges.opponentId,
          stake: x1Challenges.stake,
          status: x1Challenges.status,
        })
        .from(x1Challenges),
      db
        .select({
          userId: championPicks.userId,
          team: championPicks.team,
          bonusPoints: championPicks.bonusPoints,
        })
        .from(championPicks),
      db
        .select({
          userId: userCards.userId,
          cardId: userCards.cardId,
          usedOnMatchId: userCards.usedOnMatchId,
          usedAt: userCards.usedAt,
        })
        .from(userCards),
    ])

  const matchById = new Map(matchRows.map((match) => [match.id, match]))
  const standings = computeStandings(
    userRows,
    guessRows,
    matchById,
    challengeRows,
    championPickRows,
    cardRows,
  )

  for (const player of standings) {
    await db
      .insert(rankingSnapshots)
      .values({
        userId: player.id,
        position: player.position,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: rankingSnapshots.userId,
        set: { position: player.position, updatedAt: new Date() },
      })
  }
}

export const getX1Data = createServerFn({ method: 'GET' }).handler(async () => {
  await ensureSeedMatches()

  const [{ asc }, { db }, { guesses, matches, user, x1Challenges, userCards }] =
    await Promise.all([
      import('drizzle-orm'),
      import('#/db'),
      import('#/db/schema'),
    ])

  const [matchRows, guessRows, userRows, challengeRows, cardRows] = await Promise.all([
    db.select().from(matches).orderBy(asc(matches.startsAt)),
    db
      .select({
        id: guesses.id,
        userId: guesses.userId,
        matchId: guesses.matchId,
        homeScore: guesses.homeScore,
        awayScore: guesses.awayScore,
      })
      .from(guesses),
    db.select({ id: user.id, name: user.name, email: user.email }).from(user),
    db
      .select({
        id: x1Challenges.id,
        matchId: x1Challenges.matchId,
        challengerId: x1Challenges.challengerId,
        opponentId: x1Challenges.opponentId,
        stake: x1Challenges.stake,
        status: x1Challenges.status,
      })
      .from(x1Challenges),
    db
      .select({
        userId: userCards.userId,
        cardId: userCards.cardId,
        acquiredRound: userCards.acquiredRound,
      })
      .from(userCards),
  ])

  const matchById = new Map(matchRows.map((match) => [match.id, match]))
  const { standings, duels } = computeX1Standings(
    userRows,
    challengeRows,
    matchById,
    guessRows,
    cardRows,
  )

  const matchInfoById = new Map(
    matchRows.map((match) => [
      match.id,
      {
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        round: match.round,
        startsAt: match.startsAt.toISOString(),
      },
    ]),
  )

  return {
    standings,
    duels: duels.map((duel) => ({
      ...duel,
      match: matchInfoById.get(duel.matchId) ?? null,
    })),
  }
})

export const createX1Challenge = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      matchId: z.string().min(1),
      opponentId: z.string().min(1),
      stake: z.number().int().min(1).max(3),
    }),
  )
  .handler(async ({ data }) => {
    await ensureSeedMatches()

    const [{ eq, and, or }, { db }, { matches, user, x1Challenges }] =
      await Promise.all([
        import('drizzle-orm'),
        import('#/db'),
        import('#/db/schema'),
      ])
    const sessionUser = await getSessionUser()

    if (!sessionUser) {
      throw new Error('Voce precisa entrar para criar um X1.')
    }

    if (data.opponentId === sessionUser.id) {
      throw new Error('Voce nao pode desafiar a si mesmo.')
    }

    const [matchRow] = await db
      .select()
      .from(matches)
      .where(eq(matches.id, data.matchId))
      .limit(1)

    if (!matchRow) {
      throw new Error('Jogo nao encontrado.')
    }

    if (matchRow.startsAt.getTime() <= Date.now()) {
      throw new Error('O X1 fica bloqueado depois do inicio do jogo.')
    }

    const [opponent] = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.id, data.opponentId))
      .limit(1)

    if (!opponent) {
      throw new Error('Oponente nao encontrado.')
    }

    const existing = await db
      .select({
        challengerId: x1Challenges.challengerId,
        opponentId: x1Challenges.opponentId,
      })
      .from(x1Challenges)
      .where(
        and(
          eq(x1Challenges.matchId, data.matchId),
          or(
            eq(x1Challenges.status, 'pending'),
            eq(x1Challenges.status, 'accepted'),
          ),
        ),
      )

    const blocked = existing.some(
      (challenge) =>
        challenge.challengerId === sessionUser.id ||
        challenge.opponentId === sessionUser.id ||
        challenge.challengerId === data.opponentId ||
        challenge.opponentId === data.opponentId,
    )

    if (blocked) {
      throw new Error('Ja existe um X1 ativo para um dos jogadores nesse jogo.')
    }

    await db.insert(x1Challenges).values({
      id: crypto.randomUUID(),
      matchId: data.matchId,
      challengerId: sessionUser.id,
      opponentId: data.opponentId,
      stake: data.stake,
      status: 'pending',
      updatedAt: new Date(),
    })

    return { ok: true }
  })

export const respondX1Challenge = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      challengeId: z.string().min(1),
      accept: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    const [{ eq, and }, { db }, { matches, x1Challenges }] = await Promise.all([
      import('drizzle-orm'),
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()

    if (!sessionUser) {
      throw new Error('Voce precisa entrar para responder um X1.')
    }

    const [challenge] = await db
      .select()
      .from(x1Challenges)
      .where(eq(x1Challenges.id, data.challengeId))
      .limit(1)

    if (!challenge) {
      throw new Error('Desafio nao encontrado.')
    }

    if (challenge.opponentId !== sessionUser.id) {
      throw new Error('Voce nao foi desafiado nesse X1.')
    }

    if (challenge.status !== 'pending') {
      throw new Error('Esse desafio ja foi respondido.')
    }

    const [matchRow] = await db
      .select()
      .from(matches)
      .where(eq(matches.id, challenge.matchId))
      .limit(1)

    if (matchRow && matchRow.startsAt.getTime() <= Date.now()) {
      throw new Error('O X1 fica bloqueado depois do inicio do jogo.')
    }

    if (data.accept) {
      const existing = await db
        .select({
          id: x1Challenges.id,
          challengerId: x1Challenges.challengerId,
          opponentId: x1Challenges.opponentId,
        })
        .from(x1Challenges)
        .where(
          and(
            eq(x1Challenges.matchId, challenge.matchId),
            eq(x1Challenges.status, 'accepted'),
          ),
        )

      const blocked = existing.some(
        (other) =>
          other.id !== challenge.id &&
          (other.challengerId === sessionUser.id ||
            other.opponentId === sessionUser.id ||
            other.challengerId === challenge.challengerId ||
            other.opponentId === challenge.challengerId),
      )

      if (blocked) {
        throw new Error('Ja existe um X1 aceito para um dos jogadores.')
      }
    }

    await db
      .update(x1Challenges)
      .set({
        status: data.accept ? 'accepted' : 'declined',
        updatedAt: new Date(),
      })
      .where(eq(x1Challenges.id, challenge.id))

    return { ok: true }
  })

export const cancelX1Challenge = createServerFn({ method: 'POST' })
  .validator(z.object({ challengeId: z.string().min(1) }))
  .handler(async ({ data }) => {
    const [{ eq }, { db }, { x1Challenges }] = await Promise.all([
      import('drizzle-orm'),
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()

    if (!sessionUser) {
      throw new Error('Voce precisa entrar para cancelar um X1.')
    }

    const [challenge] = await db
      .select()
      .from(x1Challenges)
      .where(eq(x1Challenges.id, data.challengeId))
      .limit(1)

    if (!challenge) {
      throw new Error('Desafio nao encontrado.')
    }

    if (challenge.challengerId !== sessionUser.id) {
      throw new Error('Voce nao criou esse X1.')
    }

    if (challenge.status !== 'pending') {
      throw new Error('So da para cancelar um X1 pendente.')
    }

    await db
      .update(x1Challenges)
      .set({ status: 'cancelled', updatedAt: new Date() })
      .where(eq(x1Challenges.id, challenge.id))

    return { ok: true }
  })

function getTournamentTeams(matchRows: { round: string; homeTeam: string; awayTeam: string }[]) {
  const teams = new Set<string>()
  for (const match of matchRows) {
    if (match.round !== 'Fase de grupos') continue
    teams.add(match.homeTeam)
    teams.add(match.awayTeam)
  }

  return [...teams].sort((a, b) => a.localeCompare(b))
}

export const getMissionsData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const [{ db }, { user, userMissions }] = await Promise.all([
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()

    const [userRows, missionRows] = await Promise.all([
      db.select({ id: user.id, name: user.name, email: user.email }).from(user),
      db
        .select({
          userId: userMissions.userId,
          missionId: userMissions.missionId,
          progress: userMissions.progress,
          completedAt: userMissions.completedAt,
        })
        .from(userMissions),
    ])

    const nameById = new Map(
      userRows.map((u) => [u.id, u.name || u.email]),
    )

    const missionsByUser = new Map<string, typeof missionRows>()
    for (const row of missionRows) {
      if (!missionsByUser.has(row.userId)) missionsByUser.set(row.userId, [])
      missionsByUser.get(row.userId)!.push(row)
    }

    const players = userRows.map((u) => {
      const userMissionRows = missionsByUser.get(u.id) ?? []
      const missions = MISSIONS.map((def) => {
        const row = userMissionRows.find((r) => r.missionId === def.id)
        return {
          ...def,
          progress: row?.progress ?? 0,
          completedAt: row?.completedAt?.toISOString() ?? null,
        }
      })
      return {
        id: u.id,
        name: nameById.get(u.id) ?? '',
        missions,
      }
    })

    return {
      missions: MISSIONS,
      players,
      currentUserId: sessionUser?.id ?? null,
    }
  },
)

// Busca o inventario de cartas do usuario logado
export const getCardsData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const [{ db }, { userCards }] = await Promise.all([
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()
    if (!sessionUser) return { cards: [], currentUser: null, CARDS }

    const [cardRows] = await Promise.all([
      db
        .select()
        .from(userCards)
        .where((await import('drizzle-orm')).eq(userCards.userId, sessionUser.id)),
    ])

    const cards = cardRows.map((row) => {
      const def = CARDS.find((c) => c.id === row.cardId)!
      return {
        instanceId: row.id,
        cardId: row.cardId as CardId,
        name: def?.name ?? row.cardId,
        description: def?.description ?? '',
        icon: def?.icon ?? '🃏',
        rarity: (def?.rarity ?? 'common') as CardRarity,
        cost: def?.cost ?? 0,
        acquiredRound: row.acquiredRound,
        acquiredAt: row.acquiredAt.toISOString(),
        usedAt: row.usedAt?.toISOString() ?? null,
        usedOnMatchId: row.usedOnMatchId ?? null,
        available: !row.usedAt,
      }
    })

    return {
      cards,
      currentUser: {
        id: sessionUser.id,
        name: sessionUser.name,
      },
      CARDS,
    }
  },
)

// Usa uma carta em uma partida
export const useCard = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      cardInstanceId: z.string().min(1),
      matchId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const [{ eq, and, isNull }, { db }, { matches, userCards }] =
      await Promise.all([
        import('drizzle-orm'),
        import('#/db'),
        import('#/db/schema'),
      ])
    const sessionUser = await getSessionUser()
    if (!sessionUser) throw new Error('Voce precisa entrar para usar uma carta.')

    const [cardRows, matchRows] = await Promise.all([
      db
        .select()
        .from(userCards)
        .where(
          and(
            eq(userCards.id, data.cardInstanceId),
            eq(userCards.userId, sessionUser.id),
            isNull(userCards.usedAt),
          ),
        )
        .limit(1),
      db
        .select()
        .from(matches)
        .where(eq(matches.id, data.matchId))
        .limit(1),
    ])

    const card = cardRows.at(0)
    if (!card) throw new Error('Carta nao encontrada ou ja utilizada.')

    const match = matchRows.at(0)
    if (!match) throw new Error('Partida nao encontrada.')

    if (new Date(match.startsAt).getTime() <= Date.now()) {
      throw new Error('So da para usar cartas antes do jogo comecar.')
    }

    await db
      .update(userCards)
      .set({ usedAt: new Date(), usedOnMatchId: data.matchId })
      .where(eq(userCards.id, data.cardInstanceId))

    return { ok: true }
  })

// Compra uma carta aleatoria gastando pontos
export const buyCard = createServerFn({ method: 'POST' })
  .validator(z.object({ rarity: z.enum(['common', 'rare', 'legendary']) }))
  .handler(async ({ data }) => {
    const [{ db }, { userCards }] = await Promise.all([
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()
    if (!sessionUser) throw new Error('Voce precisa entrar para comprar cartas.')

    // Custo por raridade (deduzido dos pontos X1)
    const costs = { common: 1, rare: 5, legendary: 10 }
    const cost = costs[data.rarity]

    // Verifica saldo X1 do usuario
    const [{ guesses, matches, user, x1Challenges }] =
      await Promise.all([import('#/db/schema')])

    const [matchRows, guessRows, userRows, challengeRows, existingCards] =
      await Promise.all([
        db.select().from(matches),
        db
          .select({
            id: guesses.id,
            userId: guesses.userId,
            matchId: guesses.matchId,
            homeScore: guesses.homeScore,
            awayScore: guesses.awayScore,
          })
          .from(guesses),
        db
          .select({ id: user.id, name: user.name, email: user.email })
          .from(user),
        db
          .select({
            id: x1Challenges.id,
            matchId: x1Challenges.matchId,
            challengerId: x1Challenges.challengerId,
            opponentId: x1Challenges.opponentId,
            stake: x1Challenges.stake,
            status: x1Challenges.status,
          })
          .from(x1Challenges),
        db
          .select({
            userId: userCards.userId,
            cardId: userCards.cardId,
            acquiredRound: userCards.acquiredRound,
          })
          .from(userCards),
      ])

    const matchById = new Map(matchRows.map((m) => [m.id, m]))
    const { standings } = computeX1Standings(
      userRows,
      challengeRows,
      matchById,
      guessRows,
      existingCards,
    )
    const playerEntry = standings.find((p) => p.id === sessionUser.id)
    const currentX1Points = playerEntry?.points ?? 0

    if (currentX1Points < cost) {
      throw new Error(
        `Voce precisa de ${cost} pontos X1 para comprar uma carta ${data.rarity}. Voce tem ${currentX1Points}.`,
      )
    }

    // Sorteia carta da raridade escolhida
    const pool = CARDS.filter((c) => c.rarity === data.rarity)
    const drawn = pool[Math.floor(Math.random() * pool.length)]

    const { randomUUID } = await import('node:crypto')

    await db.insert(userCards).values({
      id: randomUUID(),
      userId: sessionUser.id,
      cardId: drawn.id,
      acquiredRound: 'compra',
      acquiredAt: new Date(),
    })

    return { ok: true, card: drawn, cost }
  })

export const getGuruData = createServerFn({ method: 'GET' }).handler(
  async () => {
    await ensureSeedMatches()

    const [{ db }, { matches, user, championPicks }] = await Promise.all([
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()

    const [matchRows, userRows, pickRows] = await Promise.all([
      db.select().from(matches),
      db.select({ id: user.id, name: user.name, email: user.email }).from(user),
      db
        .select({
          userId: championPicks.userId,
          team: championPicks.team,
          bonusPoints: championPicks.bonusPoints,
          phaseLabel: championPicks.phaseLabel,
        })
        .from(championPicks),
    ])

    const phase = getChampionPhase(matchRows)
    const matchById = new Map(matchRows.map((match) => [match.id, match]))
    const championTeam = getChampionTeam(matchById)
    const nameById = new Map(
      userRows.map((player) => [player.id, player.name || player.email]),
    )

    const myPick = sessionUser
      ? pickRows.find((pick) => pick.userId === sessionUser.id) ?? null
      : null

    return {
      user: sessionUser
        ? {
            id: sessionUser.id,
            name: sessionUser.name,
            email: sessionUser.email,
            isAdmin: isAdminEmail(sessionUser.email),
          }
        : null,
      phase,
      championTeam,
      teams: getTournamentTeams(matchRows),
      pick: myPick
        ? {
            team: myPick.team,
            bonusPoints: myPick.bonusPoints,
            phaseLabel: myPick.phaseLabel,
          }
        : null,
      picks: pickRows
        .map((pick) => ({
          userId: pick.userId,
          name: nameById.get(pick.userId) ?? 'Jogador',
          team: pick.team,
          bonusPoints: pick.bonusPoints,
          phaseLabel: pick.phaseLabel,
          isChampion: championTeam !== null && pick.team === championTeam,
        }))
        .sort((a, b) => b.bonusPoints - a.bonusPoints || a.name.localeCompare(b.name)),
    }
  },
)

export const saveChampionPick = createServerFn({ method: 'POST' })
  .validator(z.object({ team: z.string().min(1) }))
  .handler(async ({ data }) => {
    await ensureSeedMatches()

    const [{ db }, { matches, championPicks }] = await Promise.all([
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()

    if (!sessionUser) {
      throw new Error('Voce precisa entrar para palpitar o campeao.')
    }

    const matchRows = await db.select().from(matches)
    const phase = getChampionPhase(matchRows)

    if (phase.locked || phase.points === null) {
      throw new Error('O palpite de campeao ja esta bloqueado (Final).')
    }

    if (!getTournamentTeams(matchRows).includes(data.team)) {
      throw new Error('Selecione um time valido.')
    }

    await db
      .insert(championPicks)
      .values({
        userId: sessionUser.id,
        team: data.team,
        bonusPoints: phase.points,
        phaseLabel: phase.label,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: championPicks.userId,
        set: {
          team: data.team,
          bonusPoints: phase.points,
          phaseLabel: phase.label,
          updatedAt: new Date(),
        },
      })

    return { ok: true }
  })
