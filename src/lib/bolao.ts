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

function calculatePoints(guess: {
  homeScore: number
  awayScore: number
  match: {
    homeScore: ScoreValue
    awayScore: ScoreValue
  }
}) {
  const resultHome = guess.match.homeScore
  const resultAway = guess.match.awayScore

  if (resultHome === null || resultAway === null) {
    return { points: 0, hitOutcome: false, hitExact: false }
  }

  const hitOutcome =
    getOutcome(guess.homeScore, guess.awayScore) ===
    getOutcome(resultHome, resultAway)
  const hitExact =
    guess.homeScore === resultHome && guess.awayScore === resultAway

  return {
    points: (hitOutcome ? 2 : 0) + (hitExact ? 1 : 0),
    hitOutcome,
    hitExact,
  }
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

    if (!existing || existing.round !== 'Fase de grupos') continue

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

// Ranking ao vivo: soma os pontos dos palpites, aplica os ajustes de X1
// (vencedor ganha o stake; perdedor perde o stake e os pontos da partida) e
// soma o bonus de campeao para quem cravou o vencedor da Copa.
function computeStandings(
  userRows: PlayerRow[],
  guessRows: GuessRow[],
  matchById: Map<string, MatchRow>,
  challengeRows: ChallengeRow[],
  championPicks: ChampionPickRow[] = [],
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
        guessesCount: 0,
        points: 0,
        exactHits: 0,
        outcomeHits: 0,
      },
    ]),
  )

  for (const guess of guessRows) {
    const entry = tally.get(guess.userId)
    const match = matchById.get(guess.matchId)
    if (!entry || !match) continue

    entry.guessesCount += 1
    const result = calculatePoints({
      homeScore: guess.homeScore,
      awayScore: guess.awayScore,
      match,
    })
    entry.points += result.points
    entry.exactHits += result.hitExact ? 1 : 0
    entry.outcomeHits += result.hitOutcome ? 1 : 0
  }

  for (const challenge of challengeRows) {
    if (challenge.status !== 'accepted') continue
    const match = matchById.get(challenge.matchId)
    if (!match || match.homeScore === null || match.awayScore === null) continue

    const { winnerId, loserId, loserPoints } = resolveX1Winner(
      challenge,
      match,
      guessByKey,
    )
    if (!winnerId || !loserId) continue

    const winnerEntry = tally.get(winnerId)
    const loserEntry = tally.get(loserId)
    if (winnerEntry) winnerEntry.points += challenge.stake
    if (loserEntry) loserEntry.points -= challenge.stake + loserPoints
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
    ] = await Promise.all([
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

        return {
          ...match,
          startsAt: match.startsAt.toISOString(),
          createdAt: match.createdAt.toISOString(),
          updatedAt: match.updatedAt.toISOString(),
          guess: userGuess
            ? {
                homeScore: userGuess.homeScore,
                awayScore: userGuess.awayScore,
                points: calculatePoints({
                  homeScore: userGuess.homeScore,
                  awayScore: userGuess.awayScore,
                  match,
                }).points,
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

    await db
      .insert(guesses)
      .values({
        id: crypto.randomUUID(),
        userId: sessionUser.id,
        matchId: data.matchId,
        homeScore: data.homeScore,
        awayScore: data.awayScore,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [guesses.userId, guesses.matchId],
        set: {
          homeScore: data.homeScore,
          awayScore: data.awayScore,
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

    return { ok: true }
  })

// Calcula o ranking atual e persiste a posicao de cada usuario em
// ranking_snapshots (uma linha por usuario, sobrescrita).
async function snapshotStandings() {
  const [
    { db },
    { guesses, matches, user, rankingSnapshots, x1Challenges, championPicks },
  ] = await Promise.all([import('#/db'), import('#/db/schema')])

  const [matchRows, guessRows, userRows, challengeRows, championPickRows] =
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
    ])

  const matchById = new Map(matchRows.map((match) => [match.id, match]))
  const standings = computeStandings(
    userRows,
    guessRows,
    matchById,
    challengeRows,
    championPickRows,
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
