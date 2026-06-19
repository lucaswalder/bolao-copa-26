import { n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { _ as string, c as boolean, m as object, p as number } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bolao-Bw5NaF6T.js
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
function calculatePoints(guess) {
	const resultHome = guess.match.homeScore;
	const resultAway = guess.match.awayScore;
	if (resultHome === null || resultAway === null) return {
		points: 0,
		hitOutcome: false,
		hitExact: false
	};
	const hitOutcome = getOutcome(guess.homeScore, guess.awayScore) === getOutcome(resultHome, resultAway);
	const hitExact = guess.homeScore === resultHome && guess.awayScore === resultAway;
	return {
		points: (hitOutcome ? 2 : 0) + (hitExact ? 1 : 0),
		hitOutcome,
		hitExact
	};
}
async function getSessionUser() {
	const [{ getRequestHeaders }, { auth }] = await Promise.all([import("./ssr.mjs").then((n) => n.i).then((n) => n.t), import("./auth-3txykCZS.mjs").then((n) => n.n)]);
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
		import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)
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
		import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)
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
function computeStandings(userRows, guessRows, matchById, challengeRows) {
	const guessByKey = /* @__PURE__ */ new Map();
	for (const guess of guessRows) guessByKey.set(`${guess.userId}:${guess.matchId}`, guess);
	const tally = new Map(userRows.map((player) => [player.id, {
		id: player.id,
		name: player.name || player.email,
		guessesCount: 0,
		points: 0,
		exactHits: 0,
		outcomeHits: 0
	}]));
	for (const guess of guessRows) {
		const entry = tally.get(guess.userId);
		const match = matchById.get(guess.matchId);
		if (!entry || !match) continue;
		entry.guessesCount += 1;
		const result = calculatePoints({
			homeScore: guess.homeScore,
			awayScore: guess.awayScore,
			match
		});
		entry.points += result.points;
		entry.exactHits += result.hitExact ? 1 : 0;
		entry.outcomeHits += result.hitOutcome ? 1 : 0;
	}
	for (const challenge of challengeRows) {
		if (challenge.status !== "accepted") continue;
		const match = matchById.get(challenge.matchId);
		if (!match || match.homeScore === null || match.awayScore === null) continue;
		const { winnerId, loserId, loserPoints } = resolveX1Winner(challenge, match, guessByKey);
		if (!winnerId || !loserId) continue;
		const winnerEntry = tally.get(winnerId);
		const loserEntry = tally.get(loserId);
		if (winnerEntry) winnerEntry.points += challenge.stake;
		if (loserEntry) loserEntry.points -= challenge.stake + loserPoints;
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
var getBolaoData_createServerFn_handler = createServerRpc({
	id: "9c0ae71b2df8f6a272c3b86699a0f3cc1c9037a7549e51873626dc41cdbc085c",
	name: "getBolaoData",
	filename: "src/lib/bolao.ts"
}, (opts) => getBolaoData.__executeServer(opts));
var getBolaoData = createServerFn({ method: "GET" }).handler(getBolaoData_createServerFn_handler, async () => {
	await ensureSeedMatches();
	const [{ asc }, { db }, { guesses, matches, user, rankingSnapshots, x1Challenges }] = await Promise.all([
		import("../_libs/drizzle-orm.mjs").then((n) => n.t),
		import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)
	]);
	const sessionUser = await getSessionUser();
	const [matchRows, guessRows, userRows, snapshotRows, challengeRows] = await Promise.all([
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
		}).from(x1Challenges)
	]);
	await refreshKnockoutTeams(matchRows);
	const matchById = new Map(matchRows.map((match) => [match.id, match]));
	const guessByKey = /* @__PURE__ */ new Map();
	for (const guess of guessRows) guessByKey.set(`${guess.userId}:${guess.matchId}`, guess);
	const previousPositionByUser = new Map(snapshotRows.map((snapshot) => [snapshot.userId, snapshot.position]));
	const nameById = new Map(userRows.map((player) => [player.id, player.name || player.email]));
	const standings = computeStandings(userRows, guessRows, matchById, challengeRows).map((player) => {
		const previousPosition = previousPositionByUser.get(player.id) ?? null;
		return {
			...player,
			previousPosition,
			delta: previousPosition === null ? 0 : previousPosition - player.position
		};
	});
	const currentUserGuesses = new Map(guessRows.filter((guess) => guess.userId === sessionUser?.id).map((guess) => [guess.matchId, guess]));
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
		matches: matchRows.map((match) => {
			const userGuess = currentUserGuesses.get(match.id);
			const hasResult = match.homeScore !== null && match.awayScore !== null;
			const x1 = sessionUser ? buildMatchX1View(match, sessionUser.id, challengeRows, nameById, guessByKey, hasResult) : null;
			return {
				...match,
				startsAt: match.startsAt.toISOString(),
				createdAt: match.createdAt.toISOString(),
				updatedAt: match.updatedAt.toISOString(),
				guess: userGuess ? {
					homeScore: userGuess.homeScore,
					awayScore: userGuess.awayScore,
					points: calculatePoints({
						homeScore: userGuess.homeScore,
						awayScore: userGuess.awayScore,
						match
					}).points
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
		import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)
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
		import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)
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
		import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)
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
	return { ok: true };
});
async function snapshotStandings() {
	const [{ db }, { guesses, matches, user, rankingSnapshots, x1Challenges }] = await Promise.all([import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n), import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)]);
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
	const standings = computeStandings(userRows, guessRows, new Map(matchRows.map((match) => [match.id, match])), challengeRows);
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
		import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)
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
		import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)
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
		import("./db-CVfCauA_.mjs").then((n) => n.n).then((n) => n.n),
		import("./schema-P47zgFkJ.mjs").then((n) => n.r).then((n) => n.t)
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
//#endregion
export { cancelX1Challenge_createServerFn_handler, createX1Challenge_createServerFn_handler, getAdminData_createServerFn_handler, getBolaoData_createServerFn_handler, respondX1Challenge_createServerFn_handler, saveGuess_createServerFn_handler, saveMatchResult_createServerFn_handler };
