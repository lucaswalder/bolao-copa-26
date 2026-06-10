import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getAdminData } from "./bolao-CzQ0CbwH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-j0K4JvBl.js
var $$splitErrorComponentImporter = () => import("./admin-CXbf2021.mjs");
var $$splitComponentImporter = () => import("./admin-kSOF8BjY.mjs");
var Route = createFileRoute("/admin")({
	loader: () => getAdminData(),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
