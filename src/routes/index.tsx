import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import {
  CalendarDays,
  Flag,
  ListFilter,
  Lock,
  LogOut,
  Medal,
  Save,
  ShieldCheck,
  Trophy,
  UserPlus,
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
import { getBolaoData, saveGuess } from '#/lib/bolao'

export const Route = createFileRoute('/')({
  loader: () => getBolaoData(),
  component: Home,
})

type BolaoData = Awaited<ReturnType<typeof getBolaoData>>
type MatchItem = BolaoData['matches'][number]
type PhaseFilter =
  | 'Todos'
  | 'Grupos'
  | '16 avos'
  | 'Oitavas'
  | 'Quartas'
  | 'Finais'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Sao_Paulo',
})

function Home() {
  const data = Route.useLoaderData()
  const router = useRouter()
  const [phase, setPhase] = useState<PhaseFilter>('Todos')
  const filteredMatches = data.matches.filter((match) =>
    matchMatchesPhase(match, phase),
  )

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
              {!data.user ? (
                <Badge variant="secondary" className="gap-1">
                  <Lock className="size-3.5" />
                  Entre para salvar
                </Badge>
              ) : data.user.isAdmin ? (
                <Link
                  to="/admin"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white"
                >
                  <ShieldCheck className="size-4" />
                  Admin
                </Link>
              ) : null}
            </div>

            <PhaseTabs activePhase={phase} onChange={setPhase} data={data} />

            <div className="grid gap-4">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  canGuess={Boolean(data.user)}
                />
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <Scoreboard data={data} />
            <RulesCard />
          </aside>
        </section>
      </div>
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
    return (
      <div className="flex min-w-0 items-center gap-3 rounded-lg border border-white/50 bg-white/70 p-3 shadow-sm">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--sea-ink)] text-sm font-bold text-white">
          {user.name.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{user.name}</p>
          <p className="truncate text-xs text-[var(--sea-ink-soft)]">
            {user.email}
          </p>
        </div>
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
      </div>
    )
  }

  return <AuthCard onDone={onDone} />
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

function MatchCard({
  match,
  canGuess,
}: {
  match: MatchItem
  canGuess: boolean
}) {
  const router = useRouter()
  const saveGuessFn = useServerFn(saveGuess)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const isLocked = new Date(match.startsAt).getTime() <= Date.now()
  const hasResult = match.homeScore !== null && match.awayScore !== null

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const homeScore = Number(formData.get('homeScore'))
    const awayScore = Number(formData.get('awayScore'))

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
        },
      })
      await router.invalidate()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar.')
    } finally {
      setIsSaving(false)
    }
  }

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
            Resultado: {match.homeScore} x {match.awayScore}
          </div>
        ) : null}
        <form
          className="grid gap-3 sm:grid-cols-[1fr_auto]"
          onSubmit={handleSubmit}
        >
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
        </form>
        {match.guess ? (
          <p className="mt-3 text-sm font-semibold text-[var(--sea-ink-soft)]">
            Seu palpite: {match.guess.homeScore} x {match.guess.awayScore}
            {hasResult ? ` · ${match.guess.points} ponto(s)` : ''}
          </p>
        ) : null}
        {error ? (
          <p className="mt-3 rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
      </CardContent>
    </Card>
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
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-[var(--line)] bg-white/70 p-3"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-[var(--sand)] font-black">
                {player.position}
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
            Acertar o placar exato = 1 ponto extra
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
