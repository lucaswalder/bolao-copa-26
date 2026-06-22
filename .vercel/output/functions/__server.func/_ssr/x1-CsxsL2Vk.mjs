import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import "./bolao-BmiEFycs.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-DgN_QdeO.mjs";
import { t as Badge } from "./badge-CMeIM4Xt.mjs";
import { D as ArrowLeft, a as Sword, r as Trophy, v as Equal } from "../_libs/lucide-react.mjs";
import { t as Route } from "./x1-DDGJR-rd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/x1-CsxsL2Vk.js
var import_jsx_runtime = require_jsx_runtime();
function X1Page() {
	const { standings, duels } = Route.useLoaderData();
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sword, { className: "w-6 h-6 text-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "Ranking X1"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-4 h-4 text-yellow-500" }), "Classificação"]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: standings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground px-4 pb-4",
						children: "Nenhum X1 disputado ainda."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: standings.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `text-sm font-bold w-6 text-center ${player.position === 1 ? "text-yellow-500" : player.position === 2 ? "text-zinc-400" : player.position === 3 ? "text-amber-600" : "text-muted-foreground"}`,
									children: [player.position, "°"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 font-medium text-sm",
									children: player.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-green-600 font-medium",
											children: [player.wins, "V"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-zinc-400",
											children: [player.draws, "E"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-red-500 font-medium",
											children: [player.losses, "D"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: player.points > 0 ? "green" : player.points < 0 ? "default" : "secondary",
									className: "text-xs min-w-[48px] justify-center",
									children: [
										player.points > 0 ? "+" : "",
										player.points,
										" pts"
									]
								})
							]
						}, player.id))
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sword, { className: "w-4 h-4 text-red-500" }), "Histórico de Duelos"]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-0",
					children: duels.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground px-4 pb-4",
						children: "Nenhum X1 finalizado ainda."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: duels.map((duel, i) => {
							const isDraw = duel.winnerId === null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 py-3 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `font-medium truncate ${duel.winnerId === duel.challengerId ? "text-green-600" : duel.winnerId === duel.opponentId ? "text-muted-foreground" : ""}`,
												children: duel.challengerName
											}),
											isDraw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Equal, { className: "w-3 h-3 text-zinc-400 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sword, { className: "w-3 h-3 text-red-400 shrink-0" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `font-medium truncate ${duel.winnerId === duel.opponentId ? "text-green-600" : duel.winnerId === duel.challengerId ? "text-muted-foreground" : ""}`,
												children: duel.opponentName
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											className: "text-xs",
											children: [
												duel.stake,
												" pt",
												duel.stake > 1 ? "s" : ""
											]
										}), isDraw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											className: "text-xs",
											children: "Empate"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "green",
											className: "text-xs",
											children: [
												duel.winnerId === duel.challengerId ? duel.challengerName : duel.opponentName,
												" ",
												"venceu"
											]
										})]
									})]
								}), duel.match && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										duel.match.homeTeam,
										" ",
										duel.match.homeScore,
										" ×",
										" ",
										duel.match.awayScore,
										" ",
										duel.match.awayTeam,
										" —",
										" ",
										duel.match.round
									]
								})]
							}, i);
						})
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Como funciona o X1:" }),
							" Desafie outro jogador em uma partida com uma aposta de 1 a 3 pontos. Quem tiver o palpite mais próximo do resultado real ganha o stake do adversário. Em caso de empate, ninguém perde ou ganha. Os pontos do X1",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "não afetam o ranking principal" }),
							" — são contados apenas aqui."
						]
					})
				}) })
			]
		})
	});
}
//#endregion
export { X1Page as component };
