import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { _ as string, m as object, p as number } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bolao-CzQ0CbwH.js
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
//#endregion
export { saveMatchResult as i, getBolaoData as n, saveGuess as r, getAdminData as t };
