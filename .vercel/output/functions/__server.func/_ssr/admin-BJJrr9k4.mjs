import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getAdminData } from "./bolao-Dg65kDIJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BJJrr9k4.js
var $$splitErrorComponentImporter = () => import("./admin-BKJ0ViR4.mjs");
var $$splitComponentImporter = () => import("./admin-BSAnY3Dh.mjs");
var Route = createFileRoute("/admin")({
	loader: () => getAdminData(),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
