import { useState } from 'react'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { ArrowLeft, ShoppingCart, Sparkles } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { CARDS, buyCard, getCardsData } from '#/lib/bolao'
import type { CardRarity } from '#/lib/bolao'

export const Route = createFileRoute('/cartas')({
  loader: () => getCardsData(),
  component: CartasPage,
})

type CardsData = Awaited<ReturnType<typeof getCardsData>>

const RARITY_LABEL: Record<CardRarity, string> = {
  common: 'Comum',
  rare: 'Raro',
  legendary: 'Lendário',
}

const RARITY_COLORS: Record<
  CardRarity,
  { bg: string; border: string; badge: string }
> = {
  common: {
    bg: 'bg-zinc-50',
    border: 'border-zinc-200',
    badge: 'bg-zinc-100 text-zinc-700',
  },
  rare: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
  },
  legendary: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    badge: 'bg-amber-100 text-amber-700',
  },
}

function CartasPage() {
  const data = Route.useLoaderData() as CardsData
  const { cards, currentUser } = data
  const router = useRouter()
  const buyFn = useServerFn(buyCard)
  const [buying, setBuying] = useState<CardRarity | null>(null)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-sm text-muted-foreground">
            Entre para ver suas cartas.
          </p>
        </div>
      </div>
    )
  }

  const available = cards.filter((c) => c.available)
  const used = cards.filter((c) => !c.available)

  async function handleBuy(rarity: CardRarity) {
    setBuying(rarity)
    setMessage(null)
    try {
      const result = await buyFn({ data: { rarity } })
      setMessage({
        type: 'success',
        text: `Você comprou: ${result.card.icon} ${result.card.name} (${result.cost} pts)`,
      })
      await router.invalidate()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Erro ao comprar carta.',
      })
    } finally {
      setBuying(null)
    }
  }

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
            <span className="text-2xl">🃏</span>
            <h1 className="text-2xl font-bold">Cartas Especiais</h1>
          </div>
        </div>

        {/* Inventário */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Suas Cartas Disponíveis ({available.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {available.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Você não tem cartas disponíveis no momento. Novas cartas são
                distribuídas no início de cada fase da Copa.
              </p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {available.map((card) => (
                  <CardItem key={card.instanceId} card={card} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loja */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-green-600" />
              Loja (compra aleatória)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Gaste seus <strong>pontos X1</strong> para comprar uma carta
              aleatória da raridade escolhida.
            </p>
            {message && (
              <p
                className={`text-sm font-medium rounded-md px-3 py-2 ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message.text}
              </p>
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  { rarity: 'common' as CardRarity, pts: 1 },
                  { rarity: 'rare' as CardRarity, pts: 5 },
                  { rarity: 'legendary' as CardRarity, pts: 10 },
                ] as const
              ).map(({ rarity, pts }) => {
                const colors = RARITY_COLORS[rarity]
                return (
                  <div
                    key={rarity}
                    className={`rounded-lg border p-3 space-y-2 ${colors.bg} ${colors.border}`}
                  >
                    <span
                      className={`inline-block text-xs font-bold rounded px-1.5 py-0.5 ${colors.badge}`}
                    >
                      {RARITY_LABEL[rarity]}
                    </span>
                    <p className="text-sm font-black">{pts} pts</p>
                    <Button
                      size="sm"
                      className="w-full"
                      disabled={buying !== null}
                      onClick={() => handleBuy(rarity)}
                    >
                      {buying === rarity ? 'Comprando...' : 'Comprar'}
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Cartas usadas */}
        {used.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-muted-foreground">
                Cartas Usadas ({used.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {used.map((card) => (
                  <CardItem key={card.instanceId} card={card} dimmed />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Catálogo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Todas as Cartas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {[...CARDS].map((card) => {
                const colors = RARITY_COLORS[card.rarity]
                return (
                  <div
                    key={card.id}
                    className={`rounded-lg border p-3 ${colors.bg} ${colors.border}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl shrink-0">{card.icon}</span>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-bold">{card.name}</span>
                          <span
                            className={`text-[10px] font-bold rounded px-1 py-0.5 ${colors.badge}`}
                          >
                            {RARITY_LABEL[card.rarity]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CardItem({
  card,
  dimmed,
}: {
  card: CardsData['cards'][number]
  dimmed?: boolean
}) {
  const colors = RARITY_COLORS[card.rarity]
  return (
    <div
      className={`rounded-lg border p-3 space-y-1 transition-opacity ${
        colors.bg
      } ${colors.border} ${dimmed ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{card.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-bold truncate">{card.name}</span>
            <span
              className={`text-[10px] font-bold rounded px-1 py-0.5 shrink-0 ${colors.badge}`}
            >
              {RARITY_LABEL[card.rarity]}
            </span>
          </div>
        </div>
        {card.usedAt && (
          <Badge variant="secondary" className="text-[10px] shrink-0">
            Usada
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{card.description}</p>
      <p className="text-[10px] text-muted-foreground">
        Obtida: {card.acquiredRound}
      </p>
    </div>
  )
}
