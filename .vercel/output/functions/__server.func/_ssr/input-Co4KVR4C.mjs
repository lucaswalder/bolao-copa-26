import "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { s as cn } from "./card-BCLLgRQe.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("h-10 w-full rounded-md border border-[var(--line)] bg-white/85 px-3 py-2 text-sm text-[var(--sea-ink)] shadow-sm transition-colors placeholder:text-[var(--sea-ink-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lagoon)] disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
//#endregion
export { Input as t };
