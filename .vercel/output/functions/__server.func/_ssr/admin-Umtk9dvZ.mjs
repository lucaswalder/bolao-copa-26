import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getAdminData } from "./bolao-BzKwpU8o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Umtk9dvZ.js
var $$splitErrorComponentImporter = () => import("./admin-CTQaPWiH.mjs");
var $$splitComponentImporter = () => import("./admin-DgnwTceE.mjs");
var Route = createFileRoute("/admin")({
	loader: () => getAdminData(),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
