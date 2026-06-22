import { r as __exportAll$1 } from "../_runtime.mjs";
import { C as pgTable, D as boolean, E as integer, S as uniqueIndex, T as text, w as timestamp, x as index } from "../_libs/drizzle-orm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schema-DVvrMujE.js
var schema_DVvrMujE_exports = /* @__PURE__ */ __exportAll$1({
	n: () => __commonJSMin,
	r: () => __exportAll,
	t: () => schema_exports
});
var __defProp = Object.defineProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var schema_exports = /* @__PURE__ */ __exportAll({
	account: () => account,
	championPicks: () => championPicks,
	guesses: () => guesses,
	matches: () => matches,
	rankingSnapshots: () => rankingSnapshots,
	session: () => session,
	user: () => user,
	userCards: () => userCards,
	userMissions: () => userMissions,
	verification: () => verification,
	x1Challenges: () => x1Challenges
});
var user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	emailVerified: boolean("emailVerified").notNull().default(false),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow()
}, (table) => [uniqueIndex("user_email_idx").on(table.email)]);
var session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	token: text("token").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" })
}, (table) => [uniqueIndex("session_token_idx").on(table.token), index("session_user_id_idx").on(table.userId)]);
var account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
	refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow()
}, (table) => [index("account_user_id_idx").on(table.userId)]);
var verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow()
});
var matches = pgTable("matches", {
	id: text("id").primaryKey(),
	matchNumber: integer("match_number"),
	round: text("round").notNull(),
	group: text("group").notNull(),
	homeTeam: text("home_team").notNull(),
	awayTeam: text("away_team").notNull(),
	homeSource: text("home_source"),
	awaySource: text("away_source"),
	venue: text("venue").notNull(),
	startsAt: timestamp("starts_at").notNull(),
	homeScore: integer("home_score"),
	awayScore: integer("away_score"),
	homePenaltyScore: integer("home_penalty_score"),
	awayPenaltyScore: integer("away_penalty_score"),
	winnerTeam: text("winner_team"),
	resultStatus: text("result_status").notNull().default("scheduled"),
	resultSource: text("result_source"),
	resultConfirmedAt: timestamp("result_confirmed_at"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var guesses = pgTable("guesses", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	matchId: text("match_id").notNull().references(() => matches.id, { onDelete: "cascade" }),
	homeScore: integer("home_score").notNull(),
	awayScore: integer("away_score").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow()
}, (table) => [uniqueIndex("guess_user_match_idx").on(table.userId, table.matchId)]);
var rankingSnapshots = pgTable("ranking_snapshots", {
	userId: text("user_id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
	position: integer("position").notNull(),
	updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var championPicks = pgTable("champion_picks", {
	userId: text("user_id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
	team: text("team").notNull(),
	bonusPoints: integer("bonus_points").notNull(),
	phaseLabel: text("phase_label").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var x1Challenges = pgTable("x1_challenges", {
	id: text("id").primaryKey(),
	matchId: text("match_id").notNull().references(() => matches.id, { onDelete: "cascade" }),
	challengerId: text("challenger_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	opponentId: text("opponent_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	stake: integer("stake").notNull(),
	status: text("status").notNull().default("pending"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow()
}, (table) => [index("x1_match_idx").on(table.matchId)]);
var userCards = pgTable("user_cards", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	cardId: text("card_id").notNull(),
	acquiredRound: text("acquired_round").notNull(),
	acquiredAt: timestamp("acquired_at").notNull().defaultNow(),
	usedAt: timestamp("used_at"),
	usedOnMatchId: text("used_on_match_id").references(() => matches.id, { onDelete: "set null" })
}, (table) => [index("user_cards_user_idx").on(table.userId)]);
var userMissions = pgTable("user_missions", {
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	missionId: text("mission_id").notNull(),
	progress: integer("progress").notNull().default(0),
	completedAt: timestamp("completed_at"),
	updatedAt: timestamp("updated_at").notNull().defaultNow()
}, (table) => [uniqueIndex("user_mission_idx").on(table.userId, table.missionId)]);
//#endregion
export { schema_exports as i, __exportAll as n, schema_DVvrMujE_exports as r, __commonJSMin as t };
