import { n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { _ as string, a as _enum, c as boolean, m as object, p as number } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bolao-vUx_rJAf.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function kickoff(date, time, utcOffsetHours) {
	const [year, month, day] = date.split("-").map(Number);
	const [hour, minute] = time.split(":").map(Number);
	return new Date(Date.UTC(year, month - 1, day, hour - utcOffsetHours, minute));
}
function groupMatch(matchNumber, group, homeTeam, awayTeam, venue, date, time, utcOffsetHours, id) {
	return [
		matchNumber,
		"Fase de grupos",
		`Grupo ${group}`,
		homeTeam,
		awayTeam,
		venue,
		date,
		time,
		utcOffsetHours,
		null,
		null,
		id
	];
}
function knockoutMatch(matchNumber, round, homeTeam, awayTeam, venue, date, time, utcOffsetHours, homeSource, awaySource) {
	return [
		matchNumber,
		round,
		"Mata-mata",
		homeTeam,
		awayTeam,
		venue,
		date,
		time,
		utcOffsetHours,
		homeSource,
		awaySource
	];
}
var seedMatches = [
	groupMatch(1, "A", "México", "África do Sul", "Estadio Azteca, Mexico City", "2026-06-11", "13:00", -6),
	groupMatch(2, "A", "Coreia do Sul", "Tchéquia", "Estadio Akron, Zapopan", "2026-06-11", "20:00", -6),
	groupMatch(3, "B", "Canadá", "Bósnia e Herzegovina", "BMO Field, Toronto", "2026-06-12", "15:00", -4),
	groupMatch(4, "D", "Estados Unidos", "Paraguai", "SoFi Stadium, Inglewood", "2026-06-12", "18:00", -7),
	groupMatch(5, "C", "Haiti", "Escócia", "Gillette Stadium, Foxborough", "2026-06-13", "21:00", -4, "group-c-haiti-scotland"),
	groupMatch(6, "D", "Austrália", "Turquia", "BC Place, Vancouver", "2026-06-13", "21:00", -7),
	groupMatch(7, "C", "Brasil", "Marrocos", "MetLife Stadium, East Rutherford", "2026-06-13", "18:00", -4, "group-c-brazil-morocco"),
	groupMatch(8, "B", "Catar", "Suíça", "Levi's Stadium, Santa Clara", "2026-06-13", "12:00", -7),
	groupMatch(9, "E", "Costa do Marfim", "Equador", "Lincoln Financial Field, Philadelphia", "2026-06-14", "19:00", -4),
	groupMatch(10, "E", "Alemanha", "Curaçao", "NRG Stadium, Houston", "2026-06-14", "12:00", -5),
	groupMatch(11, "F", "Países Baixos", "Japão", "AT&T Stadium, Arlington", "2026-06-14", "15:00", -5),
	groupMatch(12, "F", "Suécia", "Tunísia", "Estadio BBVA, Guadalupe", "2026-06-14", "20:00", -6),
	groupMatch(13, "H", "Arábia Saudita", "Uruguai", "Hard Rock Stadium, Miami Gardens", "2026-06-15", "18:00", -4),
	groupMatch(14, "H", "Espanha", "Cabo Verde", "Mercedes-Benz Stadium, Atlanta", "2026-06-15", "12:00", -4),
	groupMatch(15, "G", "Irã", "Nova Zelândia", "SoFi Stadium, Inglewood", "2026-06-15", "18:00", -7),
	groupMatch(16, "G", "Bélgica", "Egito", "Lumen Field, Seattle", "2026-06-15", "12:00", -7),
	groupMatch(17, "I", "França", "Senegal", "MetLife Stadium, East Rutherford", "2026-06-16", "15:00", -4),
	groupMatch(18, "I", "Iraque", "Noruega", "Gillette Stadium, Foxborough", "2026-06-16", "18:00", -4),
	groupMatch(19, "J", "Argentina", "Argélia", "Arrowhead Stadium, Kansas City", "2026-06-16", "20:00", -5),
	groupMatch(20, "J", "Áustria", "Jordânia", "Levi's Stadium, Santa Clara", "2026-06-16", "21:00", -7),
	groupMatch(21, "L", "Gana", "Panamá", "Toronto Stadium, Toronto", "2026-06-17", "19:00", -4),
	groupMatch(22, "L", "Inglaterra", "Croácia", "AT&T Stadium, Arlington", "2026-06-17", "15:00", -5),
	groupMatch(23, "K", "Portugal", "RD Congo", "NRG Stadium, Houston", "2026-06-17", "12:00", -5),
	groupMatch(24, "K", "Uzbequistão", "Colômbia", "Estadio Azteca, Mexico City", "2026-06-17", "20:00", -6),
	groupMatch(25, "A", "Tchéquia", "África do Sul", "Mercedes-Benz Stadium, Atlanta", "2026-06-18", "12:00", -4),
	groupMatch(26, "B", "Suíça", "Bósnia e Herzegovina", "SoFi Stadium, Inglewood", "2026-06-18", "12:00", -7),
	groupMatch(27, "B", "Canadá", "Catar", "BC Place, Vancouver", "2026-06-18", "15:00", -7),
	groupMatch(28, "A", "México", "Coreia do Sul", "Estadio Akron, Zapopan", "2026-06-18", "19:00", -6),
	groupMatch(29, "C", "Brasil", "Haiti", "Lincoln Financial Field, Philadelphia", "2026-06-19", "20:30", -4, "group-c-brazil-haiti"),
	groupMatch(30, "C", "Escócia", "Marrocos", "Gillette Stadium, Foxborough", "2026-06-19", "18:00", -4, "group-c-scotland-morocco"),
	groupMatch(31, "D", "Turquia", "Paraguai", "Levi's Stadium, Santa Clara", "2026-06-19", "20:00", -7),
	groupMatch(32, "D", "Estados Unidos", "Austrália", "Lumen Field, Seattle", "2026-06-19", "12:00", -7),
	groupMatch(33, "E", "Alemanha", "Costa do Marfim", "BMO Field, Toronto", "2026-06-20", "16:00", -4),
	groupMatch(34, "E", "Equador", "Curaçao", "Arrowhead Stadium, Kansas City", "2026-06-20", "19:00", -5),
	groupMatch(35, "F", "Países Baixos", "Suécia", "NRG Stadium, Houston", "2026-06-20", "12:00", -5),
	groupMatch(36, "F", "Tunísia", "Japão", "Estadio BBVA, Guadalupe", "2026-06-20", "22:00", -6),
	groupMatch(37, "H", "Uruguai", "Cabo Verde", "Hard Rock Stadium, Miami Gardens", "2026-06-21", "18:00", -4),
	groupMatch(38, "H", "Espanha", "Arábia Saudita", "Mercedes-Benz Stadium, Atlanta", "2026-06-21", "12:00", -4),
	groupMatch(39, "G", "Bélgica", "Irã", "SoFi Stadium, Inglewood", "2026-06-21", "12:00", -7),
	groupMatch(40, "G", "Nova Zelândia", "Egito", "BC Place, Vancouver", "2026-06-21", "18:00", -7),
	groupMatch(41, "I", "Noruega", "Senegal", "MetLife Stadium, East Rutherford", "2026-06-22", "20:00", -4),
	groupMatch(42, "I", "França", "Iraque", "Lincoln Financial Field, Philadelphia", "2026-06-22", "17:00", -4),
	groupMatch(43, "J", "Argentina", "Áustria", "AT&T Stadium, Arlington", "2026-06-22", "12:00", -5),
	groupMatch(44, "J", "Jordânia", "Argélia", "Levi's Stadium, Santa Clara", "2026-06-22", "20:00", -7),
	groupMatch(45, "L", "Inglaterra", "Gana", "Gillette Stadium, Foxborough", "2026-06-23", "16:00", -4),
	groupMatch(46, "L", "Panamá", "Croácia", "Toronto Stadium, Toronto", "2026-06-23", "19:00", -4),
	groupMatch(47, "K", "Portugal", "Uzbequistão", "NRG Stadium, Houston", "2026-06-23", "12:00", -5),
	groupMatch(48, "K", "Colômbia", "RD Congo", "Estadio Akron, Zapopan", "2026-06-23", "20:00", -6),
	groupMatch(49, "C", "Escócia", "Brasil", "Hard Rock Stadium, Miami Gardens", "2026-06-24", "18:00", -4, "group-c-scotland-brazil"),
	groupMatch(50, "C", "Marrocos", "Haiti", "Mercedes-Benz Stadium, Atlanta", "2026-06-24", "18:00", -4, "group-c-morocco-haiti"),
	groupMatch(51, "B", "Suíça", "Canadá", "BC Place, Vancouver", "2026-06-24", "12:00", -7),
	groupMatch(52, "B", "Bósnia e Herzegovina", "Catar", "Lumen Field, Seattle", "2026-06-24", "12:00", -7),
	groupMatch(53, "A", "Tchéquia", "México", "Estadio Azteca, Mexico City", "2026-06-24", "19:00", -6),
	groupMatch(54, "A", "África do Sul", "Coreia do Sul", "Estadio BBVA, Guadalupe", "2026-06-24", "19:00", -6),
	groupMatch(55, "E", "Curaçao", "Costa do Marfim", "Lincoln Financial Field, Philadelphia", "2026-06-25", "16:00", -4),
	groupMatch(56, "E", "Equador", "Alemanha", "MetLife Stadium, East Rutherford", "2026-06-25", "16:00", -4),
	groupMatch(57, "F", "Japão", "Suécia", "AT&T Stadium, Arlington", "2026-06-25", "18:00", -5),
	groupMatch(58, "F", "Tunísia", "Países Baixos", "Arrowhead Stadium, Kansas City", "2026-06-25", "18:00", -5),
	groupMatch(59, "D", "Turquia", "Estados Unidos", "SoFi Stadium, Inglewood", "2026-06-25", "19:00", -7),
	groupMatch(60, "D", "Paraguai", "Austrália", "Levi's Stadium, Santa Clara", "2026-06-25", "19:00", -7),
	groupMatch(61, "I", "Noruega", "França", "Gillette Stadium, Foxborough", "2026-06-26", "15:00", -4),
	groupMatch(62, "I", "Senegal", "Iraque", "BMO Field, Toronto", "2026-06-26", "15:00", -4),
	groupMatch(63, "G", "Egito", "Irã", "Lumen Field, Seattle", "2026-06-26", "20:00", -7),
	groupMatch(64, "G", "Nova Zelândia", "Bélgica", "BC Place, Vancouver", "2026-06-26", "20:00", -7),
	groupMatch(65, "H", "Cabo Verde", "Arábia Saudita", "NRG Stadium, Houston", "2026-06-26", "19:00", -5),
	groupMatch(66, "H", "Uruguai", "Espanha", "Estadio Akron, Zapopan", "2026-06-26", "18:00", -6),
	groupMatch(67, "L", "Panamá", "Inglaterra", "MetLife Stadium, East Rutherford", "2026-06-27", "17:00", -4),
	groupMatch(68, "L", "Croácia", "Gana", "Lincoln Financial Field, Philadelphia", "2026-06-27", "17:00", -4),
	groupMatch(69, "J", "Argélia", "Áustria", "Arrowhead Stadium, Kansas City", "2026-06-27", "21:00", -5),
	groupMatch(70, "J", "Jordânia", "Argentina", "AT&T Stadium, Arlington", "2026-06-27", "21:00", -5),
	groupMatch(71, "K", "Colômbia", "Portugal", "Hard Rock Stadium, Miami Gardens", "2026-06-27", "19:30", -4),
	groupMatch(72, "K", "RD Congo", "Uzbequistão", "Mercedes-Benz Stadium, Atlanta", "2026-06-27", "19:30", -4),
	knockoutMatch(73, "16 avos de final", "2º Grupo A", "2º Grupo B", "SoFi Stadium, Inglewood", "2026-06-28", "12:00", -7, "2A", "2B"),
	knockoutMatch(74, "16 avos de final", "1º Grupo E", "3º Grupo A/B/C/D/F", "Gillette Stadium, Foxborough", "2026-06-29", "16:30", -4, "1E", "3A/B/C/D/F"),
	knockoutMatch(75, "16 avos de final", "1º Grupo F", "2º Grupo C", "Estadio BBVA, Guadalupe", "2026-06-29", "19:00", -6, "1F", "2C"),
	knockoutMatch(76, "16 avos de final", "1º Grupo C", "2º Grupo F", "NRG Stadium, Houston", "2026-06-29", "12:00", -5, "1C", "2F"),
	knockoutMatch(77, "16 avos de final", "1º Grupo I", "3º Grupo C/D/F/G/H", "MetLife Stadium, East Rutherford", "2026-06-30", "17:00", -4, "1I", "3C/D/F/G/H"),
	knockoutMatch(78, "16 avos de final", "2º Grupo E", "2º Grupo I", "AT&T Stadium, Arlington", "2026-06-30", "12:00", -5, "2E", "2I"),
	knockoutMatch(79, "16 avos de final", "1º Grupo A", "3º Grupo C/E/F/H/I", "Estadio Azteca, Mexico City", "2026-06-30", "19:00", -6, "1A", "3C/E/F/H/I"),
	knockoutMatch(80, "16 avos de final", "1º Grupo L", "3º Grupo E/H/I/J/K", "Mercedes-Benz Stadium, Atlanta", "2026-07-01", "12:00", -4, "1L", "3E/H/I/J/K"),
	knockoutMatch(81, "16 avos de final", "1º Grupo D", "3º Grupo B/E/F/I/J", "Levi's Stadium, Santa Clara", "2026-07-01", "17:00", -7, "1D", "3B/E/F/I/J"),
	knockoutMatch(82, "16 avos de final", "1º Grupo G", "3º Grupo A/E/H/I/J", "Lumen Field, Seattle", "2026-07-01", "13:00", -7, "1G", "3A/E/H/I/J"),
	knockoutMatch(83, "16 avos de final", "2º Grupo K", "2º Grupo L", "BMO Field, Toronto", "2026-07-02", "19:00", -4, "2K", "2L"),
	knockoutMatch(84, "16 avos de final", "1º Grupo H", "2º Grupo J", "SoFi Stadium, Inglewood", "2026-07-02", "12:00", -7, "1H", "2J"),
	knockoutMatch(85, "16 avos de final", "1º Grupo B", "3º Grupo E/F/G/I/J", "BC Place, Vancouver", "2026-07-02", "20:00", -7, "1B", "3E/F/G/I/J"),
	knockoutMatch(86, "16 avos de final", "1º Grupo J", "2º Grupo H", "Hard Rock Stadium, Miami Gardens", "2026-07-03", "18:00", -4, "1J", "2H"),
	knockoutMatch(87, "16 avos de final", "1º Grupo K", "3º Grupo D/E/I/J/L", "Arrowhead Stadium, Kansas City", "2026-07-03", "20:30", -5, "1K", "3D/E/I/J/L"),
	knockoutMatch(88, "16 avos de final", "2º Grupo D", "2º Grupo G", "AT&T Stadium, Arlington", "2026-07-03", "13:00", -5, "2D", "2G"),
	knockoutMatch(89, "Oitavas de final", "Vencedor Jogo 74", "Vencedor Jogo 77", "Lincoln Financial Field, Philadelphia", "2026-07-04", "17:00", -4, "W74", "W77"),
	knockoutMatch(90, "Oitavas de final", "Vencedor Jogo 73", "Vencedor Jogo 75", "NRG Stadium, Houston", "2026-07-04", "12:00", -5, "W73", "W75"),
	knockoutMatch(91, "Oitavas de final", "Vencedor Jogo 76", "Vencedor Jogo 78", "MetLife Stadium, East Rutherford", "2026-07-05", "16:00", -4, "W76", "W78"),
	knockoutMatch(92, "Oitavas de final", "Vencedor Jogo 79", "Vencedor Jogo 80", "Estadio Azteca, Mexico City", "2026-07-05", "18:00", -6, "W79", "W80"),
	knockoutMatch(93, "Oitavas de final", "Vencedor Jogo 81", "Vencedor Jogo 82", "Lumen Field, Seattle", "2026-07-06", "17:00", -7, "W81", "W82"),
	knockoutMatch(94, "Oitavas de final", "Vencedor Jogo 83", "Vencedor Jogo 84", "AT&T Stadium, Arlington", "2026-07-06", "14:00", -5, "W83", "W84"),
	knockoutMatch(95, "Oitavas de final", "Vencedor Jogo 85", "Vencedor Jogo 87", "BC Place, Vancouver", "2026-07-07", "13:00", -7, "W85", "W87"),
	knockoutMatch(96, "Oitavas de final", "Vencedor Jogo 86", "Vencedor Jogo 88", "Mercedes-Benz Stadium, Atlanta", "2026-07-07", "12:00", -4, "W86", "W88"),
	knockoutMatch(97, "Quartas de final", "Vencedor Jogo 89", "Vencedor Jogo 90", "Gillette Stadium, Foxborough", "2026-07-09", "16:00", -4, "W89", "W90"),
	knockoutMatch(98, "Quartas de final", "Vencedor Jogo 93", "Vencedor Jogo 94", "SoFi Stadium, Inglewood", "2026-07-10", "12:00", -7, "W93", "W94"),
	knockoutMatch(99, "Quartas de final", "Vencedor Jogo 91", "Vencedor Jogo 92", "Hard Rock Stadium, Miami Gardens", "2026-07-11", "17:00", -4, "W91", "W92"),
	knockoutMatch(100, "Quartas de final", "Vencedor Jogo 95", "Vencedor Jogo 96", "Arrowhead Stadium, Kansas City", "2026-07-11", "20:00", -5, "W95", "W96"),
	knockoutMatch(101, "Semifinal", "Vencedor Jogo 97", "Vencedor Jogo 98", "AT&T Stadium, Arlington", "2026-07-14", "14:00", -5, "W97", "W98"),
	knockoutMatch(102, "Semifinal", "Vencedor Jogo 99", "Vencedor Jogo 100", "Mercedes-Benz Stadium, Atlanta", "2026-07-15", "15:00", -4, "W99", "W100"),
	knockoutMatch(103, "Disputa de 3º lugar", "Perdedor Jogo 101", "Perdedor Jogo 102", "Hard Rock Stadium, Miami Gardens", "2026-07-18", "17:00", -4, "L101", "L102"),
	knockoutMatch(104, "Final", "Vencedor Jogo 101", "Vencedor Jogo 102", "MetLife Stadium, East Rutherford", "2026-07-19", "15:00", -4, "W101", "W102")
].map(([matchNumber, round, group, homeTeam, awayTeam, venue, date, time, utcOffsetHours, homeSource = null, awaySource = null, id]) => ({
	id: id ?? `match-${matchNumber}`,
	matchNumber,
	round,
	group,
	homeTeam,
	awayTeam,
	homeSource,
	awaySource,
	venue,
	startsAt: kickoff(date, time, utcOffsetHours)
}));
function getOutcome(homeScore, awayScore) {
	if (homeScore === null || awayScore === null) return null;
	if (homeScore > awayScore) return "home";
	if (homeScore < awayScore) return "away";
	return "draw";
}
function calculatePoints(guess, oddsMultiplier = 1) {
	const resultHome = guess.match.homeScore;
	const resultAway = guess.match.awayScore;
	if (resultHome === null || resultAway === null) return {
		points: 0,
		hitOutcome: false,
		hitExact: false,
		oddsMultiplier: 1
	};
	const hitOutcome = getOutcome(guess.homeScore, guess.awayScore) === getOutcome(resultHome, resultAway);
	const hitExact = guess.homeScore === resultHome && guess.awayScore === resultAway;
	const exactBonus = hitExact ? Math.round(1 * oddsMultiplier) : 0;
	return {
		points: hitOutcome ? 2 + exactBonus : 0,
		hitOutcome,
		hitExact,
		oddsMultiplier
	};
}
function getOddsMultiplier(matchId, match, guessRows) {
	if (match.homeScore === null || match.awayScore === null) return 1;
	const matchGuesses = guessRows.filter((g) => g.matchId === matchId);
	if (matchGuesses.length === 0) return 5;
	const exactHits = matchGuesses.filter((g) => g.homeScore === match.homeScore && g.awayScore === match.awayScore).length;
	const ratio = exactHits / matchGuesses.length;
	if (ratio > .5) return 1;
	if (ratio > .2) return 2;
	if (ratio > .1) return 3;
	if (ratio > .05) return 4;
	if (exactHits > 0) return 5;
	return 6;
}
async function getSessionUser() {
	const [{ getRequestHeaders }, { auth }] = await Promise.all([import("./ssr.mjs").then((n) => n.i).then((n) => n.t), import("./auth-YRKTgsKj.mjs").then((n) => n.n)]);
	return (await auth.api.getSession({ headers: getRequestHeaders() }))?.user ?? null;
}
function getAdminEmails() {
	return (process.env.ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
}
function isAdminEmail(email) {
	if (!email) return false;
	return getAdminEmails().includes(email.toLowerCase());
}
async function requireAdminUser() {
	const sessionUser = await getSessionUser();
	if (!sessionUser) throw new Error("Voce precisa entrar para acessar o admin.");
	if (!isAdminEmail(sessionUser.email)) throw new Error("Seu email nao tem permissao de admin.");
	return sessionUser;
}
async function ensureSeedMatches() {
	const [{ eq }, { db }, { matches }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	await db.insert(matches).values(seedMatches).onConflictDoNothing();
	const existingSeeds = await db.select({
		id: matches.id,
		matchNumber: matches.matchNumber,
		round: matches.round,
		group: matches.group,
		homeTeam: matches.homeTeam,
		awayTeam: matches.awayTeam,
		homeSource: matches.homeSource,
		awaySource: matches.awaySource,
		venue: matches.venue,
		startsAt: matches.startsAt
	}).from(matches);
	const existingById = new Map(existingSeeds.map((match) => [match.id, match]));
	for (const seed of seedMatches) {
		const existing = existingById.get(seed.id);
		if (!existing || existing.round !== "Fase de grupos") continue;
		if (!(existing.matchNumber !== seed.matchNumber || existing.group !== seed.group || existing.homeTeam !== seed.homeTeam || existing.awayTeam !== seed.awayTeam || existing.venue !== seed.venue || existing.startsAt.getTime() !== seed.startsAt.getTime())) continue;
		await db.update(matches).set({
			matchNumber: seed.matchNumber,
			group: seed.group,
			homeTeam: seed.homeTeam,
			awayTeam: seed.awayTeam,
			venue: seed.venue,
			startsAt: seed.startsAt,
			updatedAt: /* @__PURE__ */ new Date()
		}).where(eq(matches.id, seed.id));
	}
}
function getMatchWinner(match) {
	if (match.winnerTeam) return match.winnerTeam;
	if (match.homeScore === null || match.awayScore === null) return null;
	if (match.homeScore === match.awayScore) return null;
	return match.homeScore > match.awayScore ? match.homeTeam : match.awayTeam;
}
function getMatchLoser(match) {
	if (match.winnerTeam) {
		if (match.winnerTeam === match.homeTeam) return match.awayTeam;
		if (match.winnerTeam === match.awayTeam) return match.homeTeam;
		return null;
	}
	if (match.homeScore === null || match.awayScore === null) return null;
	if (match.homeScore === match.awayScore) return null;
	return match.homeScore < match.awayScore ? match.homeTeam : match.awayTeam;
}
function getCompletedGroupStandings(matchRows, groupLetter) {
	const group = `Grupo ${groupLetter}`;
	const groupMatches = matchRows.filter((match) => match.round === "Fase de grupos" && match.group === group);
	if (groupMatches.length !== 6 || groupMatches.some((match) => match.homeScore === null || match.awayScore === null)) return null;
	const table = /* @__PURE__ */ new Map();
	for (const match of groupMatches) {
		for (const team of [match.homeTeam, match.awayTeam]) if (!table.has(team)) table.set(team, {
			team,
			points: 0,
			goalsFor: 0,
			goalsAgainst: 0
		});
		const home = table.get(match.homeTeam);
		const away = table.get(match.awayTeam);
		const homeScore = match.homeScore;
		const awayScore = match.awayScore;
		home.goalsFor += homeScore;
		home.goalsAgainst += awayScore;
		away.goalsFor += awayScore;
		away.goalsAgainst += homeScore;
		if (homeScore > awayScore) home.points += 3;
		else if (homeScore < awayScore) away.points += 3;
		else {
			home.points += 1;
			away.points += 1;
		}
	}
	return [...table.values()].sort((a, b) => {
		if (b.points !== a.points) return b.points - a.points;
		const goalDifferenceA = a.goalsFor - a.goalsAgainst;
		const goalDifferenceB = b.goalsFor - b.goalsAgainst;
		if (goalDifferenceB !== goalDifferenceA) return goalDifferenceB - goalDifferenceA;
		if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
		return a.team.localeCompare(b.team);
	});
}
function resolveTeamSource(source, matchRows) {
	if (!source) return null;
	if (source.startsWith("3")) return null;
	const groupSource = source.match(/^([12])([A-L])$/);
	if (groupSource) {
		const [, position, groupLetter] = groupSource;
		return getCompletedGroupStandings(matchRows, groupLetter)?.[Number(position) - 1]?.team ?? null;
	}
	const knockoutSource = source.match(/^([WL])(\d+)$/);
	if (knockoutSource) {
		const [, type, matchNumber] = knockoutSource;
		const match = matchRows.find((row) => row.matchNumber === Number(matchNumber));
		if (!match) return null;
		return type === "W" ? getMatchWinner(match) : getMatchLoser(match);
	}
	return null;
}
async function refreshKnockoutTeams(matchRows) {
	const [{ eq }, { db }, { matches }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	for (const match of matchRows) {
		if (match.round === "Fase de grupos") continue;
		const nextHomeTeam = resolveTeamSource(match.homeSource, matchRows);
		const nextAwayTeam = resolveTeamSource(match.awaySource, matchRows);
		const update = {};
		if (nextHomeTeam && nextHomeTeam !== match.homeTeam) {
			update.homeTeam = nextHomeTeam;
			match.homeTeam = nextHomeTeam;
		}
		if (nextAwayTeam && nextAwayTeam !== match.awayTeam) {
			update.awayTeam = nextAwayTeam;
			match.awayTeam = nextAwayTeam;
		}
		if (Object.keys(update).length === 0) continue;
		await db.update(matches).set({
			...update,
			updatedAt: /* @__PURE__ */ new Date()
		}).where(eq(matches.id, match.id));
	}
}
function resolveX1Winner(challenge, match, guessByKey) {
	const challengerGuess = guessByKey.get(`${challenge.challengerId}:${challenge.matchId}`);
	const opponentGuess = guessByKey.get(`${challenge.opponentId}:${challenge.matchId}`);
	const challengerResult = challengerGuess ? calculatePoints({
		homeScore: challengerGuess.homeScore,
		awayScore: challengerGuess.awayScore,
		match
	}) : {
		points: 0,
		hitExact: false,
		hitOutcome: false
	};
	const opponentResult = opponentGuess ? calculatePoints({
		homeScore: opponentGuess.homeScore,
		awayScore: opponentGuess.awayScore,
		match
	}) : {
		points: 0,
		hitExact: false,
		hitOutcome: false
	};
	let winnerId;
	if (challengerResult.points !== opponentResult.points) winnerId = challengerResult.points > opponentResult.points ? challenge.challengerId : challenge.opponentId;
	else if (challengerResult.hitExact !== opponentResult.hitExact) winnerId = challengerResult.hitExact ? challenge.challengerId : challenge.opponentId;
	else winnerId = null;
	const loserId = winnerId ? winnerId === challenge.challengerId ? challenge.opponentId : challenge.challengerId : null;
	const loserResult = loserId === challenge.challengerId ? challengerResult : opponentResult;
	return {
		winnerId,
		loserId,
		loserPoints: loserResult.points
	};
}
var CHAMPION_PHASES = [
	{
		round: "Fase de grupos",
		points: 50
	},
	{
		round: "16 avos de final",
		points: 40
	},
	{
		round: "Oitavas de final",
		points: 30
	},
	{
		round: "Quartas de final",
		points: 20
	},
	{
		round: "Semifinal",
		points: 10
	}
];
function getChampionPhase(matchRows) {
	const now = Date.now();
	const hasStarted = (round) => matchRows.some((match) => match.round === round && match.startsAt.getTime() <= now);
	if (hasStarted("Final")) return {
		label: "Final",
		points: null,
		locked: true
	};
	let current = CHAMPION_PHASES[0];
	for (const phase of CHAMPION_PHASES) if (hasStarted(phase.round)) current = phase;
	return {
		label: current.round,
		points: current.points,
		locked: false
	};
}
function getChampionTeam(matchById) {
	for (const match of matchById.values()) if (match.round === "Final" && match.homeScore !== null && match.awayScore !== null) return getMatchWinner(match);
	return null;
}
function computeStandings(userRows, guessRows, matchById, _challengeRows, championPicks = [], cardRows = []) {
	const tally = new Map(userRows.map((player) => [player.id, {
		id: player.id,
		name: player.name || player.email,
		guessesCount: 0,
		points: 0,
		exactHits: 0,
		outcomeHits: 0
	}]));
	const oddsMultiplierByMatch = /* @__PURE__ */ new Map();
	for (const [matchId, match] of matchById) oddsMultiplierByMatch.set(matchId, getOddsMultiplier(matchId, match, guessRows));
	const cardsByUserMatch = /* @__PURE__ */ new Map();
	for (const card of cardRows) {
		if (!card.usedAt || !card.usedOnMatchId) continue;
		const key = `${card.userId}:${card.usedOnMatchId}`;
		if (!cardsByUserMatch.has(key)) cardsByUserMatch.set(key, []);
		cardsByUserMatch.get(key).push(card.cardId);
	}
	const pointsEntries = [];
	for (const guess of guessRows) {
		const entry = tally.get(guess.userId);
		const match = matchById.get(guess.matchId);
		if (!entry || !match) continue;
		entry.guessesCount += 1;
		const oddsMultiplier = oddsMultiplierByMatch.get(guess.matchId) ?? 1;
		const result = calculatePoints({
			homeScore: guess.homeScore,
			awayScore: guess.awayScore,
			match
		}, oddsMultiplier);
		const cards = cardsByUserMatch.get(`${guess.userId}:${guess.matchId}`) ?? [];
		let pts = result.points;
		if (cards.includes("shield") && pts < 0) pts = 0;
		if (cards.includes("momentum") && result.hitOutcome) pts += 2;
		if (cards.includes("exact_boost") && result.hitExact) pts += 2;
		if (cards.includes("double_or_nothing")) pts = result.hitOutcome ? pts * 2 : 0;
		pointsEntries.push({
			userId: guess.userId,
			matchId: guess.matchId,
			basePoints: pts,
			cards
		});
		entry.points += pts;
		entry.exactHits += result.hitExact ? 1 : 0;
		entry.outcomeHits += result.hitOutcome ? 1 : 0;
	}
	const tempRanking = [...tally.values()].sort((a, b) => b.points - a.points);
	const lastPlaceId = tempRanking.length > 0 ? tempRanking[tempRanking.length - 1].id : null;
	if (lastPlaceId) for (const pe of pointsEntries) {
		if (pe.userId !== lastPlaceId) continue;
		if (!pe.cards.includes("comeback")) continue;
		const entry = tally.get(pe.userId);
		if (entry) entry.points += pe.basePoints;
	}
	const stealCount = /* @__PURE__ */ new Map();
	for (const card of cardRows) {
		if (card.cardId !== "steal" || !card.usedAt) continue;
		const match = card.usedOnMatchId ? matchById.get(card.usedOnMatchId) : null;
		if (!match || match.homeScore === null) continue;
		stealCount.set(card.userId, (stealCount.get(card.userId) ?? 0) + 1);
	}
	if (stealCount.size > 0) {
		const leaderId = [...tally.values()].sort((a, b) => b.points - a.points).at(0)?.id;
		if (leaderId) {
			const leaderEntry = tally.get(leaderId);
			for (const [userId, count] of stealCount) {
				const thiefEntry = tally.get(userId);
				if (!thiefEntry || userId === leaderId) continue;
				leaderEntry.points -= count;
				thiefEntry.points += count;
			}
		}
	}
	const championTeam = getChampionTeam(matchById);
	if (championTeam) for (const pick of championPicks) {
		if (pick.team !== championTeam) continue;
		const entry = tally.get(pick.userId);
		if (entry) entry.points += pick.bonusPoints;
	}
	return [...tally.values()].sort((a, b) => {
		if (b.points !== a.points) return b.points - a.points;
		if (b.exactHits !== a.exactHits) return b.exactHits - a.exactHits;
		if (b.outcomeHits !== a.outcomeHits) return b.outcomeHits - a.outcomeHits;
		return a.name.localeCompare(b.name);
	}).map((player, index) => ({
		...player,
		position: index + 1
	}));
}
function computeX1Standings(userRows, challengeRows, matchById, guessRows, cardRows = []) {
	const guessByKey = /* @__PURE__ */ new Map();
	for (const guess of guessRows) guessByKey.set(`${guess.userId}:${guess.matchId}`, guess);
	const tally = new Map(userRows.map((player) => [player.id, {
		id: player.id,
		name: player.name || player.email,
		wins: 0,
		losses: 0,
		draws: 0,
		points: 0
	}]));
	const duels = [];
	for (const challenge of challengeRows) {
		if (challenge.status !== "accepted") continue;
		const match = matchById.get(challenge.matchId);
		if (!match || match.homeScore === null || match.awayScore === null) continue;
		const { winnerId, loserId } = resolveX1Winner(challenge, match, guessByKey);
		const challengerEntry = tally.get(challenge.challengerId);
		const opponentEntry = tally.get(challenge.opponentId);
		if (winnerId && loserId) {
			if (challengerEntry) if (winnerId === challenge.challengerId) {
				challengerEntry.wins += 1;
				challengerEntry.points += challenge.stake;
			} else {
				challengerEntry.losses += 1;
				challengerEntry.points -= challenge.stake;
			}
			if (opponentEntry) if (winnerId === challenge.opponentId) {
				opponentEntry.wins += 1;
				opponentEntry.points += challenge.stake;
			} else {
				opponentEntry.losses += 1;
				opponentEntry.points -= challenge.stake;
			}
		} else {
			if (challengerEntry) challengerEntry.draws += 1;
			if (opponentEntry) opponentEntry.draws += 1;
		}
		duels.push({
			matchId: challenge.matchId,
			challengerId: challenge.challengerId,
			challengerName: tally.get(challenge.challengerId)?.name ?? "",
			opponentId: challenge.opponentId,
			opponentName: tally.get(challenge.opponentId)?.name ?? "",
			stake: challenge.stake,
			winnerId,
			status: match.homeScore !== null ? "resolved" : "pending"
		});
	}
	for (const card of cardRows) {
		if (card.acquiredRound !== "compra") continue;
		const def = CARDS.find((c) => c.id === card.cardId);
		if (!def) continue;
		const entry = tally.get(card.userId);
		if (entry) entry.points -= def.cost;
	}
	return {
		standings: [...tally.values()].sort((a, b) => {
			if (b.points !== a.points) return b.points - a.points;
			if (b.wins !== a.wins) return b.wins - a.wins;
			return a.name.localeCompare(b.name);
		}).map((player, index) => ({
			...player,
			position: index + 1
		})),
		duels
	};
}
var getBolaoData_createServerFn_handler = createServerRpc({
	id: "9c0ae71b2df8f6a272c3b86699a0f3cc1c9037a7549e51873626dc41cdbc085c",
	name: "getBolaoData",
	filename: "src/lib/bolao.ts"
}, (opts) => getBolaoData.__executeServer(opts));
var getBolaoData = createServerFn({ method: "GET" }).handler(getBolaoData_createServerFn_handler, async () => {
	await ensureSeedMatches();
	const [{ asc }, { db }, { guesses, matches, user, rankingSnapshots, x1Challenges, championPicks, userCards }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const sessionUser = await getSessionUser();
	const [matchRows, guessRows, userRows, snapshotRows, challengeRows, championPickRows, cardRows] = await Promise.all([
		db.select().from(matches).orderBy(asc(matches.startsAt)),
		db.select({
			id: guesses.id,
			userId: guesses.userId,
			matchId: guesses.matchId,
			homeScore: guesses.homeScore,
			awayScore: guesses.awayScore
		}).from(guesses),
		db.select({
			id: user.id,
			name: user.name,
			email: user.email
		}).from(user),
		db.select({
			userId: rankingSnapshots.userId,
			position: rankingSnapshots.position
		}).from(rankingSnapshots),
		db.select({
			id: x1Challenges.id,
			matchId: x1Challenges.matchId,
			challengerId: x1Challenges.challengerId,
			opponentId: x1Challenges.opponentId,
			stake: x1Challenges.stake,
			status: x1Challenges.status
		}).from(x1Challenges),
		db.select({
			userId: championPicks.userId,
			team: championPicks.team,
			bonusPoints: championPicks.bonusPoints
		}).from(championPicks),
		db.select({
			id: userCards.id,
			userId: userCards.userId,
			cardId: userCards.cardId,
			usedOnMatchId: userCards.usedOnMatchId,
			usedAt: userCards.usedAt
		}).from(userCards)
	]);
	await refreshKnockoutTeams(matchRows);
	const matchById = new Map(matchRows.map((match) => [match.id, match]));
	const guessByKey = /* @__PURE__ */ new Map();
	for (const guess of guessRows) guessByKey.set(`${guess.userId}:${guess.matchId}`, guess);
	const previousPositionByUser = new Map(snapshotRows.map((snapshot) => [snapshot.userId, snapshot.position]));
	const nameById = new Map(userRows.map((player) => [player.id, player.name || player.email]));
	const standings = computeStandings(userRows, guessRows, matchById, challengeRows, championPickRows, cardRows).map((player) => {
		const previousPosition = previousPositionByUser.get(player.id) ?? null;
		return {
			...player,
			previousPosition,
			delta: previousPosition === null ? 0 : previousPosition - player.position
		};
	});
	const currentUserGuesses = new Map(guessRows.filter((guess) => guess.userId === sessionUser?.id).map((guess) => [guess.matchId, guess]));
	const userAvailableCards = sessionUser ? cardRows.filter((c) => c.userId === sessionUser.id && !c.usedAt).map((c) => {
		const def = CARDS.find((card) => card.id === c.cardId);
		return {
			instanceId: c.id,
			cardId: c.cardId,
			name: def?.name ?? c.cardId,
			icon: def?.icon ?? "🃏",
			rarity: def?.rarity ?? "common"
		};
	}) : [];
	const userCardsUsedByMatch = /* @__PURE__ */ new Map();
	if (sessionUser) for (const c of cardRows) {
		if (c.userId !== sessionUser.id || !c.usedAt || !c.usedOnMatchId) continue;
		if (!userCardsUsedByMatch.has(c.usedOnMatchId)) userCardsUsedByMatch.set(c.usedOnMatchId, []);
		userCardsUsedByMatch.get(c.usedOnMatchId).push(c.cardId);
	}
	return {
		user: sessionUser ? {
			id: sessionUser.id,
			name: sessionUser.name,
			email: sessionUser.email,
			isAdmin: isAdminEmail(sessionUser.email)
		} : null,
		players: userRows.map((player) => ({
			id: player.id,
			name: player.name || player.email
		})),
		userAvailableCards,
		matches: matchRows.map((match) => {
			const userGuess = currentUserGuesses.get(match.id);
			const hasResult = match.homeScore !== null && match.awayScore !== null;
			const x1 = sessionUser ? buildMatchX1View(match, sessionUser.id, challengeRows, nameById, guessByKey, hasResult) : null;
			const oddsMultiplier = hasResult ? getOddsMultiplier(match.id, match, guessRows) : null;
			const cardsUsed = userCardsUsedByMatch.get(match.id) ?? [];
			return {
				...match,
				startsAt: match.startsAt.toISOString(),
				createdAt: match.createdAt.toISOString(),
				updatedAt: match.updatedAt.toISOString(),
				oddsMultiplier,
				cardsUsed,
				guess: userGuess ? {
					homeScore: userGuess.homeScore,
					awayScore: userGuess.awayScore,
					points: calculatePoints({
						homeScore: userGuess.homeScore,
						awayScore: userGuess.awayScore,
						match
					}, oddsMultiplier ?? 1).points
				} : null,
				x1
			};
		}),
		standings
	};
});
function buildMatchX1View(match, currentUserId, challengeRows, nameById, guessByKey, hasResult) {
	const active = challengeRows.filter((challenge) => challenge.matchId === match.id && (challenge.challengerId === currentUserId || challenge.opponentId === currentUserId)).find((challenge) => challenge.status === "pending" || challenge.status === "accepted");
	let accepted = null;
	let incoming = null;
	let outgoing = null;
	if (active) {
		const isChallenger = active.challengerId === currentUserId;
		const otherId = isChallenger ? active.opponentId : active.challengerId;
		const otherName = nameById.get(otherId) ?? "Jogador";
		if (active.status === "accepted") {
			let outcome = null;
			let delta = 0;
			if (hasResult) {
				const { winnerId, loserId, loserPoints } = resolveX1Winner(active, match, guessByKey);
				if (!winnerId) outcome = "push";
				else if (winnerId === currentUserId) {
					outcome = "won";
					delta = active.stake;
				} else if (loserId === currentUserId) {
					outcome = "lost";
					delta = -(active.stake + loserPoints);
				}
			}
			accepted = {
				id: active.id,
				opponentName: otherName,
				stake: active.stake,
				outcome,
				delta
			};
		} else if (isChallenger) outgoing = {
			id: active.id,
			opponentName: otherName,
			stake: active.stake
		};
		else incoming = {
			id: active.id,
			challengerName: otherName,
			stake: active.stake
		};
	}
	return {
		accepted,
		incoming,
		outgoing
	};
}
var getAdminData_createServerFn_handler = createServerRpc({
	id: "61b583fb06daa194ef7d263a7eea03a7e5bf9c77bfeb777a9aa878d891fccc3a",
	name: "getAdminData",
	filename: "src/lib/bolao.ts"
}, (opts) => getAdminData.__executeServer(opts));
var getAdminData = createServerFn({ method: "GET" }).handler(getAdminData_createServerFn_handler, async () => {
	await ensureSeedMatches();
	const [{ asc }, { db }, { matches }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const sessionUser = await requireAdminUser();
	const matchRows = await db.select().from(matches).orderBy(asc(matches.startsAt));
	await refreshKnockoutTeams(matchRows);
	return {
		user: {
			id: sessionUser.id,
			name: sessionUser.name,
			email: sessionUser.email
		},
		matches: matchRows.map((match) => ({
			...match,
			startsAt: match.startsAt.toISOString(),
			createdAt: match.createdAt.toISOString(),
			updatedAt: match.updatedAt.toISOString(),
			resultConfirmedAt: match.resultConfirmedAt?.toISOString() ?? null
		}))
	};
});
var saveGuess_createServerFn_handler = createServerRpc({
	id: "770395cb0a54d163507d72e39c35d4e6be55257ab05c3668cac486e9efe5924f",
	name: "saveGuess",
	filename: "src/lib/bolao.ts"
}, (opts) => saveGuess.__executeServer(opts));
var saveGuess = createServerFn({ method: "POST" }).validator(object({
	matchId: string().min(1),
	homeScore: number().int().min(0).max(30),
	awayScore: number().int().min(0).max(30)
})).handler(saveGuess_createServerFn_handler, async ({ data }) => {
	await ensureSeedMatches();
	const [{ eq }, { db }, { guesses, matches }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) throw new Error("Voce precisa entrar para salvar um palpite.");
	const match = (await db.select().from(matches).where(eq(matches.id, data.matchId)).limit(1)).at(0);
	if (!match) throw new Error("Jogo nao encontrado.");
	if (match.startsAt.getTime() <= Date.now()) throw new Error("Palpites ficam bloqueados depois do inicio do jogo.");
	await db.insert(guesses).values({
		id: crypto.randomUUID(),
		userId: sessionUser.id,
		matchId: data.matchId,
		homeScore: data.homeScore,
		awayScore: data.awayScore,
		updatedAt: /* @__PURE__ */ new Date()
	}).onConflictDoUpdate({
		target: [guesses.userId, guesses.matchId],
		set: {
			homeScore: data.homeScore,
			awayScore: data.awayScore,
			updatedAt: /* @__PURE__ */ new Date()
		}
	});
	return { ok: true };
});
var saveMatchResult_createServerFn_handler = createServerRpc({
	id: "d6fe564b0e75085bdbf6bb714c257296042a8409381c1bfe8b3128b4c5d3b81a",
	name: "saveMatchResult",
	filename: "src/lib/bolao.ts"
}, (opts) => saveMatchResult.__executeServer(opts));
var saveMatchResult = createServerFn({ method: "POST" }).validator(object({
	matchId: string().min(1),
	homeScore: number().int().min(0).max(30).nullable(),
	awayScore: number().int().min(0).max(30).nullable(),
	homePenaltyScore: number().int().min(0).max(30).nullable(),
	awayPenaltyScore: number().int().min(0).max(30).nullable(),
	winnerTeam: string().min(1).nullable()
})).handler(saveMatchResult_createServerFn_handler, async ({ data }) => {
	await ensureSeedMatches();
	await requireAdminUser();
	const [{ eq }, { db }, { matches }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const match = (await db.select().from(matches).where(eq(matches.id, data.matchId)).limit(1)).at(0);
	if (!match) throw new Error("Jogo nao encontrado.");
	await snapshotStandings();
	if (data.homeScore === null && data.awayScore === null) {
		await db.update(matches).set({
			homeScore: null,
			awayScore: null,
			homePenaltyScore: null,
			awayPenaltyScore: null,
			winnerTeam: null,
			resultStatus: "scheduled",
			resultSource: null,
			resultConfirmedAt: null,
			updatedAt: /* @__PURE__ */ new Date()
		}).where(eq(matches.id, data.matchId));
		return { ok: true };
	}
	if (data.homeScore === null || data.awayScore === null) throw new Error("Informe os dois placares ou limpe os dois campos.");
	const hasPenaltyScore = data.homePenaltyScore !== null || data.awayPenaltyScore !== null;
	if (hasPenaltyScore && (data.homePenaltyScore === null || data.awayPenaltyScore === null)) throw new Error("Informe os dois placares de penalti.");
	if (hasPenaltyScore && data.homeScore !== data.awayScore) throw new Error("Penaltis so fazem sentido quando o jogo empata.");
	const isKnockout = match.round !== "Fase de grupos";
	let winnerTeam = null;
	if (isKnockout) if (data.homeScore > data.awayScore) winnerTeam = match.homeTeam;
	else if (data.homeScore < data.awayScore) winnerTeam = match.awayTeam;
	else {
		if (![match.homeTeam, match.awayTeam].includes(data.winnerTeam || "")) throw new Error("Escolha o classificado no jogo de mata-mata.");
		winnerTeam = data.winnerTeam;
	}
	if (hasPenaltyScore) {
		const homePenaltyScore = data.homePenaltyScore;
		const awayPenaltyScore = data.awayPenaltyScore;
		if (homePenaltyScore === awayPenaltyScore) throw new Error("Placar de penaltis nao pode terminar empatado.");
		const penaltyWinner = homePenaltyScore > awayPenaltyScore ? match.homeTeam : match.awayTeam;
		if (winnerTeam && winnerTeam !== penaltyWinner) throw new Error("Classificado precisa bater com os penaltis.");
		winnerTeam = penaltyWinner;
	}
	await db.update(matches).set({
		homeScore: data.homeScore,
		awayScore: data.awayScore,
		homePenaltyScore: data.homePenaltyScore,
		awayPenaltyScore: data.awayPenaltyScore,
		winnerTeam,
		resultStatus: "confirmed",
		resultSource: "manual",
		resultConfirmedAt: /* @__PURE__ */ new Date(),
		updatedAt: /* @__PURE__ */ new Date()
	}).where(eq(matches.id, data.matchId));
	await distributeRoundCards(match.round);
	await evaluateAllMissions();
	return { ok: true };
});
var MISSIONS = [
	{
		id: "hat_trick",
		name: "Hat-trick",
		description: "Acerte o resultado de 3 partidas seguidas",
		icon: "🎩",
		goal: 3
	},
	{
		id: "sniper",
		name: "Sniper",
		description: "Acerte 3 placares exatos",
		icon: "🎯",
		goal: 3
	},
	{
		id: "x1_king",
		name: "Rei do X1",
		description: "Ganhe 5 X1s",
		icon: "⚔️",
		goal: 5
	},
	{
		id: "underdog",
		name: "Azarão",
		description: "Acerte um placar com odds de 3x ou mais",
		icon: "🦁",
		goal: 1
	},
	{
		id: "perfect_week",
		name: "Semana Perfeita",
		description: "Acerte o resultado de 5 partidas em um mesmo dia",
		icon: "⭐",
		goal: 5
	},
	{
		id: "double_exact",
		name: "Duplo Craque",
		description: "Acerte 2 placares exatos no mesmo dia",
		icon: "🔥",
		goal: 2
	}
];
var CARDS = [
	{
		id: "double_or_nothing",
		name: "Dobro ou Nada",
		description: "Se acertar o resultado, dobra os pontos da partida. Se errar, perde os pontos normais também.",
		icon: "🎲",
		rarity: "rare",
		cost: 5
	},
	{
		id: "shield",
		name: "Escudo",
		description: "Protege seus pontos de qualquer perda nesta partida (resultado errado = 0 pts, não negativo).",
		icon: "🛡️",
		rarity: "common",
		cost: 1
	},
	{
		id: "momentum",
		name: "Ímpeto",
		description: "Ganhe +2 pontos extras se acertar o resultado desta partida.",
		icon: "⚡",
		rarity: "common",
		cost: 1
	},
	{
		id: "guru_vision",
		name: "Visão do Guru",
		description: "Revela o palpite de um adversário aleatório nesta partida antes de você confirmar o seu.",
		icon: "👁️",
		rarity: "common",
		cost: 1
	},
	{
		id: "lucky_double",
		name: "Sorte em Dobro",
		description: "Registre dois palpites diferentes nesta partida. Conta o que tiver mais pontos.",
		icon: "🍀",
		rarity: "legendary",
		cost: 10
	},
	{
		id: "steal",
		name: "Roubo",
		description: "Rouba 1 ponto do líder do ranking no momento em que o resultado desta partida for confirmado.",
		icon: "🗡️",
		rarity: "legendary",
		cost: 10
	},
	{
		id: "exact_boost",
		name: "Faro de Craque",
		description: "Se acertar o placar exato, ganha +2 pontos extras além das odds.",
		icon: "🔮",
		rarity: "rare",
		cost: 5
	},
	{
		id: "comeback",
		name: "Virada",
		description: "Se você estiver em último lugar no ranking, seus pontos desta partida valem o dobro.",
		icon: "💥",
		rarity: "rare",
		cost: 5
	}
];
var CARD_ROUNDS = [
	"Fase de grupos",
	"16 avos de final",
	"Oitavas de final",
	"Quartas de final",
	"Semifinal"
];
async function distributeRoundCards(round) {
	if (!CARD_ROUNDS.includes(round)) return;
	const [{ db }, { user, userCards }] = await Promise.all([import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n), import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)]);
	const [userRows, existingCards] = await Promise.all([db.select({ id: user.id }).from(user), db.select({
		userId: userCards.userId,
		acquiredRound: userCards.acquiredRound
	}).from(userCards).where((await import("../_libs/drizzle-orm.mjs").then((n) => n.t)).eq(userCards.acquiredRound, round))]);
	const usersWithCard = new Set(existingCards.map((c) => c.userId));
	const cardsByRarity = {
		common: CARDS.filter((c) => c.rarity === "common").map((c) => c.id),
		rare: CARDS.filter((c) => c.rarity === "rare").map((c) => c.id),
		legendary: CARDS.filter((c) => c.rarity === "legendary").map((c) => c.id)
	};
	function drawCard() {
		const roll = Math.random();
		let pool;
		if (roll < .1) pool = cardsByRarity.legendary;
		else if (roll < .4) pool = cardsByRarity.rare;
		else pool = cardsByRarity.common;
		return pool[Math.floor(Math.random() * pool.length)];
	}
	const { randomUUID } = await import("node:crypto");
	for (const u of userRows) {
		if (usersWithCard.has(u.id)) continue;
		await db.insert(userCards).values({
			id: randomUUID(),
			userId: u.id,
			cardId: drawCard(),
			acquiredRound: round,
			acquiredAt: /* @__PURE__ */ new Date()
		});
	}
}
async function evaluateAllMissions() {
	const [{ db }, { guesses, matches, user, x1Challenges, userMissions }] = await Promise.all([import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n), import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)]);
	const [matchRows, guessRows, userRows, challengeRows] = await Promise.all([
		db.select().from(matches),
		db.select({
			id: guesses.id,
			userId: guesses.userId,
			matchId: guesses.matchId,
			homeScore: guesses.homeScore,
			awayScore: guesses.awayScore
		}).from(guesses),
		db.select({
			id: user.id,
			name: user.name,
			email: user.email
		}).from(user),
		db.select({
			id: x1Challenges.id,
			matchId: x1Challenges.matchId,
			challengerId: x1Challenges.challengerId,
			opponentId: x1Challenges.opponentId,
			stake: x1Challenges.stake,
			status: x1Challenges.status
		}).from(x1Challenges)
	]);
	const confirmedMatches = matchRows.filter((m) => m.homeScore !== null && m.awayScore !== null);
	const matchById = new Map(matchRows.map((m) => [m.id, m]));
	const guessByKey = /* @__PURE__ */ new Map();
	for (const g of guessRows) guessByKey.set(`${g.userId}:${g.matchId}`, g);
	const oddsMultiplierByMatch = /* @__PURE__ */ new Map();
	for (const m of confirmedMatches) oddsMultiplierByMatch.set(m.id, getOddsMultiplier(m.id, m, guessRows));
	const x1WinsByUser = /* @__PURE__ */ new Map();
	for (const challenge of challengeRows) {
		if (challenge.status !== "accepted") continue;
		const match = matchById.get(challenge.matchId);
		if (!match || match.homeScore === null || match.awayScore === null) continue;
		const { winnerId } = resolveX1Winner(challenge, match, guessByKey);
		if (winnerId) x1WinsByUser.set(winnerId, (x1WinsByUser.get(winnerId) ?? 0) + 1);
	}
	for (const player of userRows) {
		const sortedGuesses = guessRows.filter((g) => g.userId === player.id).filter((g) => {
			const m = matchById.get(g.matchId);
			return m && m.homeScore !== null && m.awayScore !== null;
		}).map((g) => {
			const m = matchById.get(g.matchId);
			const result = calculatePoints({
				homeScore: g.homeScore,
				awayScore: g.awayScore,
				match: m
			});
			return {
				...g,
				startsAt: m.startsAt,
				dateKey: m.startsAt.toISOString().slice(0, 10),
				hitOutcome: result.hitOutcome,
				hitExact: result.hitExact,
				oddsMultiplier: oddsMultiplierByMatch.get(g.matchId) ?? 1
			};
		}).sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
		let streak = 0;
		let maxStreak = 0;
		for (const g of sortedGuesses) if (g.hitOutcome) {
			streak++;
			if (streak > maxStreak) maxStreak = streak;
		} else streak = 0;
		const exactCount = sortedGuesses.filter((g) => g.hitExact).length;
		const x1Wins = x1WinsByUser.get(player.id) ?? 0;
		const underdogHit = sortedGuesses.some((g) => g.hitExact && g.oddsMultiplier >= 3);
		const byDate = /* @__PURE__ */ new Map();
		for (const g of sortedGuesses) if (g.hitOutcome) byDate.set(g.dateKey, (byDate.get(g.dateKey) ?? 0) + 1);
		const maxInDay = Math.max(0, ...byDate.values());
		const exactByDate = /* @__PURE__ */ new Map();
		for (const g of sortedGuesses) if (g.hitExact) exactByDate.set(g.dateKey, (exactByDate.get(g.dateKey) ?? 0) + 1);
		const maxExactInDay = Math.max(0, ...exactByDate.values());
		const progressMap = {
			hat_trick: maxStreak,
			sniper: exactCount,
			x1_king: x1Wins,
			underdog: underdogHit ? 1 : 0,
			perfect_week: maxInDay,
			double_exact: maxExactInDay
		};
		for (const mission of MISSIONS) {
			const progress = progressMap[mission.id];
			const completed = progress >= mission.goal;
			await db.insert(userMissions).values({
				userId: player.id,
				missionId: mission.id,
				progress,
				completedAt: completed ? /* @__PURE__ */ new Date() : null,
				updatedAt: /* @__PURE__ */ new Date()
			}).onConflictDoUpdate({
				target: [userMissions.userId, userMissions.missionId],
				set: {
					progress,
					completedAt: completed ? /* @__PURE__ */ new Date() : null,
					updatedAt: /* @__PURE__ */ new Date()
				}
			});
		}
	}
}
async function snapshotStandings() {
	const [{ db }, { guesses, matches, user, rankingSnapshots, x1Challenges, championPicks, userCards }] = await Promise.all([import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n), import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)]);
	const [matchRows, guessRows, userRows, challengeRows, championPickRows, cardRows] = await Promise.all([
		db.select().from(matches),
		db.select({
			id: guesses.id,
			userId: guesses.userId,
			matchId: guesses.matchId,
			homeScore: guesses.homeScore,
			awayScore: guesses.awayScore
		}).from(guesses),
		db.select({
			id: user.id,
			name: user.name,
			email: user.email
		}).from(user),
		db.select({
			id: x1Challenges.id,
			matchId: x1Challenges.matchId,
			challengerId: x1Challenges.challengerId,
			opponentId: x1Challenges.opponentId,
			stake: x1Challenges.stake,
			status: x1Challenges.status
		}).from(x1Challenges),
		db.select({
			userId: championPicks.userId,
			team: championPicks.team,
			bonusPoints: championPicks.bonusPoints
		}).from(championPicks),
		db.select({
			userId: userCards.userId,
			cardId: userCards.cardId,
			usedOnMatchId: userCards.usedOnMatchId,
			usedAt: userCards.usedAt
		}).from(userCards)
	]);
	const standings = computeStandings(userRows, guessRows, new Map(matchRows.map((match) => [match.id, match])), challengeRows, championPickRows, cardRows);
	for (const player of standings) await db.insert(rankingSnapshots).values({
		userId: player.id,
		position: player.position,
		updatedAt: /* @__PURE__ */ new Date()
	}).onConflictDoUpdate({
		target: rankingSnapshots.userId,
		set: {
			position: player.position,
			updatedAt: /* @__PURE__ */ new Date()
		}
	});
}
var getX1Data_createServerFn_handler = createServerRpc({
	id: "a420957010a8e32db4ac68e7bef5b4fda92caf86f52c89f3d6b97fe7c358b3ec",
	name: "getX1Data",
	filename: "src/lib/bolao.ts"
}, (opts) => getX1Data.__executeServer(opts));
var getX1Data = createServerFn({ method: "GET" }).handler(getX1Data_createServerFn_handler, async () => {
	await ensureSeedMatches();
	const [{ asc }, { db }, { guesses, matches, user, x1Challenges, userCards }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const [matchRows, guessRows, userRows, challengeRows, cardRows] = await Promise.all([
		db.select().from(matches).orderBy(asc(matches.startsAt)),
		db.select({
			id: guesses.id,
			userId: guesses.userId,
			matchId: guesses.matchId,
			homeScore: guesses.homeScore,
			awayScore: guesses.awayScore
		}).from(guesses),
		db.select({
			id: user.id,
			name: user.name,
			email: user.email
		}).from(user),
		db.select({
			id: x1Challenges.id,
			matchId: x1Challenges.matchId,
			challengerId: x1Challenges.challengerId,
			opponentId: x1Challenges.opponentId,
			stake: x1Challenges.stake,
			status: x1Challenges.status
		}).from(x1Challenges),
		db.select({
			userId: userCards.userId,
			cardId: userCards.cardId,
			acquiredRound: userCards.acquiredRound
		}).from(userCards)
	]);
	const { standings, duels } = computeX1Standings(userRows, challengeRows, new Map(matchRows.map((match) => [match.id, match])), guessRows, cardRows);
	const matchInfoById = new Map(matchRows.map((match) => [match.id, {
		homeTeam: match.homeTeam,
		awayTeam: match.awayTeam,
		homeScore: match.homeScore,
		awayScore: match.awayScore,
		round: match.round,
		startsAt: match.startsAt.toISOString()
	}]));
	return {
		standings,
		duels: duels.map((duel) => ({
			...duel,
			match: matchInfoById.get(duel.matchId) ?? null
		}))
	};
});
var createX1Challenge_createServerFn_handler = createServerRpc({
	id: "8b61371e396161395766012da1e15f18fdb5405546f019dd496902f635393c6f",
	name: "createX1Challenge",
	filename: "src/lib/bolao.ts"
}, (opts) => createX1Challenge.__executeServer(opts));
var createX1Challenge = createServerFn({ method: "POST" }).validator(object({
	matchId: string().min(1),
	opponentId: string().min(1),
	stake: number().int().min(1).max(3)
})).handler(createX1Challenge_createServerFn_handler, async ({ data }) => {
	await ensureSeedMatches();
	const [{ eq, and, or }, { db }, { matches, user, x1Challenges }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) throw new Error("Voce precisa entrar para criar um X1.");
	if (data.opponentId === sessionUser.id) throw new Error("Voce nao pode desafiar a si mesmo.");
	const [matchRow] = await db.select().from(matches).where(eq(matches.id, data.matchId)).limit(1);
	if (!matchRow) throw new Error("Jogo nao encontrado.");
	if (matchRow.startsAt.getTime() <= Date.now()) throw new Error("O X1 fica bloqueado depois do inicio do jogo.");
	const [opponent] = await db.select({ id: user.id }).from(user).where(eq(user.id, data.opponentId)).limit(1);
	if (!opponent) throw new Error("Oponente nao encontrado.");
	if ((await db.select({
		challengerId: x1Challenges.challengerId,
		opponentId: x1Challenges.opponentId
	}).from(x1Challenges).where(and(eq(x1Challenges.matchId, data.matchId), or(eq(x1Challenges.status, "pending"), eq(x1Challenges.status, "accepted"))))).some((challenge) => challenge.challengerId === sessionUser.id || challenge.opponentId === sessionUser.id || challenge.challengerId === data.opponentId || challenge.opponentId === data.opponentId)) throw new Error("Ja existe um X1 ativo para um dos jogadores nesse jogo.");
	await db.insert(x1Challenges).values({
		id: crypto.randomUUID(),
		matchId: data.matchId,
		challengerId: sessionUser.id,
		opponentId: data.opponentId,
		stake: data.stake,
		status: "pending",
		updatedAt: /* @__PURE__ */ new Date()
	});
	return { ok: true };
});
var respondX1Challenge_createServerFn_handler = createServerRpc({
	id: "4deff4110ee7efbb309be401d3db70001ec839a67dcd14d0d5942c9ca76dc871",
	name: "respondX1Challenge",
	filename: "src/lib/bolao.ts"
}, (opts) => respondX1Challenge.__executeServer(opts));
var respondX1Challenge = createServerFn({ method: "POST" }).validator(object({
	challengeId: string().min(1),
	accept: boolean()
})).handler(respondX1Challenge_createServerFn_handler, async ({ data }) => {
	const [{ eq, and }, { db }, { matches, x1Challenges }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) throw new Error("Voce precisa entrar para responder um X1.");
	const [challenge] = await db.select().from(x1Challenges).where(eq(x1Challenges.id, data.challengeId)).limit(1);
	if (!challenge) throw new Error("Desafio nao encontrado.");
	if (challenge.opponentId !== sessionUser.id) throw new Error("Voce nao foi desafiado nesse X1.");
	if (challenge.status !== "pending") throw new Error("Esse desafio ja foi respondido.");
	const [matchRow] = await db.select().from(matches).where(eq(matches.id, challenge.matchId)).limit(1);
	if (matchRow && matchRow.startsAt.getTime() <= Date.now()) throw new Error("O X1 fica bloqueado depois do inicio do jogo.");
	if (data.accept) {
		if ((await db.select({
			id: x1Challenges.id,
			challengerId: x1Challenges.challengerId,
			opponentId: x1Challenges.opponentId
		}).from(x1Challenges).where(and(eq(x1Challenges.matchId, challenge.matchId), eq(x1Challenges.status, "accepted")))).some((other) => other.id !== challenge.id && (other.challengerId === sessionUser.id || other.opponentId === sessionUser.id || other.challengerId === challenge.challengerId || other.opponentId === challenge.challengerId))) throw new Error("Ja existe um X1 aceito para um dos jogadores.");
	}
	await db.update(x1Challenges).set({
		status: data.accept ? "accepted" : "declined",
		updatedAt: /* @__PURE__ */ new Date()
	}).where(eq(x1Challenges.id, challenge.id));
	return { ok: true };
});
var cancelX1Challenge_createServerFn_handler = createServerRpc({
	id: "d35208f0ba90f8bb98608fde71f64bd72848f6d260417b0c68a0424a4ec520b9",
	name: "cancelX1Challenge",
	filename: "src/lib/bolao.ts"
}, (opts) => cancelX1Challenge.__executeServer(opts));
var cancelX1Challenge = createServerFn({ method: "POST" }).validator(object({ challengeId: string().min(1) })).handler(cancelX1Challenge_createServerFn_handler, async ({ data }) => {
	const [{ eq }, { db }, { x1Challenges }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) throw new Error("Voce precisa entrar para cancelar um X1.");
	const [challenge] = await db.select().from(x1Challenges).where(eq(x1Challenges.id, data.challengeId)).limit(1);
	if (!challenge) throw new Error("Desafio nao encontrado.");
	if (challenge.challengerId !== sessionUser.id) throw new Error("Voce nao criou esse X1.");
	if (challenge.status !== "pending") throw new Error("So da para cancelar um X1 pendente.");
	await db.update(x1Challenges).set({
		status: "cancelled",
		updatedAt: /* @__PURE__ */ new Date()
	}).where(eq(x1Challenges.id, challenge.id));
	return { ok: true };
});
function getTournamentTeams(matchRows) {
	const teams = /* @__PURE__ */ new Set();
	for (const match of matchRows) {
		if (match.round !== "Fase de grupos") continue;
		teams.add(match.homeTeam);
		teams.add(match.awayTeam);
	}
	return [...teams].sort((a, b) => a.localeCompare(b));
}
var getMissionsData_createServerFn_handler = createServerRpc({
	id: "7344d68358c902bb7632730faf92c15b518f7c42f9c133438253da5dad663aa0",
	name: "getMissionsData",
	filename: "src/lib/bolao.ts"
}, (opts) => getMissionsData.__executeServer(opts));
var getMissionsData = createServerFn({ method: "GET" }).handler(getMissionsData_createServerFn_handler, async () => {
	const [{ db }, { user, userMissions }] = await Promise.all([import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n), import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)]);
	const sessionUser = await getSessionUser();
	const [userRows, missionRows] = await Promise.all([db.select({
		id: user.id,
		name: user.name,
		email: user.email
	}).from(user), db.select({
		userId: userMissions.userId,
		missionId: userMissions.missionId,
		progress: userMissions.progress,
		completedAt: userMissions.completedAt
	}).from(userMissions)]);
	const nameById = new Map(userRows.map((u) => [u.id, u.name || u.email]));
	const missionsByUser = /* @__PURE__ */ new Map();
	for (const row of missionRows) {
		if (!missionsByUser.has(row.userId)) missionsByUser.set(row.userId, []);
		missionsByUser.get(row.userId).push(row);
	}
	return {
		missions: MISSIONS,
		players: userRows.map((u) => {
			const missions = (missionsByUser.get(u.id) ?? []).map((row) => {
				return {
					...MISSIONS.find((m) => m.id === row.missionId),
					progress: row.progress,
					completedAt: row.completedAt?.toISOString() ?? null
				};
			});
			return {
				id: u.id,
				name: nameById.get(u.id) ?? "",
				missions
			};
		}),
		currentUserId: sessionUser?.id ?? null
	};
});
var getCardsData_createServerFn_handler = createServerRpc({
	id: "7dd6c9ca547d6c40b1e74b29cea701c1d47d95d63e6a2cfbf87ccafd37aaecac",
	name: "getCardsData",
	filename: "src/lib/bolao.ts"
}, (opts) => getCardsData.__executeServer(opts));
var getCardsData = createServerFn({ method: "GET" }).handler(getCardsData_createServerFn_handler, async () => {
	const [{ db }, { userCards }] = await Promise.all([import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n), import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) return {
		cards: [],
		currentUser: null,
		CARDS
	};
	const [cardRows] = await Promise.all([db.select().from(userCards).where((await import("../_libs/drizzle-orm.mjs").then((n) => n.t)).eq(userCards.userId, sessionUser.id))]);
	return {
		cards: cardRows.map((row) => {
			const def = CARDS.find((c) => c.id === row.cardId);
			return {
				instanceId: row.id,
				cardId: row.cardId,
				name: def?.name ?? row.cardId,
				description: def?.description ?? "",
				icon: def?.icon ?? "🃏",
				rarity: def?.rarity ?? "common",
				cost: def?.cost ?? 0,
				acquiredRound: row.acquiredRound,
				acquiredAt: row.acquiredAt.toISOString(),
				usedAt: row.usedAt?.toISOString() ?? null,
				usedOnMatchId: row.usedOnMatchId ?? null,
				available: !row.usedAt
			};
		}),
		currentUser: {
			id: sessionUser.id,
			name: sessionUser.name
		},
		CARDS
	};
});
var useCard_createServerFn_handler = createServerRpc({
	id: "245cb76a28c08279e5ae68941ec6a8d762d9f33ed2b97d9296f5d26d38170834",
	name: "useCard",
	filename: "src/lib/bolao.ts"
}, (opts) => useCard.__executeServer(opts));
var useCard = createServerFn({ method: "POST" }).validator(object({
	cardInstanceId: string().min(1),
	matchId: string().min(1)
})).handler(useCard_createServerFn_handler, async ({ data }) => {
	const [{ eq, and, isNull }, { db }, { matches, userCards }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) throw new Error("Voce precisa entrar para usar uma carta.");
	const [cardRows, matchRows] = await Promise.all([db.select().from(userCards).where(and(eq(userCards.id, data.cardInstanceId), eq(userCards.userId, sessionUser.id), isNull(userCards.usedAt))).limit(1), db.select().from(matches).where(eq(matches.id, data.matchId)).limit(1)]);
	if (!cardRows.at(0)) throw new Error("Carta nao encontrada ou ja utilizada.");
	const match = matchRows.at(0);
	if (!match) throw new Error("Partida nao encontrada.");
	if (new Date(match.startsAt).getTime() <= Date.now()) throw new Error("So da para usar cartas antes do jogo comecar.");
	await db.update(userCards).set({
		usedAt: /* @__PURE__ */ new Date(),
		usedOnMatchId: data.matchId
	}).where(eq(userCards.id, data.cardInstanceId));
	return { ok: true };
});
var buyCard_createServerFn_handler = createServerRpc({
	id: "0cb1ead75bb4ea330df8f0d193e3933a07489a7ebe74cb957c0725a5ec497213",
	name: "buyCard",
	filename: "src/lib/bolao.ts"
}, (opts) => buyCard.__executeServer(opts));
var buyCard = createServerFn({ method: "POST" }).validator(object({ rarity: _enum([
	"common",
	"rare",
	"legendary"
]) })).handler(buyCard_createServerFn_handler, async ({ data }) => {
	const [{ db }, { userCards }] = await Promise.all([import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n), import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) throw new Error("Voce precisa entrar para comprar cartas.");
	const cost = {
		common: 1,
		rare: 5,
		legendary: 10
	}[data.rarity];
	const [{ guesses, matches, user, x1Challenges }] = await Promise.all([import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)]);
	const [matchRows, guessRows, userRows, challengeRows, existingCards] = await Promise.all([
		db.select().from(matches),
		db.select({
			id: guesses.id,
			userId: guesses.userId,
			matchId: guesses.matchId,
			homeScore: guesses.homeScore,
			awayScore: guesses.awayScore
		}).from(guesses),
		db.select({
			id: user.id,
			name: user.name,
			email: user.email
		}).from(user),
		db.select({
			id: x1Challenges.id,
			matchId: x1Challenges.matchId,
			challengerId: x1Challenges.challengerId,
			opponentId: x1Challenges.opponentId,
			stake: x1Challenges.stake,
			status: x1Challenges.status
		}).from(x1Challenges),
		db.select({
			userId: userCards.userId,
			cardId: userCards.cardId,
			acquiredRound: userCards.acquiredRound
		}).from(userCards)
	]);
	const { standings } = computeX1Standings(userRows, challengeRows, new Map(matchRows.map((m) => [m.id, m])), guessRows, existingCards);
	const currentX1Points = standings.find((p) => p.id === sessionUser.id)?.points ?? 0;
	if (currentX1Points < cost) throw new Error(`Voce precisa de ${cost} pontos X1 para comprar uma carta ${data.rarity}. Voce tem ${currentX1Points}.`);
	const pool = CARDS.filter((c) => c.rarity === data.rarity);
	const drawn = pool[Math.floor(Math.random() * pool.length)];
	const { randomUUID } = await import("node:crypto");
	await db.insert(userCards).values({
		id: randomUUID(),
		userId: sessionUser.id,
		cardId: drawn.id,
		acquiredRound: "compra",
		acquiredAt: /* @__PURE__ */ new Date()
	});
	return {
		ok: true,
		card: drawn,
		cost
	};
});
var getGuruData_createServerFn_handler = createServerRpc({
	id: "fec45bad692ad4d1175fb8a5a2bdd2929165eb0fbb53ba1c2d8755e165bde2fe",
	name: "getGuruData",
	filename: "src/lib/bolao.ts"
}, (opts) => getGuruData.__executeServer(opts));
var getGuruData = createServerFn({ method: "GET" }).handler(getGuruData_createServerFn_handler, async () => {
	await ensureSeedMatches();
	const [{ db }, { matches, user, championPicks }] = await Promise.all([import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n), import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)]);
	const sessionUser = await getSessionUser();
	const [matchRows, userRows, pickRows] = await Promise.all([
		db.select().from(matches),
		db.select({
			id: user.id,
			name: user.name,
			email: user.email
		}).from(user),
		db.select({
			userId: championPicks.userId,
			team: championPicks.team,
			bonusPoints: championPicks.bonusPoints,
			phaseLabel: championPicks.phaseLabel
		}).from(championPicks)
	]);
	const phase = getChampionPhase(matchRows);
	const championTeam = getChampionTeam(new Map(matchRows.map((match) => [match.id, match])));
	const nameById = new Map(userRows.map((player) => [player.id, player.name || player.email]));
	const myPick = sessionUser ? pickRows.find((pick) => pick.userId === sessionUser.id) ?? null : null;
	return {
		user: sessionUser ? {
			id: sessionUser.id,
			name: sessionUser.name,
			email: sessionUser.email,
			isAdmin: isAdminEmail(sessionUser.email)
		} : null,
		phase,
		championTeam,
		teams: getTournamentTeams(matchRows),
		pick: myPick ? {
			team: myPick.team,
			bonusPoints: myPick.bonusPoints,
			phaseLabel: myPick.phaseLabel
		} : null,
		picks: pickRows.map((pick) => ({
			userId: pick.userId,
			name: nameById.get(pick.userId) ?? "Jogador",
			team: pick.team,
			bonusPoints: pick.bonusPoints,
			phaseLabel: pick.phaseLabel,
			isChampion: championTeam !== null && pick.team === championTeam
		})).sort((a, b) => b.bonusPoints - a.bonusPoints || a.name.localeCompare(b.name))
	};
});
var saveChampionPick_createServerFn_handler = createServerRpc({
	id: "e44b322f32410f84e1bf091ad37ae41784ad44497c361303107076885f0a201f",
	name: "saveChampionPick",
	filename: "src/lib/bolao.ts"
}, (opts) => saveChampionPick.__executeServer(opts));
var saveChampionPick = createServerFn({ method: "POST" }).validator(object({ team: string().min(1) })).handler(saveChampionPick_createServerFn_handler, async ({ data }) => {
	await ensureSeedMatches();
	const [{ db }, { matches, championPicks }] = await Promise.all([import("./db-BX8pGjWj.mjs").then((n) => n.n).then((n) => n.n), import("./schema-DVvrMujE.mjs").then((n) => n.r).then((n) => n.t)]);
	const sessionUser = await getSessionUser();
	if (!sessionUser) throw new Error("Voce precisa entrar para palpitar o campeao.");
	const matchRows = await db.select().from(matches);
	const phase = getChampionPhase(matchRows);
	if (phase.locked || phase.points === null) throw new Error("O palpite de campeao ja esta bloqueado (Final).");
	if (!getTournamentTeams(matchRows).includes(data.team)) throw new Error("Selecione um time valido.");
	await db.insert(championPicks).values({
		userId: sessionUser.id,
		team: data.team,
		bonusPoints: phase.points,
		phaseLabel: phase.label,
		updatedAt: /* @__PURE__ */ new Date()
	}).onConflictDoUpdate({
		target: championPicks.userId,
		set: {
			team: data.team,
			bonusPoints: phase.points,
			phaseLabel: phase.label,
			updatedAt: /* @__PURE__ */ new Date()
		}
	});
	return { ok: true };
});
//#endregion
export { buyCard_createServerFn_handler, cancelX1Challenge_createServerFn_handler, createX1Challenge_createServerFn_handler, getAdminData_createServerFn_handler, getBolaoData_createServerFn_handler, getCardsData_createServerFn_handler, getGuruData_createServerFn_handler, getMissionsData_createServerFn_handler, getX1Data_createServerFn_handler, respondX1Challenge_createServerFn_handler, saveChampionPick_createServerFn_handler, saveGuess_createServerFn_handler, saveMatchResult_createServerFn_handler, useCard_createServerFn_handler };
