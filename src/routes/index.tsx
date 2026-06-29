import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import {
  ArrowDown,
  ArrowUp,
  Brain,
  CalendarDays,
  Check,
  Flag,
  ListFilter,
  Lock,
  LogOut,
  Medal,
  Pencil,
  Save,
  Search,
  ShieldCheck,
  Swords,
  Trophy,
  UserPlus,
  X,
} from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { authClient } from '#/lib/auth-client'
import {
  cancelX1Challenge,
  createX1Challenge,
  getBolaoData,
  respondX1Challenge,
  saveGuess,
  useCard,
} from '#/lib/bolao'
import type { CardRarity } from '#/lib/bolao'

export const Route = createFileRoute('/')({
  loader: () => getBolaoData(),
  component: Home,
})

type BolaoData = Awaited<ReturnType<typeof getBolaoData>>
type MatchItem = BolaoData['matches'][number]
type Player = BolaoData['players'][number]
type PhaseFilter =
  | 'Todos'
  | 'Grupos'
  | '16 avos'
  | 'Oitavas'
  | 'Quartas'
  | 'Finais'
type StatusFilter = 'Próximos' | 'Finalizados' | 'Todos'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Sao_Paulo',
})

function Home() {
  const data = Route.useLoaderData()
  const router = useRouter()
  const [phase, setPhase] = useState<PhaseFilter>('Todos')
  const [status, setStatus] = useState<StatusFilter>('Próximos')
  const [showPlacar, setShowPlacar] = useState(false)
  const [teamQuery, setTeamQuery] = useState('')

  const normalizedQuery = normalizeText(teamQuery.trim())
  const isSearching = normalizedQuery.length > 0

  let filteredMatches: MatchItem[]
  if (isSearching) {
    // Busca por time: todos os jogos (passados e futuros), ignorando os filtros
    // de fase/status, ordenados por data (asc, como já vem do loader).
    filteredMatches = data.matches.filter((match) =>
      matchMatchesTeam(match, normalizedQuery),
    )
  } else {
    filteredMatches = data.matches
      .filter((match) => matchMatchesPhase(match, phase))
      .filter((match) => matchMatchesStatus(match, status))
    if (status === 'Finalizados') {
      filteredMatches.reverse()
    }
  }

  const teamOptions = Array.from(
    new Set(
      data.matches.flatMap((match) => [match.homeTeam, match.awayTeam]),
    ),
  ).sort((a, b) => a.localeCompare(b))

  return (
    <main className="min-h-screen px-4 py-6 text-[var(--sea-ink)] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="island-shell overflow-hidden rounded-lg">
          <div className="pitch-band grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="green" className="gap-1">
                  <Flag className="size-3.5" />
                  Copa 2026
                </Badge>
                <Badge variant="canary">Bolão CFFDP</Badge>
              </div>
              <h1 className="display-title text-4xl font-bold leading-tight text-[var(--sea-ink)] sm:text-5xl">
                Bolão CFFDP
              </h1>
              <p className="mt-3 max-w-2xl text-base font-medium text-[var(--sea-ink-soft)]">
                Palpites entre amigos, ranking ao vivo e aquela pressão boa de
                acompanhar a Copa inteira até a final.
              </p>
            </div>
            <SessionBox user={data.user} onDone={() => router.invalidate()} />
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="island-kicker">Palpites</p>
                <h2 className="text-2xl font-bold">Tabela da Copa</h2>
                <p className="mt-1 text-sm font-semibold text-[var(--sea-ink-soft)]">
                  {filteredMatches.length} de {data.matches.length} jogos
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {!data.user ? (
                  <Badge variant="secondary" className="gap-1">
                    <Lock className="size-3.5" />
                    Entre para salvar
                  </Badge>
                ) : null}
                <Link
                  to="/guru"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white"
                >
                  <Brain className="size-4" />
                  Guru do Futebol
                </Link>
                <Link
                  to="/x1"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white"
                >
                  <Swords className="size-4" />
                  Ranking X1
                </Link>
                <Link
                  to="/missoes"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white"
                >
                  <Trophy className="size-4" />
                  Missões
                </Link>
                <Link
                  to="/cartas"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white"
                >
                  🃏 Cartas
                </Link>
                {data.user?.isAdmin ? (
                  <Link
                    to="/admin"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white"
                  >
                    <ShieldCheck className="size-4" />
                    Admin
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--sea-ink-soft)]" />
              <Input
                type="search"
                list="team-options"
                value={teamQuery}
                onChange={(event) => setTeamQuery(event.target.value)}
                placeholder="Buscar time (ex: Brasil) — todos os jogos dele"
                aria-label="Buscar jogos por time"
                className="h-11 pl-9"
              />
              <datalist id="team-options">
                {teamOptions.map((team) => (
                  <option key={team} value={team} />
                ))}
              </datalist>
            </div>

            {isSearching ? (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-white/65 p-2 pl-3 text-sm font-semibold text-[var(--sea-ink-soft)]">
                <span>
                  {filteredMatches.length} jogo(s) com “{teamQuery.trim()}”
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setTeamQuery('')}
                >
                  <X />
                  Limpar busca
                </Button>
              </div>
            ) : (
              <>
                <PhaseTabs
                  activePhase={phase}
                  onChange={setPhase}
                  data={data}
                />
                <StatusTabs
                  activeStatus={status}
                  onChange={setStatus}
                  data={data}
                />
              </>
            )}

            <div className="grid gap-4">
              {filteredMatches.length === 0 ? (
                <p className="rounded-lg border border-[var(--line)] bg-white/65 p-6 text-center text-sm font-semibold text-[var(--sea-ink-soft)]">
                  {isSearching
                    ? 'Nenhum jogo encontrado para esse time.'
                    : 'Nenhum jogo neste filtro.'}
                </p>
              ) : (
                filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    canGuess={Boolean(data.user)}
                    players={data.players}
                    currentUserId={data.user?.id ?? null}
                    userAvailableCards={data.userAvailableCards}
                  />
                ))
              )}
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <Scoreboard data={data} />
            <RulesCard />
          </aside>
        </section>
      </div>

      <button
        type="button"
        onClick={() => setShowPlacar(true)}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--sea-ink)] px-5 py-3 text-sm font-bold text-white shadow-lg lg:hidden"
      >
        <Trophy className="size-4" />
        Ver placar
      </button>

      {showPlacar ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 lg:hidden"
          onClick={() => setShowPlacar(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex justify-end">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Fechar placar"
                onClick={() => setShowPlacar(false)}
              >
                <X />
              </Button>
            </div>
            <Scoreboard data={data} />
          </div>
        </div>
      ) : null}
    </main>
  )
}

function matchMatchesPhase(match: MatchItem, phase: PhaseFilter) {
  if (phase === 'Todos') return true
  if (phase === 'Grupos') return match.round === 'Fase de grupos'
  if (phase === '16 avos') return match.round === '16 avos de final'
  if (phase === 'Oitavas') return match.round === 'Oitavas de final'
  if (phase === 'Quartas') return match.round === 'Quartas de final'

  return ['Semifinal', 'Disputa de 3º lugar', 'Final'].includes(match.round)
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

function matchMatchesTeam(match: MatchItem, normalizedQuery: string) {
  return (
    normalizeText(match.homeTeam).includes(normalizedQuery) ||
    normalizeText(match.awayTeam).includes(normalizedQuery)
  )
}

function matchMatchesStatus(match: MatchItem, status: StatusFilter) {
  if (status === 'Todos') return true
  if (status === 'Finalizados') return match.resultStatus === 'confirmed'

  return match.resultStatus !== 'confirmed'
}

function StatusTabs({
  activeStatus,
  onChange,
  data,
}: {
  activeStatus: StatusFilter
  onChange: (status: StatusFilter) => void
  data: BolaoData
}) {
  const statuses: StatusFilter[] = ['Próximos', 'Finalizados', 'Todos']

  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-[var(--line)] bg-white/65 p-2">
      <div className="mr-1 hidden items-center gap-1.5 px-2 text-sm font-bold text-[var(--sea-ink-soft)] sm:flex">
        <ListFilter className="size-4" />
        Status
      </div>
      {statuses.map((status) => (
        <Button
          key={status}
          type="button"
          variant={activeStatus === status ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange(status)}
          title={`Filtrar por ${status}`}
        >
          {status}
          <span className="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[11px] font-black">
            {
              data.matches.filter((match) => matchMatchesStatus(match, status))
                .length
            }
          </span>
        </Button>
      ))}
    </div>
  )
}

function PhaseTabs({
  activePhase,
  onChange,
  data,
}: {
  activePhase: PhaseFilter
  onChange: (phase: PhaseFilter) => void
  data: BolaoData
}) {
  const phases: PhaseFilter[] = [
    'Todos',
    'Grupos',
    '16 avos',
    'Oitavas',
    'Quartas',
    'Finais',
  ]

  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-[var(--line)] bg-white/65 p-2">
      <div className="mr-1 hidden items-center gap-1.5 px-2 text-sm font-bold text-[var(--sea-ink-soft)] sm:flex">
        <ListFilter className="size-4" />
        Fase
      </div>
      {phases.map((phase) => (
        <Button
          key={phase}
          type="button"
          variant={activePhase === phase ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange(phase)}
          title={`Filtrar por ${phase}`}
        >
          {phase}
          <span className="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[11px] font-black">
            {
              data.matches.filter((match) => matchMatchesPhase(match, phase))
                .length
            }
          </span>
        </Button>
      ))}
    </div>
  )
}

function SessionBox({
  user,
  onDone,
}: {
  user: BolaoData['user']
  onDone: () => void
}) {
  if (user) {
    return <UserBox user={user} onDone={onDone} />
  }

  return <AuthCard onDone={onDone} />
}

function UserBox({
  user,
  onDone,
}: {
  user: NonNullable<BolaoData['user']>
  onDone: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSaveName() {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Informe um nome.')
      return
    }

    setError(null)
    setIsSaving(true)
    try {
      const result = await authClient.updateUser({ name: trimmed })
      if (result.error) {
        setError(result.error.message || 'Não foi possível salvar o nome.')
        return
      }
      setIsEditing(false)
      onDone()
    } catch {
      setError('Não foi possível salvar o nome.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--sea-ink)] text-sm font-bold text-white">
          {user.name.charAt(0).toUpperCase() || 'U'}
        </div>
        {isEditing ? (
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Seu nome"
            autoFocus
            maxLength={60}
            className="h-10 flex-1"
          />
        ) : (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{user.name}</p>
            <p className="truncate text-xs text-[var(--sea-ink-soft)]">
              {user.email}
            </p>
          </div>
        )}
        {isEditing ? (
          <>
            <Button
              type="button"
              size="icon"
              aria-label="Salvar nome"
              title="Salvar nome"
              disabled={isSaving}
              onClick={handleSaveName}
            >
              <Check />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Cancelar"
              title="Cancelar"
              disabled={isSaving}
              onClick={() => {
                setName(user.name)
                setError(null)
                setIsEditing(false)
              }}
            >
              <X />
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Editar nome"
              title="Editar nome"
              onClick={() => setIsEditing(true)}
            >
              <Pencil />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Sair"
              title="Sair"
              onClick={async () => {
                await authClient.signOut()
                onDone()
              }}
            >
              <LogOut />
            </Button>
          </>
        )}
      </div>
      {error ? (
        <p className="rounded-md border border-red-500/30 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function AuthCard({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSignUp = mode === 'sign-up'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password })

      if (result.error) {
        setError(result.error.message || 'Não foi possível autenticar.')
        return
      }

      onDone()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-white/82">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base">
            {isSignUp ? 'Criar conta' : 'Entrar no bolão'}
          </CardTitle>
          <div className="grid grid-cols-2 rounded-md border border-[var(--line)] bg-white/70 p-1">
            <Button
              type="button"
              variant={mode === 'sign-in' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('sign-in')}
            >
              Entrar
            </Button>
            <Button
              type="button"
              variant={mode === 'sign-up' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('sign-up')}
            >
              Criar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <form className="grid gap-3" onSubmit={handleSubmit}>
          {isSignUp ? (
            <div className="grid gap-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" autoComplete="name" required />
            </div>
          ) : null}
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              minLength={8}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
            />
          </div>
          {error ? (
            <p className="rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={isSubmitting}>
            <UserPlus />
            {isSubmitting ? 'Salvando...' : isSignUp ? 'Criar conta' : 'Entrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

type UserCard = BolaoData['userAvailableCards'][number]

function MatchCard({
  match,
  canGuess,
  players,
  currentUserId,
  userAvailableCards = [],
}: {
  match: MatchItem
  canGuess: boolean
  players: Player[]
  currentUserId: string | null
  userAvailableCards?: UserCard[]
}) {
  const router = useRouter()
  const saveGuessFn = useServerFn(saveGuess)
  const useCardFn = useServerFn(useCard)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUsingCard, setIsUsingCard] = useState(false)

  const isKnockout = match.round !== 'Fase de grupos'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const homeScore = Number(formData.get('homeScore'))
    const awayScore = Number(formData.get('awayScore'))
    const guessWinnerTeamRaw = String(formData.get('guessWinnerTeam') || '').trim()
    const guessWinnerTeam = guessWinnerTeamRaw || null

    if (!Number.isInteger(homeScore) || !Number.isInteger(awayScore)) {
      setError('Informe placares válidos.')
      return
    }

    setIsSaving(true)

    try {
      await saveGuessFn({
        data: {
          matchId: match.id,
          homeScore,
          awayScore,
          guessWinnerTeam,
        },
      })
      await router.invalidate()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleUseCard(instanceId: string) {
    setIsUsingCard(true)
    try {
      await useCardFn({ data: { cardInstanceId: instanceId, matchId: match.id } })
      await router.invalidate()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao usar carta.')
    } finally {
      setIsUsingCard(false)
    }
  }

  const isLocked = new Date(match.startsAt).getTime() <= Date.now()
  const hasResult = match.homeScore !== null && match.awayScore !== null

  return (
    <Card className="feature-card">
      <CardHeader className="gap-3 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {match.matchNumber ? (
              <Badge variant="secondary">Jogo {match.matchNumber}</Badge>
            ) : null}
            <Badge variant="secondary">{match.group}</Badge>
            <Badge variant={hasResult ? 'green' : 'canary'}>
              {hasResult ? 'Encerrado' : 'Aberto'}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--sea-ink-soft)]">
            <CalendarDays className="size-4" />
            {dateFormatter.format(new Date(match.startsAt))}
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <TeamName align="right">{match.homeTeam}</TeamName>
          <div className="rounded-md border border-[var(--line)] bg-white/70 px-3 py-2 text-sm font-black">
            vs
          </div>
          <TeamName>{match.awayTeam}</TeamName>
        </div>
        <CardDescription>
          {match.round} · {match.venue}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasResult ? (
          <div className="mb-4 rounded-md border border-[var(--line)] bg-white/70 p-3 text-center text-sm font-bold">
            <span>
              Resultado: {match.homeScore} x {match.awayScore}
              {match.winnerTeam && isKnockout ? ` · classificado: ${match.winnerTeam}` : ''}
            </span>
            {match.oddsMultiplier && match.oddsMultiplier > 1 ? (
              <span
                className={`ml-2 inline-block rounded px-1.5 py-0.5 text-xs font-black ${
                  match.oddsMultiplier >= 4
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-zinc-100 text-zinc-600'
                }`}
              >
                {match.oddsMultiplier === 6
                  ? '🔥 Ninguém acertou — 6x'
                  : `${match.oddsMultiplier}x odds`}
              </span>
            ) : null}
          </div>
        ) : null}
        <form
          className="grid gap-3"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
              <ScoreInput
                label={match.homeTeam}
                name="homeScore"
                defaultValue={match.guess?.homeScore}
                disabled={!canGuess || isLocked}
              />
              <span className="pb-2 text-center text-lg font-black">x</span>
              <ScoreInput
                label={match.awayTeam}
                name="awayScore"
                defaultValue={match.guess?.awayScore}
                disabled={!canGuess || isLocked}
              />
            </div>
            <Button
              type="submit"
              disabled={!canGuess || isLocked || isSaving}
              className="self-end"
            >
              {isLocked ? <Lock /> : <Save />}
              {isLocked ? 'Bloqueado' : isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
          {isKnockout ? (
            <div className="grid gap-1.5">
              <label htmlFor={`guessWinner-${match.id}`} className="text-xs font-semibold text-[var(--sea-ink-soft)]">
                Classificado <span className="font-normal opacity-70">(quem avança — obrigatório no empate)</span>
              </label>
              <select
                id={`guessWinner-${match.id}`}
                name="guessWinnerTeam"
                defaultValue={match.guess?.guessWinnerTeam ?? ''}
                disabled={!canGuess || isLocked}
                className="h-10 rounded-md border border-[var(--line)] bg-white px-3 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              >
                <option value="">Automático (quem vencer no placar)</option>
                <option value={match.homeTeam}>{match.homeTeam}</option>
                <option value={match.awayTeam}>{match.awayTeam}</option>
              </select>
            </div>
          ) : null}
        </form>
        {match.guess ? (
          <div className="mt-3 space-y-1">
            <p className="text-sm font-semibold text-[var(--sea-ink-soft)]">
              Seu palpite: {match.guess.homeScore} x {match.guess.awayScore}
              {match.guess.guessWinnerTeam ? ` · avança: ${match.guess.guessWinnerTeam}` : ''}
              {hasResult
                ? ` · ${match.guess.points} ponto(s)`
                : ''}
            </p>
            {hasResult && match.oddsMultiplier && match.oddsMultiplier > 1 && match.guess.points > 2 ? (
              <p className="text-xs font-black text-amber-600">
                🔥 Odds {match.oddsMultiplier}x — palpite raro multiplicou seus pontos!
              </p>
            ) : null}
            {!hasResult && match.estimatedOdds && match.estimatedOdds > 1 ? (
              <p className={`text-xs font-semibold ${match.estimatedOdds >= 4 ? 'text-amber-600' : 'text-zinc-500'}`}>
                {match.estimatedOdds >= 5
                  ? `🔥 Palpite único! Potencial ${match.estimatedOdds}x se acertar o placar exato`
                  : match.estimatedOdds >= 3
                    ? `⚡ Palpite incomum — potencial ${match.estimatedOdds}x nas odds`
                    : `Potencial ${match.estimatedOdds}x se acertar o placar exato`}
              </p>
            ) : null}
          </div>
        ) : null}
        {error ? (
          <p className="mt-3 rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
        {currentUserId ? (
          <X1Section
            match={match}
            players={players}
            currentUserId={currentUserId}
            isLocked={isLocked}
            hasResult={hasResult}
          />
        ) : null}
        {currentUserId && !isLocked && !hasResult ? (
          userAvailableCards.length > 0 ? (
            <CardSection
              availableCards={userAvailableCards}
              usedCards={match.cardsUsed}
              onUseCard={handleUseCard}
              isUsingCard={isUsingCard}
            />
          ) : null
        ) : match.cardsUsed.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[var(--line)] pt-3">
            <p className="w-full text-xs font-bold text-[var(--sea-ink-soft)]">🃏 Cartas usadas</p>
            {match.cardsUsed.map((cardId) => (
              <span
                key={cardId}
                className="text-xs rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700"
              >
                🃏 {cardId}
              </span>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

const CARD_RARITY_COLORS: Record<CardRarity, string> = {
  common: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  rare: 'bg-blue-100 text-blue-700 border-blue-200',
  legendary: 'bg-amber-100 text-amber-700 border-amber-300',
}

function CardSection({
  availableCards,
  usedCards,
  onUseCard,
  isUsingCard,
}: {
  match?: MatchItem
  availableCards: UserCard[]
  usedCards: string[]
  onUseCard: (cardId: string) => void
  isUsingCard: boolean
}) {
  const alreadyUsedOnThisMatch = usedCards.length > 0
  return (
    <div className="mt-3 border-t border-[var(--line)] pt-3">
      <p className="mb-2 text-xs font-bold text-[var(--sea-ink-soft)]">
        🃏 Cartas
      </p>
      {alreadyUsedOnThisMatch ? (
        <div className="flex flex-wrap gap-1.5">
          {usedCards.map((cardId) => {
            const card = availableCards.find((c) => c.cardId === cardId) ?? {
              icon: '🃏',
              name: cardId,
              rarity: 'common' as CardRarity,
            }
            return (
              <span
                key={cardId}
                className={`text-xs rounded border px-2 py-0.5 font-medium ${CARD_RARITY_COLORS[card.rarity]}`}
              >
                {card.icon} {card.name} ✓
              </span>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {availableCards.map((card) => (
            <button
              key={card.instanceId}
              onClick={() => onUseCard(card.instanceId)}
              disabled={isUsingCard}
              className={`text-xs rounded border px-2 py-1 font-medium transition-opacity hover:opacity-80 disabled:opacity-50 ${CARD_RARITY_COLORS[card.rarity]}`}
              title={card.name}
            >
              {card.icon} {card.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function X1Section({
  match,
  players,
  currentUserId,
  isLocked,
  hasResult,
}: {
  match: MatchItem
  players: Player[]
  currentUserId: string
  isLocked: boolean
  hasResult: boolean
}) {
  const router = useRouter()
  const createFn = useServerFn(createX1Challenge)
  const respondFn = useServerFn(respondX1Challenge)
  const cancelFn = useServerFn(cancelX1Challenge)
  const [open, setOpen] = useState(false)
  const [opponentId, setOpponentId] = useState('')
  const [stake, setStake] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isBusy, setIsBusy] = useState(false)

  const x1 = match.x1
  const opponents = players.filter((player) => player.id !== currentUserId)

  async function run(action: () => Promise<unknown>) {
    setError(null)
    setIsBusy(true)
    try {
      await action()
      setOpen(false)
      setOpponentId('')
      setStake(1)
      await router.invalidate()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível.')
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="mt-4 border-t border-[var(--line)] pt-3">
      <div className="mb-2 flex items-center gap-1.5 text-sm font-bold text-[var(--sea-ink-soft)]">
        <Swords className="size-4" />
        X1
      </div>

      {x1?.accepted ? (
        <div className="rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-semibold">
          {x1.accepted.outcome === null ? (
            <span>
              Duelo com {x1.accepted.opponentName} · {x1.accepted.stake} pt(s)
              em jogo
            </span>
          ) : x1.accepted.outcome === 'won' ? (
            <span className="text-emerald-700">
              Você venceu o X1 vs {x1.accepted.opponentName} (+
              {x1.accepted.delta} pts)
            </span>
          ) : x1.accepted.outcome === 'lost' ? (
            <span className="text-red-700">
              Você perdeu o X1 vs {x1.accepted.opponentName} (
              {x1.accepted.delta} pts)
            </span>
          ) : (
            <span>X1 vs {x1.accepted.opponentName} empatou (push)</span>
          )}
        </div>
      ) : x1?.incoming ? (
        <div className="rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-semibold">
          <p className="mb-2">
            {x1.incoming.challengerName} te desafiou · {x1.incoming.stake} pt(s)
          </p>
          {isLocked ? (
            <p className="text-xs text-[var(--sea-ink-soft)]">
              Jogo já começou.
            </p>
          ) : (
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                disabled={isBusy}
                onClick={() =>
                  run(() =>
                    respondFn({
                      data: { challengeId: x1.incoming!.id, accept: true },
                    }),
                  )
                }
              >
                <Check />
                Aceitar
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={isBusy}
                onClick={() =>
                  run(() =>
                    respondFn({
                      data: { challengeId: x1.incoming!.id, accept: false },
                    }),
                  )
                }
              >
                <X />
                Recusar
              </Button>
            </div>
          )}
        </div>
      ) : x1?.outgoing ? (
        <div className="flex items-center justify-between gap-2 rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-semibold">
          <span>
            Aguardando {x1.outgoing.opponentName} · {x1.outgoing.stake} pt(s)
          </span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isBusy}
            onClick={() =>
              run(() => cancelFn({ data: { challengeId: x1.outgoing!.id } }))
            }
          >
            Cancelar
          </Button>
        </div>
      ) : isLocked || hasResult ? (
        <p className="text-xs font-medium text-[var(--sea-ink-soft)]">
          Sem X1 neste jogo.
        </p>
      ) : opponents.length === 0 ? (
        <p className="text-xs font-medium text-[var(--sea-ink-soft)]">
          Nenhum oponente disponível ainda.
        </p>
      ) : open ? (
        <div className="grid gap-2 rounded-md border border-[var(--line)] bg-white/70 p-3">
          <select
            value={opponentId}
            onChange={(event) => setOpponentId(event.target.value)}
            className="h-10 rounded-md border border-[var(--line)] bg-white px-3 text-sm font-semibold"
          >
            <option value="">Escolha o oponente</option>
            {opponents.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
          <select
            value={stake}
            onChange={(event) => setStake(Number(event.target.value))}
            className="h-10 rounded-md border border-[var(--line)] bg-white px-3 text-sm font-semibold"
          >
            <option value={1}>1 ponto</option>
            <option value={2}>2 pontos</option>
            <option value={3}>3 pontos</option>
          </select>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              disabled={isBusy || !opponentId}
              onClick={() =>
                run(() =>
                  createFn({
                    data: { matchId: match.id, opponentId, stake },
                  }),
                )
              }
            >
              <Swords />
              Enviar desafio
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isBusy}
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Swords />
          Desafiar X1
        </Button>
      )}

      {error ? (
        <p className="mt-2 rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function ScoreInput({
  label,
  name,
  defaultValue,
  disabled,
}: {
  label: string
  name: string
  defaultValue?: number
  disabled: boolean
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={`${name}-${label}`} className="truncate text-xs">
        {label}
      </Label>
      <Input
        id={`${name}-${label}`}
        name={name}
        type="number"
        inputMode="numeric"
        min={0}
        max={30}
        defaultValue={defaultValue ?? ''}
        disabled={disabled}
        className="h-12 text-center text-lg font-black"
        required
      />
    </div>
  )
}

function TeamName({ align, children }: { align?: 'right'; children: string }) {
  return (
    <div
      className={
        align === 'right'
          ? 'truncate text-right text-lg font-black'
          : 'truncate text-lg font-black'
      }
      title={children}
    >
      {children}
    </div>
  )
}

function Scoreboard({ data }: { data: BolaoData }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="island-kicker">Placar</p>
            <CardTitle>Ranking</CardTitle>
          </div>
          <Trophy className="size-7 text-yellow-600" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {data.standings.length === 0 ? (
          <p className="text-sm text-[var(--sea-ink-soft)]">
            O ranking aparece quando a primeira conta for criada.
          </p>
        ) : (
          data.standings.map((player) => (
            <div
              key={player.id}
              className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 rounded-md border border-[var(--line)] bg-white/70 p-3"
            >
              <PositionDelta delta={player.delta} />
              <div className="flex size-9 items-center justify-center rounded-full bg-[var(--sand)] font-black">
                <PositionBadge position={player.position} />
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold">{player.name}</p>
                <p className="text-xs font-medium text-[var(--sea-ink-soft)]">
                  {player.guessesCount} palpite(s) · {player.exactHits} exato(s)
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black">{player.points}</p>
                <p className="text-xs font-bold text-[var(--sea-ink-soft)]">
                  pts
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

function PositionBadge({ position }: { position: number }) {
  if (position <= 3) {
    const color =
      position === 1
        ? 'text-yellow-500'
        : position === 2
          ? 'text-gray-400'
          : 'text-amber-700'

    return <Medal className={`size-5 ${color}`} aria-label={`${position}º`} />
  }

  return <>{position}</>
}

function PositionDelta({ delta }: { delta: number }) {
  if (delta > 0) {
    return (
      <ArrowUp className="size-4 text-emerald-600" aria-label="Subiu posições" />
    )
  }

  if (delta < 0) {
    return (
      <ArrowDown className="size-4 text-red-600" aria-label="Caiu posições" />
    )
  }

  return <span className="block w-4 text-center text-[var(--sea-ink-soft)]">·</span>
}

function RulesCard() {
  return (
    <Card className="border-yellow-500/30 bg-yellow-100/45">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="island-kicker">Regras</p>
            <CardTitle>Pontuação</CardTitle>
          </div>
          <ShieldCheck className="size-7 text-emerald-700" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center gap-3 rounded-md bg-white/70 p-3">
          <Medal className="size-5 text-emerald-700" />
          <p className="text-sm font-bold">Acertar o palpite = 2 pontos</p>
        </div>
        <div className="flex items-center gap-3 rounded-md bg-white/70 p-3">
          <Trophy className="size-5 text-yellow-700" />
          <p className="text-sm font-bold">
            Acertar o placar exato = 1 ponto extra (com odds)
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-md bg-white/70 p-3">
          <Flag className="size-5 text-amber-600" />
          <p className="text-sm font-bold">
            Placar raro = ponto extra multiplicado (até 6x)
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-md bg-white/70 p-3">
          <Swords className="size-5 text-red-500" />
          <p className="text-sm font-bold">
            X1 tem ranking próprio — não afeta o ranking geral
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
