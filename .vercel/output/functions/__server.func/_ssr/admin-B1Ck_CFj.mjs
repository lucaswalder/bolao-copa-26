import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import "./bolao-DVb7JzZB.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DgN_QdeO.mjs";
import { t as Badge } from "./badge-CMeIM4Xt.mjs";
import { O as ArrowLeft, c as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-B1Ck_CFj.js
var import_jsx_runtime = require_jsx_runtime();
function AdminError({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen px-4 py-6 text-[var(--sea-ink)] sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid w-full max-w-2xl gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "feature-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "canary",
						className: "w-fit gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), "Admin"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Acesso restrito" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: error.message || "Entre com um email listado em ADMIN_EMAILS para acessar." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[var(--sea-ink)] px-4 text-sm font-semibold text-white shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Voltar ao bolão"]
				}) })]
			})
		})
	});
}
//#endregion
export { AdminError as errorComponent };
