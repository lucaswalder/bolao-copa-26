import { useState } from 'react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { ArrowLeft, Brain, Crown, Lock, Save, Trophy } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Label } from '#/components/ui/label'
import { getGuruData, saveChampionPick } from '#/lib/bolao'

export const Route = createFileRoute('/guru')({
  loader: () => getGuruData(),
  component: GuruPage,
})

type GuruData = Awaited<ReturnType<typeof getGuruData>>

const POINTS_TABLE: { label: string; points: number | null }[] = [
  { label: 'Fase de grupos', points: 50 },
  { label: '16 avos de final', points: 40 },
  { label: 'Oitavas de final', points: 30 },
  { label: 'Quartas de final', points: 20 },
  { label: 'Semifinal', points: 10 },
  { label: 'Final', points: null },
]

function GuruPage() {
  const data = Route.useLoaderData()

  return (
    <main className="min-h-screen px-4 py-6 text-[var(--sea-ink)] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="island-shell overflow-hidden rounded-lg">
          <div className="pitch-band grid gap-4 p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Badge variant="green" className="gap-1">
                <Brain className="size-3.5" />
                Guru do Futebol
              </Badge>
              <Link
                to="/"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white"
              >
                <ArrowLeft className="size-4" />
                Voltar aos jogos
              </Link>
            </div>
            <div>
              <h1 className="display-title text-3xl font-bold leading-tight text-[var(--sea-ink)] sm:text-4xl">
                Palpite de campeão
              </h1>
              <p className="mt-2 max-w-2xl text-base font-medium text-[var(--sea-ink-soft)]">
                Crave o grande campeão da Copa. Quanto mais cedo você acertar,
                mais pontos de bônus leva. Pode trocar até a Final começar — mas
                trocar tarde vale menos.
              </p>
            </div>
          </div>
        </header>

        {data.user ? (
          <ChampionPickCard data={data} />
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-sm font-semibold text-[var(--sea-ink-soft)]">
              Entre no bolão para palpitar o campeão.
            </CardContent>
          </Card>
        )}

        <PointsCard activeLabel={data.phase.label} locked={data.phase.locked} />

        {data.picks.length > 0 ? <PicksCard data={data} /> : null}
      </div>
    </main>
  )
}

function ChampionPickCard({ data }: { data: GuruData }) {
  const router = useRouter()
  const saveFn = useServerFn(saveChampionPick)
  const [team, setTeam] = useState(data.pick?.team ?? '')
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const locked = data.phase.locked
  const championTeam = data.championTeam

  async function handleSave() {
    setError(null)
    setIsSaving(true)
    try {
      await saveFn({ data: { team } })
      await router.invalidate()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="island-kicker">Seu palpite</p>
            <CardTitle>Quem leva a taça?</CardTitle>
          </div>
          <Crown className="size-7 text-yellow-600" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-bold">
          {locked ? (
            <span className="inline-flex items-center gap-1.5 text-[var(--sea-ink-soft)]">
              <Lock className="size-4" />
              Bloqueado — a Final já começou
            </span>
          ) : (
            <>
              <Trophy className="size-4 text-emerald-700" />
              <span>
                Fase atual: {data.phase.label} · vale{' '}
                <span className="text-emerald-700">{data.phase.points} pts</span>{' '}
                agora
              </span>
            </>
          )}
        </div>

        {data.pick ? (
          <div className="rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-semibold">
            Palpite atual: <strong>{data.pick.team}</strong> · vale{' '}
            {data.pick.bonusPoints} pts (travado em {data.pick.phaseLabel})
            {championTeam ? (
              data.pick.team === championTeam ? (
                <span className="ml-1 text-emerald-700">
                  — acertou! +{data.pick.bonusPoints} pts
                </span>
              ) : (
                <span className="ml-1 text-red-700">— não foi dessa vez</span>
              )
            ) : null}
          </div>
        ) : null}

        {locked ? null : (
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="grid gap-1.5">
              <Label htmlFor="champion-team">Time campeão</Label>
              <select
                id="champion-team"
                value={team}
                onChange={(event) => setTeam(event.target.value)}
                className="h-11 rounded-md border border-[var(--line)] bg-white px-3 text-sm font-semibold"
              >
                <option value="">Escolha um time</option>
                {data.teams.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="button"
              disabled={!team || isSaving || team === data.pick?.team}
              onClick={handleSave}
            >
              <Save />
              {isSaving ? 'Salvando...' : 'Salvar palpite'}
            </Button>
          </div>
        )}

        {error ? (
          <p className="rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}

function PointsCard({
  activeLabel,
  locked,
}: {
  activeLabel: string
  locked: boolean
}) {
  return (
    <Card className="border-yellow-500/30 bg-yellow-100/45">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="island-kicker">Bônus</p>
            <CardTitle>Pontos por fase</CardTitle>
          </div>
          <Brain className="size-7 text-emerald-700" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {POINTS_TABLE.map((row) => {
          const isActive = !locked && row.label === activeLabel
          return (
            <div
              key={row.label}
              className={`flex items-center justify-between rounded-md border p-3 text-sm font-bold ${
                isActive
                  ? 'border-emerald-500/40 bg-emerald-50'
                  : 'border-[var(--line)] bg-white/70'
              }`}
            >
              <span>{row.label}</span>
              <span>
                {row.points === null ? (
                  <span className="inline-flex items-center gap-1.5 text-[var(--sea-ink-soft)]">
                    <Lock className="size-4" />
                    bloqueado
                  </span>
                ) : (
                  `${row.points} pts`
                )}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function PicksCard({ data }: { data: GuruData }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="island-kicker">Palpites</p>
            <CardTitle>Quem apostou em quem</CardTitle>
          </div>
          <Crown className="size-7 text-yellow-600" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {data.picks.map((pick) => (
          <div
            key={pick.userId}
            className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border p-3 ${
              pick.isChampion
                ? 'border-emerald-500/40 bg-emerald-50'
                : 'border-[var(--line)] bg-white/70'
            }`}
          >
            <div className="min-w-0">
              <p className="truncate font-bold">{pick.name}</p>
              <p className="text-xs font-medium text-[var(--sea-ink-soft)]">
                {pick.team}
                {pick.isChampion ? ' · campeão!' : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-black">{pick.bonusPoints}</p>
              <p className="text-xs font-bold text-[var(--sea-ink-soft)]">
                pts ({pick.phaseLabel})
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
