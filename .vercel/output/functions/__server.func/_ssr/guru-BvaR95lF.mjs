import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getGuruData } from "./bolao-DVb7JzZB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guru-BvaR95lF.js
var $$splitComponentImporter = () => import("./guru-jwU_r-6T.mjs");
var Route = createFileRoute("/guru")({
	loader: () => getGuruData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
