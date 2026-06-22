import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getBolaoData } from "./bolao-BmiEFycs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BPM4OOS4.js
var $$splitComponentImporter = () => import("./routes-Cdc6Z8qY.mjs");
var Route = createFileRoute("/")({
	loader: () => getBolaoData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
