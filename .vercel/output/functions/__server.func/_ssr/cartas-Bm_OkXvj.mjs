import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as getCardsData } from "./bolao-Bg8psdqA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cartas-Bm_OkXvj.js
var $$splitComponentImporter = () => import("./cartas-B6NH52V3.mjs");
var Route = createFileRoute("/cartas")({
	loader: () => getCardsData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
