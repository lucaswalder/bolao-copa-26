import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link, f as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as saveMatchResult } from "./bolao-DVb7JzZB.mjs";
import { i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DgN_QdeO.mjs";
import { t as Badge } from "./badge-CMeIM4Xt.mjs";
import { O as ArrowLeft, T as CalendarDays, b as CircleCheck, c as ShieldCheck, d as RotateCcw, g as ListFilter, u as Save } from "../_libs/lucide-react.mjs";
import { n as useServerFn, t as Button } from "./button-DygBLB-0.mjs";
import { t as Route } from "./admin-Colc-r7A.mjs";
import { t as Input } from "./input-BC-nN5LR.mjs";
import { t as Label } from "./label-s-8WNirM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BAG9xZQu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var dateFormatter = new Intl.DateTimeFormat("pt-BR", {
	dateStyle: "short",
	timeStyle: "short",
	timeZone: "America/Sao_Paulo"
});
function AdminPage() {
	const data = Route.useLoaderData();
	const [filter, setFilter] = (0, import_react.useState)("Sem resultado");
	const filteredMatches = data.matches.filter((match) => matchMatchesFilter(match, filter));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen px-4 py-6 text-[var(--sea-ink)] sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-7xl flex-col gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "island-shell overflow-hidden rounded-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pitch-band grid gap-5 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "green",
								className: "gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), "Admin"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "canary",
								children: "Bolão CFFDP"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "display-title text-4xl font-bold leading-tight sm:text-5xl",
							children: "Resultados"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-2xl text-base font-medium text-[var(--sea-ink-soft)]",
							children: "Lance o placar oficial de cada partida. O ranking e os classificados das próximas fases são atualizados depois de salvar."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Voltar ao bolão"]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "island-kicker",
								children: "Conferência"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold",
								children: "Tabela de resultados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm font-semibold text-[var(--sea-ink-soft)]",
								children: [
									filteredMatches.length,
									" de ",
									data.matches.length,
									" jogos"
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: data.user.email
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminFilterTabs, {
						activeFilter: filter,
						onChange: setFilter,
						data
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4",
						children: filteredMatches.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminMatchCard, { match }, match.id))
					})
				]
			})]
		})
	});
}
function matchMatchesFilter(match, filter) {
	if (filter === "Todos") return true;
	if (filter === "Sem resultado") return match.resultStatus !== "confirmed";
	if (filter === "Confirmados") return match.resultStatus === "confirmed";
	return match.round !== "Fase de grupos";
}
function AdminFilterTabs({ activeFilter, onChange, data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2 rounded-lg border border-[var(--line)] bg-white/65 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mr-1 hidden items-center gap-1.5 px-2 text-sm font-bold text-[var(--sea-ink-soft)] sm:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "size-4" }), "Filtro"]
		}), [
			"Sem resultado",
			"Confirmados",
			"Mata-mata",
			"Todos"
		].map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: activeFilter === filter ? "default" : "ghost",
			size: "sm",
			onClick: () => onChange(filter),
			title: `Filtrar por ${filter}`,
			children: [filter, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[11px] font-black",
				children: data.matches.filter((match) => matchMatchesFilter(match, filter)).length
			})]
		}, filter))]
	});
}
function AdminMatchCard({ match }) {
	const router = useRouter();
	const saveResult = useServerFn(saveMatchResult);
	const [error, setError] = (0, import_react.useState)(null);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const hasResult = match.resultStatus === "confirmed";
	const isKnockout = match.round !== "Fase de grupos";
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setIsSaving(true);
		const formData = new FormData(event.currentTarget);
		try {
			await saveResult({ data: {
				matchId: match.id,
				homeScore: readNullableNumber(formData, "homeScore"),
				awayScore: readNullableNumber(formData, "awayScore"),
				homePenaltyScore: readNullableNumber(formData, "homePenaltyScore"),
				awayPenaltyScore: readNullableNumber(formData, "awayPenaltyScore"),
				winnerTeam: readNullableString(formData, "winnerTeam")
			} });
			await router.invalidate();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Não foi possível salvar.");
		} finally {
			setIsSaving(false);
		}
	}
	async function handleClear() {
		setError(null);
		setIsSaving(true);
		try {
			await saveResult({ data: {
				matchId: match.id,
				homeScore: null,
				awayScore: null,
				homePenaltyScore: null,
				awayPenaltyScore: null,
				winnerTeam: null
			} });
			await router.invalidate();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Não foi possível limpar.");
		} finally {
			setIsSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "feature-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-3 pb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								children: ["Jogo ", match.matchNumber]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: match.group
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: hasResult ? "green" : "canary",
								children: hasResult ? "Confirmado" : "Pendente"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-sm font-semibold text-[var(--sea-ink-soft)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }), dateFormatter.format(new Date(match.startsAt))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamName, {
							align: "right",
							children: match.homeTeam
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md border border-[var(--line)] bg-white/70 px-3 py-2 text-sm font-black",
							children: "vs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamName, { children: match.awayTeam })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
					match.round,
					" · ",
					match.venue
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 lg:grid-cols-[1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[1fr_auto_1fr] items-end gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminScoreInput, {
									label: match.homeTeam,
									name: "homeScore",
									defaultValue: match.homeScore
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pb-2 text-center text-lg font-black",
									children: "x"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminScoreInput, {
									label: match.awayTeam,
									name: "awayScore",
									defaultValue: match.awayScore
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminScoreInput, {
									label: "Pênaltis mandante",
									name: "homePenaltyScore",
									defaultValue: match.homePenaltyScore,
									disabled: !isKnockout
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminScoreInput, {
									label: "Pênaltis visitante",
									name: "awayPenaltyScore",
									defaultValue: match.awayPenaltyScore,
									disabled: !isKnockout
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: `winner-${match.id}`,
										className: "text-xs",
										children: "Classificado"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: `winner-${match.id}`,
										name: "winnerTeam",
										defaultValue: match.winnerTeam ?? "",
										disabled: !isKnockout,
										className: "h-12 rounded-md border border-[var(--line)] bg-white px-3 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Automático"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: match.homeTeam,
												children: match.homeTeam
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: match.awayTeam,
												children: match.awayTeam
											})
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 self-end sm:grid-cols-2 lg:grid-cols-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: isSaving,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {}), isSaving ? "Salvando..." : "Salvar"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								disabled: isSaving || !hasResult,
								onClick: handleClear,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Limpar"]
							})]
						})
					]
				}),
				hasResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-700" }),
						"Resultado: ",
						match.homeScore,
						" x ",
						match.awayScore,
						match.homePenaltyScore !== null && match.awayPenaltyScore !== null ? ` · pênaltis ${match.homePenaltyScore} x ${match.awayPenaltyScore}` : "",
						match.winnerTeam ? ` · classificado: ${match.winnerTeam}` : ""
					]
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700",
					children: error
				}) : null
			]
		}) })]
	});
}
function AdminScoreInput({ label, name, defaultValue, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: `${name}-${label}`,
			className: "truncate text-xs",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: `${name}-${label}`,
			name,
			type: "number",
			inputMode: "numeric",
			min: 0,
			max: 30,
			defaultValue: defaultValue ?? "",
			disabled,
			className: "h-12 text-center text-lg font-black"
		})]
	});
}
function TeamName({ align, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: align === "right" ? "truncate text-right text-lg font-black" : "truncate text-lg font-black",
		title: children,
		children
	});
}
function readNullableNumber(formData, key) {
	const value = String(formData.get(key) || "").trim();
	if (value === "") return null;
	const parsed = Number(value);
	return Number.isInteger(parsed) ? parsed : null;
}
function readNullableString(formData, key) {
	return String(formData.get(key) || "").trim() || null;
}
//#endregion
export { AdminPage as component };
