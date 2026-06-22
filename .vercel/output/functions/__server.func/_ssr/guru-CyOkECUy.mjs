import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getGuruData } from "./bolao-BmiEFycs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guru-CyOkECUy.js
var $$splitComponentImporter = () => import("./guru-DMd_CvJ0.mjs");
var Route = createFileRoute("/guru")({
	loader: () => getGuruData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
