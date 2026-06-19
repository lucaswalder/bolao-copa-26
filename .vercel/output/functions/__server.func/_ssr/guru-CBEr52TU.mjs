import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link, f as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as saveChampionPick } from "./bolao-BzKwpU8o.mjs";
import { a as CardHeader, n as Card, o as CardTitle, r as CardContent, t as Badge } from "./card-BCLLgRQe.mjs";
import { f as Lock, h as Crown, r as Trophy, s as Save, x as ArrowLeft, y as Brain } from "../_libs/lucide-react.mjs";
import { n as Label, r as useServerFn, t as Button } from "./label-NZw4C8iu.mjs";
import { t as Route } from "./guru-BJN6X4Ta.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guru-CBEr52TU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var POINTS_TABLE = [
	{
		label: "Fase de grupos",
		points: 50
	},
	{
		label: "16 avos de final",
		points: 40
	},
	{
		label: "Oitavas de final",
		points: 30
	},
	{
		label: "Quartas de final",
		points: 20
	},
	{
		label: "Semifinal",
		points: 10
	},
	{
		label: "Final",
		points: null
	}
];
function GuruPage() {
	const data = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen px-4 py-6 text-[var(--sea-ink)] sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-3xl flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "island-shell overflow-hidden rounded-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pitch-band grid gap-4 p-5 sm:p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "green",
								className: "gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-3.5" }), "Guru do Futebol"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Voltar aos jogos"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "display-title text-3xl font-bold leading-tight text-[var(--sea-ink)] sm:text-4xl",
							children: "Palpite de campeão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-base font-medium text-[var(--sea-ink-soft)]",
							children: "Crave o grande campeão da Copa. Quanto mais cedo você acertar, mais pontos de bônus leva. Pode trocar até a Final começar — mas trocar tarde vale menos."
						})] })]
					})
				}),
				data.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChampionPickCard, { data }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "p-6 text-center text-sm font-semibold text-[var(--sea-ink-soft)]",
					children: "Entre no bolão para palpitar o campeão."
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PointsCard, {
					activeLabel: data.phase.label,
					locked: data.phase.locked
				}),
				data.picks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PicksCard, { data }) : null
			]
		})
	});
}
function ChampionPickCard({ data }) {
	const router = useRouter();
	const saveFn = useServerFn(saveChampionPick);
	const [team, setTeam] = (0, import_react.useState)(data.pick?.team ?? "");
	const [error, setError] = (0, import_react.useState)(null);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const locked = data.phase.locked;
	const championTeam = data.championTeam;
	async function handleSave() {
		setError(null);
		setIsSaving(true);
		try {
			await saveFn({ data: { team } });
			await router.invalidate();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Não foi possível salvar.");
		} finally {
			setIsSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "island-kicker",
			children: "Seu palpite"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Quem leva a taça?" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-7 text-yellow-600" })]
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-2 rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-bold",
				children: locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 text-[var(--sea-ink-soft)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }), "Bloqueado — a Final já começou"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4 text-emerald-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Fase atual: ",
					data.phase.label,
					" · vale",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-emerald-700",
						children: [data.phase.points, " pts"]
					}),
					" ",
					"agora"
				] })] })
			}),
			data.pick ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-semibold",
				children: [
					"Palpite atual: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.pick.team }),
					" · vale",
					" ",
					data.pick.bonusPoints,
					" pts (travado em ",
					data.pick.phaseLabel,
					")",
					championTeam ? data.pick.team === championTeam ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-1 text-emerald-700",
						children: [
							"— acertou! +",
							data.pick.bonusPoints,
							" pts"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 text-red-700",
						children: "— não foi dessa vez"
					}) : null
				]
			}) : null,
			locked ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "champion-team",
						children: "Time campeão"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "champion-team",
						value: team,
						onChange: (event) => setTeam(event.target.value),
						className: "h-11 rounded-md border border-[var(--line)] bg-white px-3 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Escolha um time"
						}), data.teams.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: option,
							children: option
						}, option))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					disabled: !team || isSaving || team === data.pick?.team,
					onClick: handleSave,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {}), isSaving ? "Salvando..." : "Salvar palpite"]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700",
				children: error
			}) : null
		]
	})] });
}
function PointsCard({ activeLabel, locked }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-yellow-500/30 bg-yellow-100/45",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "island-kicker",
				children: "Bônus"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Pontos por fase" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-7 text-emerald-700" })]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "grid gap-2",
			children: POINTS_TABLE.map((row) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center justify-between rounded-md border p-3 text-sm font-bold ${!locked && row.label === activeLabel ? "border-emerald-500/40 bg-emerald-50" : "border-[var(--line)] bg-white/70"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.points === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 text-[var(--sea-ink-soft)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }), "bloqueado"]
					}) : `${row.points} pts` })]
				}, row.label);
			})
		})]
	});
}
function PicksCard({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "island-kicker",
			children: "Palpites"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Quem apostou em quem" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-7 text-yellow-600" })]
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
		className: "grid gap-2",
		children: data.picks.map((pick) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border p-3 ${pick.isChampion ? "border-emerald-500/40 bg-emerald-50" : "border-[var(--line)] bg-white/70"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-bold",
					children: pick.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium text-[var(--sea-ink-soft)]",
					children: [pick.team, pick.isChampion ? " · campeão!" : ""]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-black",
					children: pick.bonusPoints
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-bold text-[var(--sea-ink-soft)]",
					children: [
						"pts (",
						pick.phaseLabel,
						")"
					]
				})]
			})]
		}, pick.userId))
	})] });
}
//#endregion
export { GuruPage as component };
