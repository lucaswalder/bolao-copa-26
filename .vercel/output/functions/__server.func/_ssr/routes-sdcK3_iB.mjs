import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getBolaoData } from "./bolao-CzQ0CbwH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-sdcK3_iB.js
var $$splitComponentImporter = () => import("./routes-BtoY5oCF.mjs");
var Route = createFileRoute("/")({
	loader: () => getBolaoData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
