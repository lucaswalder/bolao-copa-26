import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as getCardsData } from "./bolao-DVb7JzZB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cartas-CSUNeAUH.js
var $$splitComponentImporter = () => import("./cartas-tpwq2_oQ.mjs");
var Route = createFileRoute("/cartas")({
	loader: () => getCardsData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
