import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import "./bolao-DVb7JzZB.mjs";
import { n as CardContent, t as Card } from "./card-DgN_QdeO.mjs";
import { C as ChevronDown, O as ArrowLeft, S as ChevronRight, x as CircleCheckBig } from "../_libs/lucide-react.mjs";
import { t as Route } from "./missoes-XhQ-7oJU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/missoes-BSVjNvkC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MissoesPage() {
	const { players, currentUserId } = Route.useLoaderData();
	const currentPlayer = players.find((p) => p.id === currentUserId);
	if (!currentPlayer) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto px-4 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "Entre para ver suas missões."
			})]
		})
	});
	const completed = currentPlayer.missions.filter((m) => m.completedAt);
	const inProgress = currentPlayer.missions.filter((m) => !m.completedAt && m.progress > 0);
	const locked = currentPlayer.missions.filter((m) => !m.completedAt && m.progress === 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto px-4 py-6 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "bg-amber-50 border-amber-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "pt-4 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-amber-800 font-semibold mb-1",
							children: "🏆 Como funcionam as missões?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-amber-700 leading-relaxed",
							children: "As missões progridem automaticamente conforme você joga — não precisa ativar nada. Ao completar uma missão, você ganha uma carta especial automaticamente no inventário."
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: [
							completed.length,
							" de ",
							currentPlayer.missions.length,
							" missões concluídas"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1",
						children: currentPlayer.missions.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2 h-2 rounded-full ${m.completedAt ? "bg-green-500" : m.progress > 0 ? "bg-amber-400" : "bg-zinc-200"}` }, m.id))
					})]
				}),
				inProgress.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Em andamento",
					children: inProgress.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionItem, {
						mission: m,
						defaultOpen: true
					}, m.id))
				}),
				completed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Concluídas ✓",
					children: completed.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionItem, { mission: m }, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Disponíveis",
					children: locked.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionItem, { mission: m }, m.id))
				})
			]
		})
	});
}
function BackLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xs font-bold text-muted-foreground uppercase tracking-wider px-1",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0 divide-y divide-border",
			children
		}) })]
	});
}
function MissionItem({ mission, defaultOpen }) {
	const [open, setOpen] = (0, import_react.useState)(defaultOpen ?? false);
	const completed = !!mission.completedAt;
	const progressPct = Math.min(100, Math.round(mission.progress / mission.goal * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50 transition-colors",
		onClick: () => setOpen((v) => !v),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xl shrink-0",
				children: mission.icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-sm font-bold ${completed ? "text-green-700" : ""}`,
						children: mission.name
					}), completed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3.5 h-3.5 text-green-600 shrink-0" })]
				}), !completed && mission.progress > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 h-1.5 rounded-full bg-zinc-200 overflow-hidden w-32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-amber-400 transition-all",
						style: { width: `${progressPct}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs tabular-nums text-muted-foreground shrink-0 mr-1",
				children: [
					mission.progress,
					"/",
					mission.goal
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-muted-foreground shrink-0" })
		]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 pb-4 pt-0 space-y-3 bg-zinc-50/60",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: mission.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-2 rounded-full bg-zinc-200 overflow-hidden mr-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-full rounded-full transition-all ${completed ? "bg-green-500" : "bg-amber-400"}`,
						style: { width: `${progressPct}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-bold tabular-nums text-muted-foreground shrink-0",
					children: [
						mission.progress,
						"/",
						mission.goal
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Recompensa:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-bold text-amber-700",
					children: ["🎁 ", mission.reward]
				})]
			}),
			completed && mission.completedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-green-600 font-semibold",
				children: [
					"✓ Concluída em",
					" ",
					new Date(mission.completedAt).toLocaleDateString("pt-BR")
				]
			})
		]
	})] });
}
//#endregion
export { MissoesPage as component };
