import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { _ as string, c as boolean, m as object, p as number } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bolao-BzKwpU8o.js
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
var getGuruData = createServerFn({ method: "GET" }).handler(createSsrRpc("fec45bad692ad4d1175fb8a5a2bdd2929165eb0fbb53ba1c2d8755e165bde2fe"));
var saveChampionPick = createServerFn({ method: "POST" }).validator(object({ team: string().min(1) })).handler(createSsrRpc("e44b322f32410f84e1bf091ad37ae41784ad44497c361303107076885f0a201f"));
//#endregion
export { getGuruData as a, saveGuess as c, getBolaoData as i, saveMatchResult as l, createX1Challenge as n, respondX1Challenge as o, getAdminData as r, saveChampionPick as s, cancelX1Challenge as t };
