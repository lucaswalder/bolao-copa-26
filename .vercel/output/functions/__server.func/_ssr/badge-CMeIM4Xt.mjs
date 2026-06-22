import "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { o as cn } from "./card-DgN_QdeO.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold", {
	variants: { variant: {
		default: "border-transparent bg-[var(--sea-ink)] text-white",
		secondary: "border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink)]",
		canary: "border-yellow-500/30 bg-yellow-300/40 text-yellow-950",
		green: "border-emerald-600/25 bg-emerald-500/15 text-emerald-950"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-slot": "badge",
		className: cn(badgeVariants({
			variant,
			className
		})),
		...props
	});
}
//#endregion
export { Badge as t };
