import "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
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
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		className: cn("rounded-lg border border-[var(--line)] bg-white/78 text-[var(--sea-ink)] shadow-sm backdrop-blur", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-header",
		className: cn("flex flex-col gap-1.5 p-5", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-title",
		className: cn("text-lg font-bold leading-none", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-description",
		className: cn("text-sm text-[var(--sea-ink-soft)]", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-content",
		className: cn("p-5 pt-0", className),
		...props
	});
}
//#endregion
export { CardHeader as a, CardDescription as i, Card as n, CardTitle as o, CardContent as r, cn as s, Badge as t };
