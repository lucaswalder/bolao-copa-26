import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react'

import { Card, CardContent } from '#/components/ui/card'
import { getMissionsData } from '#/lib/bolao'

export const Route = createFileRoute('/missoes')({
  loader: () => getMissionsData(),
  component: MissoesPage,
})

type MissionsData = Awaited<ReturnType<typeof getMissionsData>>
type Mission = MissionsData['players'][number]['missions'][number]

function MissoesPage() {
  const { players, currentUserId } = Route.useLoaderData() as MissionsData

  const currentPlayer = players.find((p) => p.id === currentUserId)

  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <BackLink />
          <p className="mt-6 text-sm text-muted-foreground">
            Entre para ver suas missões.
          </p>
        </div>
      </div>
    )
  }

  const completed = currentPlayer.missions.filter((m) => m.completedAt)
  const inProgress = currentPlayer.missions.filter(
    (m) => !m.completedAt && m.progress > 0,
  )
  const locked = currentPlayer.missions.filter(
    (m) => !m.completedAt && m.progress === 0,
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <BackLink />

        {/* Explicação */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-amber-800 font-semibold mb-1">
              🏆 Como funcionam as missões?
            </p>
            <p className="text-xs text-amber-700 leading-relaxed">
              As missões progridem automaticamente conforme você joga — não
              precisa ativar nada. Ao completar uma missão, você ganha uma
              carta especial automaticamente no inventário.
            </p>
          </CardContent>
        </Card>

        {/* Progresso geral */}
        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-muted-foreground">
            {completed.length} de {currentPlayer.missions.length} missões concluídas
          </span>
          <div className="flex gap-1">
            {currentPlayer.missions.map((m) => (
              <div
                key={m.id}
                className={`w-2 h-2 rounded-full ${m.completedAt ? 'bg-green-500' : m.progress > 0 ? 'bg-amber-400' : 'bg-zinc-200'}`}
              />
            ))}
          </div>
        </div>

        {/* Em andamento */}
        {inProgress.length > 0 && (
          <Section title="Em andamento">
            {inProgress.map((m) => (
              <MissionItem key={m.id} mission={m} defaultOpen />
            ))}
          </Section>
        )}

        {/* Concluídas */}
        {completed.length > 0 && (
          <Section title="Concluídas ✓">
            {completed.map((m) => (
              <MissionItem key={m.id} mission={m} />
            ))}
          </Section>
        )}

        {/* Bloqueadas / não iniciadas */}
        <Section title="Disponíveis">
          {locked.map((m) => (
            <MissionItem key={m.id} mission={m} />
          ))}
        </Section>
      </div>
    </div>
  )
}

function BackLink() {
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏆</span>
        <h1 className="text-2xl font-bold">Missões</h1>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
        {title}
      </h2>
      <Card>
        <CardContent className="p-0 divide-y divide-border">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

function MissionItem({
  mission,
  defaultOpen,
}: {
  mission: Mission
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  const completed = !!mission.completedAt
  const progressPct = Math.min(
    100,
    Math.round((mission.progress / mission.goal) * 100),
  )

  return (
    <div>
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-xl shrink-0">{mission.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-bold ${completed ? 'text-green-700' : ''}`}>
              {mission.name}
            </span>
            {completed && (
              <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
            )}
          </div>
          {!completed && mission.progress > 0 && (
            <div className="mt-1 h-1.5 rounded-full bg-zinc-200 overflow-hidden w-32">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}
        </div>
        <span className="text-xs tabular-nums text-muted-foreground shrink-0 mr-1">
          {mission.progress}/{mission.goal}
        </span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 pt-0 space-y-3 bg-zinc-50/60">
          <p className="text-sm text-muted-foreground">{mission.description}</p>
          <div className="flex items-center justify-between">
            <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden mr-3">
              <div
                className={`h-full rounded-full transition-all ${completed ? 'bg-green-500' : 'bg-amber-400'}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-bold tabular-nums text-muted-foreground shrink-0">
              {mission.progress}/{mission.goal}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Recompensa:</span>
            <span className="text-xs font-bold text-amber-700">
              🎁 {mission.reward}
            </span>
          </div>
          {completed && mission.completedAt && (
            <p className="text-xs text-green-600 font-semibold">
              ✓ Concluída em{' '}
              {new Date(mission.completedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
