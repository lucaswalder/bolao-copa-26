import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getGuruData } from "./bolao-Bg8psdqA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guru-DZ8taTH-.js
var $$splitComponentImporter = () => import("./guru-CKPHIix6.mjs");
var Route = createFileRoute("/guru")({
	loader: () => getGuruData(),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
