import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getAdminData } from "./bolao-BmiEFycs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CkcOEp4P.js
var $$splitErrorComponentImporter = () => import("./admin-Bda99ubI.mjs");
var $$splitComponentImporter = () => import("./admin-p_2EX2tN.mjs");
var Route = createFileRoute("/admin")({
	loader: () => getAdminData(),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
