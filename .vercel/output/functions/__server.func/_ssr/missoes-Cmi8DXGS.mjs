import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as getMissionsData } from "./bolao-BmiEFycs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/missoes-Cmi8DXGS.js
var $$splitComponentImporter = () => import("./missoes-DSrMAJWA.mjs");
var Route = createFileRoute("/missoes")({
	loader: () => getMissionsData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
