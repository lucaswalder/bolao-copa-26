import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getBolaoData } from "./bolao-Bg8psdqA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D97W38nU.js
var $$splitComponentImporter = () => import("./routes-UfOk6h54.mjs");
var Route = createFileRoute("/")({
	loader: () => getBolaoData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
