import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getGuruData } from "./bolao-BzKwpU8o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guru-BJN6X4Ta.js
var $$splitComponentImporter = () => import("./guru-CBEr52TU.mjs");
var Route = createFileRoute("/guru")({
	loader: () => getGuruData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
