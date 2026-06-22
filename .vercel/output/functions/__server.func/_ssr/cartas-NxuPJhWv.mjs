import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as getCardsData } from "./bolao-BmiEFycs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cartas-NxuPJhWv.js
var $$splitComponentImporter = () => import("./cartas-4Y099_td.mjs");
var Route = createFileRoute("/cartas")({
	loader: () => getCardsData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
