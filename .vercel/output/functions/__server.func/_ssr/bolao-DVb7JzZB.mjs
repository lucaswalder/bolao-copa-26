import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { _ as string, a as _enum, c as boolean, m as object, p as number } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bolao-DVb7JzZB.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getBolaoData = createServerFn({ method: "GET" }).handler(createSsrRpc("9c0ae71b2df8f6a272c3b86699a0f3cc1c9037a7549e51873626dc41cdbc085c"));
var getAdminData = createServerFn({ method: "GET" }).handler(createSsrRpc("61b583fb06daa194ef7d263a7eea03a7e5bf9c77bfeb777a9aa878d891fccc3a"));
var saveGuess = createServerFn({ method: "POST" }).validator(object({
	matchId: string().min(1),
	homeScore: number().int().min(0).max(30),
	awayScore: number().int().min(0).max(30)
})).handler(createSsrRpc("770395cb0a54d163507d72e39c35d4e6be55257ab05c3668cac486e9efe5924f"));
var saveMatchResult = createServerFn({ method: "POST" }).validator(object({
	matchId: string().min(1),
	homeScore: number().int().min(0).max(30).nullable(),
	awayScore: number().int().min(0).max(30).nullable(),
	homePenaltyScore: number().int().min(0).max(30).nullable(),
	awayPenaltyScore: number().int().min(0).max(30).nullable(),
	winnerTeam: string().min(1).nullable()
})).handler(createSsrRpc("d6fe564b0e75085bdbf6bb714c257296042a8409381c1bfe8b3128b4c5d3b81a"));
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
		name: "Escudo X1",
		description: "Use antes de um duelo X1. Se você perder, a aposta é devolvida — você não perde pontos.",
		icon: "🛡️",
		rarity: "rare",
		cost: 5
	},
	{
		id: "momentum",
		name: "Ímpeto",
		description: "Ganhe +2 pontos extras se acertar o resultado desta partida.",
		icon: "⚡",
		rarity: "rare",
		cost: 5
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
var getX1Data = createServerFn({ method: "GET" }).handler(createSsrRpc("a420957010a8e32db4ac68e7bef5b4fda92caf86f52c89f3d6b97fe7c358b3ec"));
var createX1Challenge = createServerFn({ method: "POST" }).validator(object({
	matchId: string().min(1),
	opponentId: string().min(1),
	stake: number().int().min(1).max(3)
})).handler(createSsrRpc("8b61371e396161395766012da1e15f18fdb5405546f019dd496902f635393c6f"));
var respondX1Challenge = createServerFn({ method: "POST" }).validator(object({
	challengeId: string().min(1),
	accept: boolean()
})).handler(createSsrRpc("4deff4110ee7efbb309be401d3db70001ec839a67dcd14d0d5942c9ca76dc871"));
var cancelX1Challenge = createServerFn({ method: "POST" }).validator(object({ challengeId: string().min(1) })).handler(createSsrRpc("d35208f0ba90f8bb98608fde71f64bd72848f6d260417b0c68a0424a4ec520b9"));
var getMissionsData = createServerFn({ method: "GET" }).handler(createSsrRpc("7344d68358c902bb7632730faf92c15b518f7c42f9c133438253da5dad663aa0"));
var getCardsData = createServerFn({ method: "GET" }).handler(createSsrRpc("7dd6c9ca547d6c40b1e74b29cea701c1d47d95d63e6a2cfbf87ccafd37aaecac"));
var useCard = createServerFn({ method: "POST" }).validator(object({
	cardInstanceId: string().min(1),
	matchId: string().min(1)
})).handler(createSsrRpc("245cb76a28c08279e5ae68941ec6a8d762d9f33ed2b97d9296f5d26d38170834"));
var buyCard = createServerFn({ method: "POST" }).validator(object({ rarity: _enum([
	"common",
	"rare",
	"legendary"
]) })).handler(createSsrRpc("0cb1ead75bb4ea330df8f0d193e3933a07489a7ebe74cb957c0725a5ec497213"));
var getGuruData = createServerFn({ method: "GET" }).handler(createSsrRpc("fec45bad692ad4d1175fb8a5a2bdd2929165eb0fbb53ba1c2d8755e165bde2fe"));
var saveChampionPick = createServerFn({ method: "POST" }).validator(object({ team: string().min(1) })).handler(createSsrRpc("e44b322f32410f84e1bf091ad37ae41784ad44497c361303107076885f0a201f"));
//#endregion
export { getAdminData as a, getGuruData as c, respondX1Challenge as d, saveChampionPick as f, useCard as h, createX1Challenge as i, getMissionsData as l, saveMatchResult as m, buyCard as n, getBolaoData as o, saveGuess as p, cancelX1Challenge as r, getCardsData as s, CARDS as t, getX1Data as u };
