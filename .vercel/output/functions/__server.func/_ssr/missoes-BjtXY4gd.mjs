import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as getMissionsData } from "./bolao-Bg8psdqA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/missoes-BjtXY4gd.js
var $$splitComponentImporter = () => import("./missoes-BY-z9eQK.mjs");
var Route = createFileRoute("/missoes")({
	loader: () => getMissionsData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
