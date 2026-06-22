import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import "./bolao-BmiEFycs.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, t as Card } from "./card-DgN_QdeO.mjs";
import { D as ArrowLeft, S as CircleCheckBig, b as Clock } from "../_libs/lucide-react.mjs";
import { t as Route } from "./missoes-Cmi8DXGS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/missoes-DSrMAJWA.js
var import_jsx_runtime = require_jsx_runtime();
function MissoesPage() {
	const { players, currentUserId } = Route.useLoaderData();
	const currentPlayer = players.find((p) => p.id === currentUserId);
	const otherPlayers = players.filter((p) => p.id !== currentUserId);
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
							children: "🏆"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "Missões"
						})]
					})]
				}),
				currentPlayer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerMissionsCard, {
					player: currentPlayer,
					isCurrentUser: true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Entre para ver suas missões."
					})
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold text-muted-foreground uppercase tracking-wider px-1",
						children: "Todos os jogadores"
					}), otherPlayers.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerMissionsCard, { player }, player.id))]
				})
			]
		})
	});
}
function PlayerMissionsCard({ player, isCurrentUser }) {
	const completedCount = player.missions.filter((m) => m.completedAt).length;
	const totalCount = player.missions.length || 6;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: isCurrentUser ? "border-2 border-primary/30" : "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "pb-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-base",
					children: [isCurrentUser ? "⭐ " : "", player.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm font-semibold text-muted-foreground",
					children: [
						completedCount,
						"/",
						totalCount
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "space-y-2",
			children: player.missions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Nenhuma missão iniciada ainda."
			}) : player.missions.map((mission) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionRow, { mission }, mission.id))
		})]
	});
}
function MissionRow({ mission }) {
	const completed = !!mission.completedAt;
	const progressPct = Math.min(100, Math.round(mission.progress / mission.goal * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-3 rounded-md px-3 py-2 ${completed ? "bg-green-50 border border-green-200" : "bg-white/70 border border-transparent"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xl shrink-0",
				children: mission.icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold",
							children: mission.name
						}), completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3.5 h-3.5 text-green-600 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: mission.description
					}),
					!completed && mission.goal > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 h-1.5 rounded-full bg-zinc-200 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-primary transition-all",
							style: { width: `${progressPct}%` }
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `text-xs font-black shrink-0 ${completed ? "text-green-600" : "text-muted-foreground"}`,
				children: [
					mission.progress,
					"/",
					mission.goal
				]
			})
		]
	});
}
//#endregion
export { MissoesPage as component };
