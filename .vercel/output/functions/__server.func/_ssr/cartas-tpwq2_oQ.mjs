import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link, f as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as buyCard, t as CARDS } from "./bolao-DVb7JzZB.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-DgN_QdeO.mjs";
import { t as Badge } from "./badge-CMeIM4Xt.mjs";
import { O as ArrowLeft, o as Sparkles, s as ShoppingCart } from "../_libs/lucide-react.mjs";
import { n as useServerFn, t as Button } from "./button-DygBLB-0.mjs";
import { t as Route } from "./cartas-CSUNeAUH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cartas-tpwq2_oQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RARITY_LABEL = {
	common: "Comum",
	rare: "Raro",
	legendary: "Lendário"
};
var RARITY_COLORS = {
	common: {
		bg: "bg-zinc-50",
		border: "border-zinc-200",
		badge: "bg-zinc-100 text-zinc-700"
	},
	rare: {
		bg: "bg-blue-50",
		border: "border-blue-200",
		badge: "bg-blue-100 text-blue-700"
	},
	legendary: {
		bg: "bg-amber-50",
		border: "border-amber-300",
		badge: "bg-amber-100 text-amber-700"
	}
};
function CartasPage() {
	const { cards, currentUser } = Route.useLoaderData();
	const router = useRouter();
	const buyFn = useServerFn(buyCard);
	const [buying, setBuying] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)(null);
	if (!currentUser) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-3xl mx-auto px-4 py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Entre para ver suas cartas."
			})
		})
	});
	const available = cards.filter((c) => c.available);
	const used = cards.filter((c) => !c.available);
	async function handleBuy(rarity) {
		setBuying(rarity);
		setMessage(null);
		try {
			const result = await buyFn({ data: { rarity } });
			setMessage({
				type: "success",
				text: `Você comprou: ${result.card.icon} ${result.card.name} (${result.cost} pts)`
			});
			await router.invalidate();
		} catch (err) {
			setMessage({
				type: "error",
				text: err instanceof Error ? err.message : "Erro ao comprar carta."
			});
		} finally {
			setBuying(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl mx-auto px-4 py-6 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-muted-foreground hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl",
							children: "🃏"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "Cartas Especiais"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-amber-500" }),
						"Suas Cartas Disponíveis (",
						available.length,
						")"
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: available.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Você não tem cartas disponíveis no momento. Novas cartas são distribuídas no início de cada fase da Copa."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: available.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardItem, { card }, card.instanceId))
				}) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-4 h-4 text-green-600" }), "Loja (compra aleatória)"]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Gaste seus ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "pontos X1" }),
								" para comprar uma carta aleatória da raridade escolhida."
							]
						}),
						message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-sm font-medium rounded-md px-3 py-2 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`,
							children: message.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-3",
							children: [
								{
									rarity: "common",
									pts: 1
								},
								{
									rarity: "rare",
									pts: 5
								},
								{
									rarity: "legendary",
									pts: 10
								}
							].map(({ rarity, pts }) => {
								const colors = RARITY_COLORS[rarity];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-lg border p-3 space-y-2 ${colors.bg} ${colors.border}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-block text-xs font-bold rounded px-1.5 py-0.5 ${colors.badge}`,
											children: RARITY_LABEL[rarity]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm font-black",
											children: [pts, " pts"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											className: "w-full",
											disabled: buying !== null,
											onClick: () => handleBuy(rarity),
											children: buying === rarity ? "Comprando..." : "Comprar"
										})
									]
								}, rarity);
							})
						})
					]
				})] }),
				used.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base text-muted-foreground",
					children: [
						"Cartas Usadas (",
						used.length,
						")"
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: used.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardItem, {
						card,
						dimmed: true
					}, card.instanceId))
				}) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Todas as Cartas"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: [...CARDS].map((card) => {
						const colors = RARITY_COLORS[card.rarity];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-lg border p-3 ${colors.bg} ${colors.border}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl shrink-0",
									children: card.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold",
										children: card.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[10px] font-bold rounded px-1 py-0.5 ${colors.badge}`,
										children: RARITY_LABEL[card.rarity]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: card.description
								})] })]
							})
						}, card.id);
					})
				}) })] })
			]
		})
	});
}
function CardItem({ card, dimmed }) {
	const colors = RARITY_COLORS[card.rarity];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-lg border p-3 space-y-1 transition-opacity ${colors.bg} ${colors.border} ${dimmed ? "opacity-50" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl",
						children: card.icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold truncate",
								children: card.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] font-bold rounded px-1 py-0.5 shrink-0 ${colors.badge}`,
								children: RARITY_LABEL[card.rarity]
							})]
						})
					}),
					card.usedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "text-[10px] shrink-0",
						children: "Usada"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: card.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[10px] text-muted-foreground",
				children: ["Obtida: ", card.acquiredRound]
			})
		]
	});
}
//#endregion
export { CartasPage as component };
