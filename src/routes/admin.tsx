import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ListFilter,
  RotateCcw,
  Save,
  ShieldCheck,
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
import { getAdminData, saveMatchResult } from '#/lib/bolao'

export const Route = createFileRoute('/admin')({
  loader: () => getAdminData(),
  component: AdminPage,
  errorComponent: AdminError,
})

type AdminData = Awaited<ReturnType<typeof getAdminData>>
type AdminMatch = AdminData['matches'][number]
type AdminFilter = 'Todos' | 'Sem resultado' | 'Confirmados' | 'Mata-mata'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Sao_Paulo',
})

function AdminPage() {
  const data = Route.useLoaderData()
  const [filter, setFilter] = useState<AdminFilter>('Sem resultado')
  const filteredMatches = data.matches.filter((match) =>
    matchMatchesFilter(match, filter),
  )

  return (
    <main className="min-h-screen px-4 py-6 text-[var(--sea-ink)] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="island-shell overflow-hidden rounded-lg">
          <div className="pitch-band grid gap-5 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="green" className="gap-1">
                  <ShieldCheck className="size-3.5" />
                  Admin
                </Badge>
                <Badge variant="canary">Bolão CFFDP</Badge>
              </div>
              <h1 className="display-title text-4xl font-bold leading-tight sm:text-5xl">
                Resultados
              </h1>
              <p className="mt-3 max-w-2xl text-base font-medium text-[var(--sea-ink-soft)]">
                Lance o placar oficial de cada partida. O ranking e os
                classificados das próximas fases são atualizados depois de
                salvar.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white"
            >
              <ArrowLeft className="size-4" />
              Voltar ao bolão
            </Link>
          </div>
        </header>

        <section className="grid gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="island-kicker">Conferência</p>
              <h2 className="text-2xl font-bold">Tabela de resultados</h2>
              <p className="mt-1 text-sm font-semibold text-[var(--sea-ink-soft)]">
                {filteredMatches.length} de {data.matches.length} jogos
              </p>
            </div>
            <Badge variant="secondary">{data.user.email}</Badge>
          </div>

          <AdminFilterTabs
            activeFilter={filter}
            onChange={setFilter}
            data={data}
          />

          <div className="grid gap-4">
            {filteredMatches.map((match) => (
              <AdminMatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function AdminError({ error }: { error: Error }) {
  return (
    <main className="min-h-screen px-4 py-6 text-[var(--sea-ink)] sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-2xl gap-4">
        <Card className="feature-card">
          <CardHeader>
            <Badge variant="canary" className="w-fit gap-1">
              <ShieldCheck className="size-3.5" />
              Admin
            </Badge>
            <CardTitle>Acesso restrito</CardTitle>
            <CardDescription>
              {error.message ||
                'Entre com um email listado em ADMIN_EMAILS para acessar.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[var(--sea-ink)] px-4 text-sm font-semibold text-white shadow-sm"
            >
              <ArrowLeft className="size-4" />
              Voltar ao bolão
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function matchMatchesFilter(match: AdminMatch, filter: AdminFilter) {
  if (filter === 'Todos') return true
  if (filter === 'Sem resultado') return match.resultStatus !== 'confirmed'
  if (filter === 'Confirmados') return match.resultStatus === 'confirmed'

  return match.round !== 'Fase de grupos'
}

function AdminFilterTabs({
  activeFilter,
  onChange,
  data,
}: {
  activeFilter: AdminFilter
  onChange: (filter: AdminFilter) => void
  data: AdminData
}) {
  const filters: AdminFilter[] = [
    'Sem resultado',
    'Confirmados',
    'Mata-mata',
    'Todos',
  ]

  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-[var(--line)] bg-white/65 p-2">
      <div className="mr-1 hidden items-center gap-1.5 px-2 text-sm font-bold text-[var(--sea-ink-soft)] sm:flex">
        <ListFilter className="size-4" />
        Filtro
      </div>
      {filters.map((filter) => (
        <Button
          key={filter}
          type="button"
          variant={activeFilter === filter ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange(filter)}
          title={`Filtrar por ${filter}`}
        >
          {filter}
          <span className="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[11px] font-black">
            {
              data.matches.filter((match) => matchMatchesFilter(match, filter))
                .length
            }
          </span>
        </Button>
      ))}
    </div>
  )
}

function AdminMatchCard({ match }: { match: AdminMatch }) {
  const router = useRouter()
  const saveResult = useServerFn(saveMatchResult)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const hasResult = match.resultStatus === 'confirmed'
  const isKnockout = match.round !== 'Fase de grupos'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSaving(true)

    const formData = new FormData(event.currentTarget)

    try {
      await saveResult({
        data: {
          matchId: match.id,
          homeScore: readNullableNumber(formData, 'homeScore'),
          awayScore: readNullableNumber(formData, 'awayScore'),
          homePenaltyScore: readNullableNumber(formData, 'homePenaltyScore'),
          awayPenaltyScore: readNullableNumber(formData, 'awayPenaltyScore'),
          winnerTeam: readNullableString(formData, 'winnerTeam'),
        },
      })
      await router.invalidate()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleClear() {
    setError(null)
    setIsSaving(true)

    try {
      await saveResult({
        data: {
          matchId: match.id,
          homeScore: null,
          awayScore: null,
          homePenaltyScore: null,
          awayPenaltyScore: null,
          winnerTeam: null,
        },
      })
      await router.invalidate()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível limpar.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="feature-card">
      <CardHeader className="gap-3 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Jogo {match.matchNumber}</Badge>
            <Badge variant="secondary">{match.group}</Badge>
            <Badge variant={hasResult ? 'green' : 'canary'}>
              {hasResult ? 'Confirmado' : 'Pendente'}
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
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
              <AdminScoreInput
                label={match.homeTeam}
                name="homeScore"
                defaultValue={match.homeScore}
              />
              <span className="pb-2 text-center text-lg font-black">x</span>
              <AdminScoreInput
                label={match.awayTeam}
                name="awayScore"
                defaultValue={match.awayScore}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <AdminScoreInput
                label="Pênaltis mandante"
                name="homePenaltyScore"
                defaultValue={match.homePenaltyScore}
                disabled={!isKnockout}
              />
              <AdminScoreInput
                label="Pênaltis visitante"
                name="awayPenaltyScore"
                defaultValue={match.awayPenaltyScore}
                disabled={!isKnockout}
              />
              <div className="grid gap-1.5">
                <Label htmlFor={`winner-${match.id}`} className="text-xs">
                  Classificado
                </Label>
                <select
                  id={`winner-${match.id}`}
                  name="winnerTeam"
                  defaultValue={match.winnerTeam ?? ''}
                  disabled={!isKnockout}
                  className="h-12 rounded-md border border-[var(--line)] bg-white px-3 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  <option value="">Automático</option>
                  <option value={match.homeTeam}>{match.homeTeam}</option>
                  <option value={match.awayTeam}>{match.awayTeam}</option>
                </select>
              </div>
            </div>

            <div className="grid gap-2 self-end sm:grid-cols-2 lg:grid-cols-1">
              <Button type="submit" disabled={isSaving}>
                <Save />
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={isSaving || !hasResult}
                onClick={handleClear}
              >
                <RotateCcw />
                Limpar
              </Button>
            </div>
          </div>

          {hasResult ? (
            <div className="flex flex-wrap items-center gap-2 rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-bold">
              <CheckCircle2 className="size-4 text-emerald-700" />
              Resultado: {match.homeScore} x {match.awayScore}
              {match.homePenaltyScore !== null &&
              match.awayPenaltyScore !== null
                ? ` · pênaltis ${match.homePenaltyScore} x ${match.awayPenaltyScore}`
                : ''}
              {match.winnerTeam ? ` · classificado: ${match.winnerTeam}` : ''}
            </div>
          ) : null}

          {error ? (
            <p className="rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  )
}

function AdminScoreInput({
  label,
  name,
  defaultValue,
  disabled,
}: {
  label: string
  name: string
  defaultValue?: number | null
  disabled?: boolean
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

function readNullableNumber(formData: FormData, key: string) {
  const value = String(formData.get(key) || '').trim()

  if (value === '') return null

  const parsed = Number(value)

  return Number.isInteger(parsed) ? parsed : null
}

function readNullableString(formData: FormData, key: string) {
  const value = String(formData.get(key) || '').trim()

  return value || null
}
