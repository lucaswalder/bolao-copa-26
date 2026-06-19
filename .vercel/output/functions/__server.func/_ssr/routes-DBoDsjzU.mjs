import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getBolaoData } from "./bolao-BzKwpU8o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DBoDsjzU.js
var $$splitComponentImporter = () => import("./routes-6KnB-92t.mjs");
var Route = createFileRoute("/")({
	loader: () => getBolaoData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
