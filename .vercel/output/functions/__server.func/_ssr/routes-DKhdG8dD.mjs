import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getBolaoData } from "./bolao-Dg65kDIJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DKhdG8dD.js
var $$splitComponentImporter = () => import("./routes-HDsXlGas.mjs");
var Route = createFileRoute("/")({
	loader: () => getBolaoData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
