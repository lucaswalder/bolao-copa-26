import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getAdminData } from "./bolao-Bg8psdqA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DzHgLX4s.js
var $$splitErrorComponentImporter = () => import("./admin-Bf6EiX14.mjs");
var $$splitComponentImporter = () => import("./admin-fU9qcYcP.mjs");
var Route = createFileRoute("/admin")({
	loader: () => getAdminData(),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
