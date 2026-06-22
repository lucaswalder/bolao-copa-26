import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Sword, Trophy, Equal } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { getX1Data } from '#/lib/bolao'

export const Route = createFileRoute('/x1')({
  loader: () => getX1Data(),
  component: X1Page,
})

type X1Data = Awaited<ReturnType<typeof getX1Data>>

function X1Page() {
  const { standings, duels } = Route.useLoaderData() as X1Data

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
            <Sword className="w-6 h-6 text-red-500" />
            <h1 className="text-2xl font-bold">Ranking X1</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Classificação
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {standings.length === 0 ? (
              <p className="text-sm text-muted-foreground px-4 pb-4">
                Nenhum X1 disputado ainda.
              </p>
            ) : (
              <div className="divide-y">
                {standings.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <span
                      className={`text-sm font-bold w-6 text-center ${
                        player.position === 1
                          ? 'text-yellow-500'
                          : player.position === 2
                            ? 'text-zinc-400'
                            : player.position === 3
                              ? 'text-amber-600'
                              : 'text-muted-foreground'
                      }`}
                    >
                      {player.position}°
                    </span>
                    <span className="flex-1 font-medium text-sm">
                      {player.name}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="text-green-600 font-medium">
                        {player.wins}V
                      </span>
                      <span className="text-zinc-400">{player.draws}E</span>
                      <span className="text-red-500 font-medium">
                        {player.losses}D
                      </span>
                    </div>
                    <Badge
                      variant={
                        player.points > 0
                          ? 'green'
                          : player.points < 0
                            ? 'default'
                            : 'secondary'
                      }
                      className="text-xs min-w-[48px] justify-center"
                    >
                      {player.points > 0 ? '+' : ''}
                      {player.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sword className="w-4 h-4 text-red-500" />
              Histórico de Duelos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {duels.length === 0 ? (
              <p className="text-sm text-muted-foreground px-4 pb-4">
                Nenhum X1 finalizado ainda.
              </p>
            ) : (
              <div className="divide-y">
                {duels.map((duel, i) => {
                  const isDraw = duel.winnerId === null
                  return (
                    <div key={i} className="px-4 py-3 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm min-w-0">
                          <span
                            className={`font-medium truncate ${duel.winnerId === duel.challengerId ? 'text-green-600' : duel.winnerId === duel.opponentId ? 'text-muted-foreground' : ''}`}
                          >
                            {duel.challengerName}
                          </span>
                          {isDraw ? (
                            <Equal className="w-3 h-3 text-zinc-400 shrink-0" />
                          ) : (
                            <Sword className="w-3 h-3 text-red-400 shrink-0" />
                          )}
                          <span
                            className={`font-medium truncate ${duel.winnerId === duel.opponentId ? 'text-green-600' : duel.winnerId === duel.challengerId ? 'text-muted-foreground' : ''}`}
                          >
                            {duel.opponentName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="secondary" className="text-xs">
                            {duel.stake} pt{duel.stake > 1 ? 's' : ''}
                          </Badge>
                          {isDraw ? (
                            <Badge variant="secondary" className="text-xs">
                              Empate
                            </Badge>
                          ) : (
                            <Badge variant="green" className="text-xs">
                              {duel.winnerId === duel.challengerId
                                ? duel.challengerName
                                : duel.opponentName}{' '}
                              venceu
                            </Badge>
                          )}
                        </div>
                      </div>
                      {duel.match && (
                        <p className="text-xs text-muted-foreground">
                          {duel.match.homeTeam} {duel.match.homeScore} ×{' '}
                          {duel.match.awayScore} {duel.match.awayTeam} —{' '}
                          {duel.match.round}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Como funciona o X1:</strong> Desafie outro jogador em uma
              partida com uma aposta de 1 a 3 pontos. Quem tiver o palpite mais
              próximo do resultado real ganha o stake do adversário. Em caso de
              empate, ninguém perde ou ganha. Os pontos do X1{' '}
              <strong>não afetam o ranking principal</strong> — são contados
              apenas aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
