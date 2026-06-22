import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { getMissionsData } from '#/lib/bolao'

export const Route = createFileRoute('/missoes')({
  loader: () => getMissionsData(),
  component: MissoesPage,
})

type MissionsData = Awaited<ReturnType<typeof getMissionsData>>

function MissoesPage() {
  const { players, currentUserId } = Route.useLoaderData() as MissionsData

  const currentPlayer = players.find((p) => p.id === currentUserId)
  const otherPlayers = players.filter((p) => p.id !== currentUserId)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
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

        {/* Como funciona */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-4">
            <p className="text-sm text-amber-800 font-medium mb-1">Como funcionam as missões?</p>
            <p className="text-xs text-amber-700">
              As missões progridem automaticamente conforme você joga — não é preciso ativar nada.
              Acerte placares, ganhe duelos X1 e acompanhe a Copa para completá-las.
            </p>
          </CardContent>
        </Card>

        {currentPlayer ? (
          <PlayerMissionsCard player={currentPlayer} isCurrentUser />
        ) : (
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                Entre para ver suas missões.
              </p>
            </CardContent>
          </Card>
        )}

        {otherPlayers.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-1">
              Outros jogadores
            </h2>
            {otherPlayers.map((player) => (
              <PlayerMissionsCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PlayerMissionsCard({
  player,
  isCurrentUser,
}: {
  player: MissionsData['players'][number]
  isCurrentUser?: boolean
}) {
  const completedCount = player.missions.filter((m) => m.completedAt).length
  const totalCount = player.missions.length

  return (
    <Card className={isCurrentUser ? 'border-2 border-primary/30' : ''}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {isCurrentUser ? '⭐ ' : ''}
            {player.name}
          </CardTitle>
          <span className="text-sm font-semibold text-muted-foreground">
            {completedCount}/{totalCount} concluídas
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {player.missions.map((mission) => (
          <MissionRow key={mission.id} mission={mission} />
        ))}
      </CardContent>
    </Card>
  )
}

function MissionRow({
  mission,
}: {
  mission: MissionsData['players'][number]['missions'][number]
}) {
  const completed = !!mission.completedAt
  const progressPct = Math.min(
    100,
    Math.round((mission.progress / mission.goal) * 100),
  )

  return (
    <div
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
        completed
          ? 'bg-green-50 border border-green-200'
          : mission.progress > 0
            ? 'bg-white border border-zinc-200'
            : 'bg-zinc-50 border border-transparent opacity-60'
      }`}
    >
      <span className="text-xl shrink-0">{mission.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{mission.name}</span>
          {completed ? (
            <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">{mission.description}</p>
        {!completed && (
          <div className="mt-1.5 h-1.5 rounded-full bg-zinc-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
      </div>
      <span
        className={`text-xs font-black shrink-0 tabular-nums ${
          completed ? 'text-green-600' : 'text-muted-foreground'
        }`}
      >
        {mission.progress}/{mission.goal}
      </span>
    </div>
  )
}
