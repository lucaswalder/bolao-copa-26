import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as getMissionsData } from "./bolao-DVb7JzZB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/missoes-XhQ-7oJU.js
var $$splitComponentImporter = () => import("./missoes-BSVjNvkC.mjs");
var Route = createFileRoute("/missoes")({
	loader: () => getMissionsData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
