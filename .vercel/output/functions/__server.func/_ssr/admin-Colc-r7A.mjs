import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getAdminData } from "./bolao-DVb7JzZB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Colc-r7A.js
var $$splitErrorComponentImporter = () => import("./admin-B1Ck_CFj.mjs");
var $$splitComponentImporter = () => import("./admin-BAG9xZQu.mjs");
var Route = createFileRoute("/admin")({
	loader: () => getAdminData(),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
