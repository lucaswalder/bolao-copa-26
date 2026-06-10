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

export const getBolaoData = createServerFn({ method: 'GET' }).handler(
  async () => {
    await ensureSeedMatches()

    const [{ asc }, { db }, { guesses, matches, user }] = await Promise.all([
      import('drizzle-orm'),
      import('#/db'),
      import('#/db/schema'),
    ])
    const sessionUser = await getSessionUser()

    const [matchRows, guessRows, userRows] = await Promise.all([
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
    ])

    await refreshKnockoutTeams(matchRows)

    const matchById = new Map(matchRows.map((match) => [match.id, match]))
    const standings = userRows
      .map((player) => {
        const playerGuesses = guessRows.filter(
          (guess) => guess.userId === player.id,
        )
        const score = playerGuesses.reduce(
          (acc, guess) => {
            const match = matchById.get(guess.matchId)

            if (!match) return acc

            const result = calculatePoints({
              homeScore: guess.homeScore,
              awayScore: guess.awayScore,
              match,
            })

            return {
              points: acc.points + result.points,
              exactHits: acc.exactHits + (result.hitExact ? 1 : 0),
              outcomeHits: acc.outcomeHits + (result.hitOutcome ? 1 : 0),
            }
          },
          { points: 0, exactHits: 0, outcomeHits: 0 },
        )

        return {
          id: player.id,
          name: player.name || player.email,
          guessesCount: playerGuesses.length,
          ...score,
        }
      })
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points
        if (b.exactHits !== a.exactHits) return b.exactHits - a.exactHits
        if (b.outcomeHits !== a.outcomeHits)
          return b.outcomeHits - a.outcomeHits
        return a.name.localeCompare(b.name)
      })
      .map((player, index) => ({ ...player, position: index + 1 }))

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
      matches: matchRows.map((match) => {
        const userGuess = currentUserGuesses.get(match.id)

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
        }
      }),
      standings,
    }
  },
)

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
