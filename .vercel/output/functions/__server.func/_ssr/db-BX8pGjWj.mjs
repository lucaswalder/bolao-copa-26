import { r as __exportAll } from "../_runtime.mjs";
import { n as drizzle, r as Pool } from "../_libs/drizzle-orm.mjs";
import { i as schema_exports, n as __exportAll$1 } from "./schema-DVvrMujE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-BX8pGjWj.js
var db_BX8pGjWj_exports = /* @__PURE__ */ __exportAll({
	n: () => db_exports,
	t: () => db
});
var db_exports = /* @__PURE__ */ __exportAll$1({ db: () => db });
var connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required");
var db = drizzle(new Pool({
	connectionString,
	ssl: connectionString.includes("sslmode=") ? { rejectUnauthorized: false } : void 0
}), { schema: schema_exports });
//#endregion
export { db_BX8pGjWj_exports as n, db as t };
