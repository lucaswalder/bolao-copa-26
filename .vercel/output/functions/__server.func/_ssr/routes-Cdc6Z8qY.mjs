import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as Link, f as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as respondX1Challenge, h as useCard, i as createX1Challenge, p as saveGuess, r as cancelX1Challenge } from "./bolao-BmiEFycs.mjs";
import { a as CardTitle, i as CardHeader, n as CardContent, r as CardDescription, t as Card } from "./card-DgN_QdeO.mjs";
import { t as Badge } from "./badge-CMeIM4Xt.mjs";
import { C as Check, E as ArrowUp, O as ArrowDown, T as Brain, _ as Flag, c as ShieldCheck, f as Pencil, g as ListFilter, h as Lock, i as Swords, l as Search, m as LogOut, n as UserPlus, p as Medal, r as Trophy, t as X, u as Save, w as CalendarDays } from "../_libs/lucide-react.mjs";
import { n as useServerFn, t as Button } from "./button-DygBLB-0.mjs";
import { t as Input } from "./input-BC-nN5LR.mjs";
import { t as Label } from "./label-s-8WNirM.mjs";
import { a as isSafeUrlScheme, d as toKebabCase, i as defu, o as getBaseURL, r as createFetch, u as capitalizeFirstLetter } from "./auth-YRKTgsKj.mjs";
import { t as Route } from "./routes-BPM4OOS4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cdc6Z8qY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PROTO_POLLUTION_PATTERNS = {
	proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
	constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
	protoShort: /"__proto__"\s*:/,
	constructorShort: /"constructor"\s*:/
};
var JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
var SPECIAL_VALUES = {
	true: true,
	false: false,
	null: null,
	undefined: void 0,
	nan: NaN,
	infinity: Number.POSITIVE_INFINITY,
	"-infinity": Number.NEGATIVE_INFINITY
};
var ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
	return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
	const match = ISO_DATE_REGEX.exec(value);
	if (!match) return null;
	const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
	const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
	if (offsetSign) {
		const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
		date.setUTCMinutes(date.getUTCMinutes() + offset);
	}
	return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
	const { strict = false, warnings = false, reviver, parseDates = true } = options;
	if (typeof value !== "string") return value;
	const trimmed = value.trim();
	const lowerValue = trimmed.toLowerCase();
	if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
	if (!JSON_SIGNATURE.test(trimmed)) {
		if (strict) throw new SyntaxError("[better-json] Invalid JSON");
		return value;
	}
	if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
		const matches = pattern.test(trimmed);
		if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
		return matches;
	}) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
	try {
		const secureReviver = (key, value) => {
			if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
				if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
				return;
			}
			if (parseDates && typeof value === "string") {
				const date = parseISODate(value);
				if (date) return date;
			}
			return reviver ? reviver(key, value) : value;
		};
		return JSON.parse(trimmed, secureReviver);
	} catch (error) {
		if (strict) throw error;
		return value;
	}
}
function parseJSON(value, options = { strict: true }) {
	return betterJSONParse(value, options);
}
var redirectPlugin = {
	id: "redirect",
	name: "Redirect",
	hooks: { onSuccess(context) {
		if (context.data?.url && context.data?.redirect && isSafeUrlScheme(context.data.url)) {
			if (typeof window !== "undefined" && window.location) {
				if (window.location) try {
					window.location.href = context.data.url;
				} catch {}
			}
		}
	} }
};
var listenerQueue = [];
var lqIndex = 0;
var QUEUE_ITEMS_PER_LISTENER = 4;
var nanostoresGlobal = globalThis.nanostoresGlobal ||= { epoch: 0 };
var atom = /* @__NO_SIDE_EFFECTS__ */ (initialValue) => {
	let listeners = [];
	let $atom = {
		get() {
			if (!$atom.lc) $atom.listen(() => {})();
			return $atom.value;
		},
		init: initialValue,
		lc: 0,
		listen(listener) {
			$atom.lc = listeners.push(listener);
			return () => {
				for (let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length;) if (listenerQueue[i] === listener) listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
				else i += QUEUE_ITEMS_PER_LISTENER;
				let index = listeners.indexOf(listener);
				if (~index) {
					listeners.splice(index, 1);
					if (!--$atom.lc) $atom.off();
				}
			};
		},
		notify(oldValue, changedKey) {
			nanostoresGlobal.epoch++;
			let runListenerQueue = !listenerQueue.length;
			for (let listener of listeners) listenerQueue.push(listener, $atom.value, oldValue, changedKey);
			if (runListenerQueue) {
				for (lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER) listenerQueue[lqIndex](listenerQueue[lqIndex + 1], listenerQueue[lqIndex + 2], listenerQueue[lqIndex + 3]);
				listenerQueue.length = 0;
			}
		},
		off() {},
		set(newValue) {
			let oldValue = $atom.value;
			if (oldValue !== newValue) {
				$atom.value = newValue;
				$atom.notify(oldValue);
			}
		},
		subscribe(listener) {
			let unbind = $atom.listen(listener);
			listener($atom.value);
			return unbind;
		},
		value: initialValue
	};
	return $atom;
};
var MOUNT = 5;
var UNMOUNT = 6;
var REVERT_MUTATION = 10;
var on = (object, listener, eventKey, mutateStore) => {
	object.events = object.events || {};
	if (!object.events[eventKey + REVERT_MUTATION]) object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps) => {
		object.events[eventKey].reduceRight((event, l) => (l(event), event), {
			shared: {},
			...eventProps
		});
	});
	object.events[eventKey] = object.events[eventKey] || [];
	object.events[eventKey].push(listener);
	return () => {
		let currentListeners = object.events[eventKey];
		let index = currentListeners.indexOf(listener);
		currentListeners.splice(index, 1);
		if (!currentListeners.length) {
			delete object.events[eventKey];
			object.events[eventKey + REVERT_MUTATION]();
			delete object.events[eventKey + REVERT_MUTATION];
		}
	};
};
var STORE_UNMOUNT_DELAY = 1e3;
var onMount = ($store, initialize) => {
	let listener = (payload) => {
		let destroy = initialize(payload);
		if (destroy) $store.events[UNMOUNT].push(destroy);
	};
	return on($store, listener, MOUNT, (runListeners) => {
		let originListen = $store.listen;
		$store.listen = (...args) => {
			if (!$store.lc && !$store.active) {
				$store.active = true;
				runListeners();
			}
			return originListen(...args);
		};
		let originOff = $store.off;
		$store.events[UNMOUNT] = [];
		$store.off = () => {
			originOff();
			setTimeout(() => {
				if ($store.active && !$store.lc) {
					$store.active = false;
					for (let destroy of $store.events[UNMOUNT]) destroy();
					$store.events[UNMOUNT] = [];
				}
			}, STORE_UNMOUNT_DELAY);
		};
		return () => {
			$store.listen = originListen;
			$store.off = originOff;
		};
	});
};
function listenKeys($store, keys, listener) {
	let keysSet = new Set(keys).add(void 0);
	return $store.listen((value, oldValue, changed) => {
		if (keysSet.has(changed)) listener(value, oldValue, changed);
	});
}
var isServer = () => typeof window === "undefined";
var useAuthQuery = (initializedAtom, path, $fetch, options) => {
	const value = /* @__PURE__ */ atom({
		data: null,
		error: null,
		isPending: true,
		isRefetching: false,
		refetch: (queryParams) => fn(queryParams)
	});
	const fn = async (queryParams) => {
		return new Promise((resolve) => {
			const opts = typeof options === "function" ? options({
				data: value.get().data,
				error: value.get().error,
				isPending: value.get().isPending
			}) : options;
			$fetch(path, {
				...opts,
				query: {
					...opts?.query,
					...queryParams?.query
				},
				async onSuccess(context) {
					value.set({
						data: context.data,
						error: null,
						isPending: false,
						isRefetching: false,
						refetch: value.value.refetch
					});
					await opts?.onSuccess?.(context);
				},
				async onError(context) {
					const { request } = context;
					const retryAttempts = typeof request.retry === "number" ? request.retry : request.retry?.attempts;
					const retryAttempt = request.retryAttempt || 0;
					if (retryAttempts && retryAttempt < retryAttempts) return;
					const isUnauthorized = context.error.status === 401;
					value.set({
						error: context.error,
						data: isUnauthorized ? null : value.get().data,
						isPending: false,
						isRefetching: false,
						refetch: value.value.refetch
					});
					await opts?.onError?.(context);
				},
				async onRequest(context) {
					const currentValue = value.get();
					value.set({
						isPending: currentValue.data === null,
						data: currentValue.data,
						error: null,
						isRefetching: true,
						refetch: value.value.refetch
					});
					await opts?.onRequest?.(context);
				}
			}).catch((error) => {
				value.set({
					error,
					data: value.get().data,
					isPending: false,
					isRefetching: false,
					refetch: value.value.refetch
				});
			}).finally(() => {
				resolve(void 0);
			});
		});
	};
	initializedAtom = Array.isArray(initializedAtom) ? initializedAtom : [initializedAtom];
	let isInitialized = false;
	for (const initAtom of initializedAtom) initAtom.subscribe(async () => {
		if (isServer()) return;
		if (isInitialized) await fn();
		else onMount(value, () => {
			const timeoutId = setTimeout(async () => {
				if (!isInitialized) {
					isInitialized = true;
					await fn();
				}
			}, 0);
			return () => {
				value.off();
				initAtom.off();
				clearTimeout(timeoutId);
			};
		});
	});
	return value;
};
var kBroadcastChannel = Symbol.for("better-auth:broadcast-channel");
var now$1 = () => Math.floor(Date.now() / 1e3);
var WindowBroadcastChannel = class {
	listeners = /* @__PURE__ */ new Set();
	name;
	constructor(name = "better-auth.message") {
		this.name = name;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	post(message) {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(this.name, JSON.stringify({
				...message,
				timestamp: now$1()
			}));
		} catch {}
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const handler = (event) => {
			if (event.key !== this.name) return;
			const message = JSON.parse(event.newValue ?? "{}");
			if (message?.event !== "session" || !message?.data) return;
			this.listeners.forEach((listener) => listener(message));
		};
		window.addEventListener("storage", handler);
		return () => {
			window.removeEventListener("storage", handler);
		};
	}
};
function getGlobalBroadcastChannel(name = "better-auth.message") {
	if (!globalThis[kBroadcastChannel]) globalThis[kBroadcastChannel] = new WindowBroadcastChannel(name);
	return globalThis[kBroadcastChannel];
}
var kFocusManager = Symbol.for("better-auth:focus-manager");
var WindowFocusManager = class {
	listeners = /* @__PURE__ */ new Set();
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setFocused(focused) {
		this.listeners.forEach((listener) => listener(focused));
	}
	setup() {
		if (typeof window === "undefined" || typeof document === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const visibilityHandler = () => {
			if (document.visibilityState === "visible") this.setFocused(true);
		};
		document.addEventListener("visibilitychange", visibilityHandler, false);
		return () => {
			document.removeEventListener("visibilitychange", visibilityHandler, false);
		};
	}
};
function getGlobalFocusManager() {
	if (!globalThis[kFocusManager]) globalThis[kFocusManager] = new WindowFocusManager();
	return globalThis[kFocusManager];
}
var kOnlineManager = Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
	listeners = /* @__PURE__ */ new Set();
	isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setOnline(online) {
		this.isOnline = online;
		this.listeners.forEach((listener) => listener(online));
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const onOnline = () => this.setOnline(true);
		const onOffline = () => this.setOnline(false);
		window.addEventListener("online", onOnline, false);
		window.addEventListener("offline", onOffline, false);
		return () => {
			window.removeEventListener("online", onOnline, false);
			window.removeEventListener("offline", onOffline, false);
		};
	}
};
function getGlobalOnlineManager() {
	if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
	return globalThis[kOnlineManager];
}
var now = () => Math.floor(Date.now() / 1e3);
/**
* Normalize $fetch response: `throw: true` returns data directly, otherwise `{ data, error }`.
*/
function normalizeSessionResponse(res) {
	if (typeof res === "object" && res !== null && "data" in res && "error" in res) return res;
	return {
		data: res,
		error: null
	};
}
/**
* Rate limit: don't refetch on focus if a session request was made within this many seconds
*/
var FOCUS_REFETCH_RATE_LIMIT_SECONDS = 5;
function createSessionRefreshManager(opts) {
	const { sessionAtom, sessionSignal, $fetch, options = {} } = opts;
	const refetchInterval = options.sessionOptions?.refetchInterval ?? 0;
	const refetchOnWindowFocus = options.sessionOptions?.refetchOnWindowFocus ?? true;
	const refetchWhenOffline = options.sessionOptions?.refetchWhenOffline ?? false;
	const state = {
		lastSync: 0,
		lastSessionRequest: 0,
		cachedSession: void 0
	};
	const shouldRefetch = () => {
		return refetchWhenOffline || getGlobalOnlineManager().isOnline;
	};
	const triggerRefetch = (event) => {
		if (!shouldRefetch()) return;
		if (event?.event === "storage") {
			state.lastSync = now();
			sessionSignal.set(!sessionSignal.get());
			return;
		}
		const currentSession = sessionAtom.get();
		const fetchSessionWithRefresh = () => {
			state.lastSessionRequest = now();
			$fetch("/get-session").then(async (res) => {
				let { data, error } = normalizeSessionResponse(res);
				if (data?.needsRefresh) try {
					const refreshRes = await $fetch("/get-session", { method: "POST" });
					({data, error} = normalizeSessionResponse(refreshRes));
				} catch {}
				const sessionData = data?.session && data?.user ? data : null;
				sessionAtom.set({
					...currentSession,
					data: sessionData,
					error
				});
				state.lastSync = now();
				sessionSignal.set(!sessionSignal.get());
			}).catch(() => {});
		};
		if (event?.event === "poll") {
			fetchSessionWithRefresh();
			return;
		}
		if (event?.event === "visibilitychange") {
			if (now() - state.lastSessionRequest < FOCUS_REFETCH_RATE_LIMIT_SECONDS) return;
			state.lastSessionRequest = now();
		}
		if (event?.event === "visibilitychange") {
			fetchSessionWithRefresh();
			return;
		}
		if (currentSession?.data === null || currentSession?.data === void 0) {
			state.lastSync = now();
			sessionSignal.set(!sessionSignal.get());
		}
	};
	const broadcastSessionUpdate = (trigger) => {
		getGlobalBroadcastChannel().post({
			event: "session",
			data: { trigger },
			clientId: Math.random().toString(36).substring(7)
		});
	};
	const setupPolling = () => {
		if (refetchInterval && refetchInterval > 0) state.pollInterval = setInterval(() => {
			if (sessionAtom.get()?.data) triggerRefetch({ event: "poll" });
		}, refetchInterval * 1e3);
	};
	const setupBroadcast = () => {
		state.unsubscribeBroadcast = getGlobalBroadcastChannel().subscribe(() => {
			triggerRefetch({ event: "storage" });
		});
	};
	const setupFocusRefetch = () => {
		if (!refetchOnWindowFocus) return;
		state.unsubscribeFocus = getGlobalFocusManager().subscribe(() => {
			triggerRefetch({ event: "visibilitychange" });
		});
	};
	const setupOnlineRefetch = () => {
		state.unsubscribeOnline = getGlobalOnlineManager().subscribe((online) => {
			if (online) triggerRefetch({ event: "visibilitychange" });
		});
	};
	const init = () => {
		setupPolling();
		setupBroadcast();
		setupFocusRefetch();
		setupOnlineRefetch();
		getGlobalBroadcastChannel().setup();
		getGlobalFocusManager().setup();
		getGlobalOnlineManager().setup();
	};
	const cleanup = () => {
		if (state.pollInterval) {
			clearInterval(state.pollInterval);
			state.pollInterval = void 0;
		}
		if (state.unsubscribeBroadcast) {
			state.unsubscribeBroadcast();
			state.unsubscribeBroadcast = void 0;
		}
		if (state.unsubscribeFocus) {
			state.unsubscribeFocus();
			state.unsubscribeFocus = void 0;
		}
		if (state.unsubscribeOnline) {
			state.unsubscribeOnline();
			state.unsubscribeOnline = void 0;
		}
		state.lastSync = 0;
		state.lastSessionRequest = 0;
		state.cachedSession = void 0;
	};
	return {
		init,
		cleanup,
		triggerRefetch,
		broadcastSessionUpdate
	};
}
function getSessionAtom($fetch, options) {
	const $signal = /* @__PURE__ */ atom(false);
	const session = useAuthQuery($signal, "/get-session", $fetch, { method: "GET" });
	let broadcastSessionUpdate = () => {};
	onMount(session, () => {
		const refreshManager = createSessionRefreshManager({
			sessionAtom: session,
			sessionSignal: $signal,
			$fetch,
			options
		});
		refreshManager.init();
		broadcastSessionUpdate = refreshManager.broadcastSessionUpdate;
		return () => {
			refreshManager.cleanup();
		};
	});
	return {
		session,
		$sessionSignal: $signal,
		broadcastSessionUpdate: (trigger) => broadcastSessionUpdate(trigger)
	};
}
var resolvePublicAuthUrl = (basePath) => {
	if (typeof process === "undefined") return void 0;
	const path = basePath ?? "/api/auth";
	if (process.env.NEXT_PUBLIC_AUTH_URL) return process.env.NEXT_PUBLIC_AUTH_URL;
	if (typeof window === "undefined") {
		if (process.env.NEXTAUTH_URL) try {
			return process.env.NEXTAUTH_URL;
		} catch {}
		if (process.env.VERCEL_URL) try {
			const protocol = process.env.VERCEL_URL.startsWith("http") ? "" : "https://";
			return `${new URL(`${protocol}${process.env.VERCEL_URL}`).origin}${path}`;
		} catch {}
	}
};
var getClientConfig = (options, loadEnv) => {
	const isCredentialsSupported = "credentials" in Request.prototype;
	const baseURL = getBaseURL(options?.baseURL, options?.basePath, void 0, loadEnv) ?? resolvePublicAuthUrl(options?.basePath) ?? "/api/auth";
	const pluginsFetchPlugins = options?.plugins?.flatMap((plugin) => plugin.fetchPlugins).filter((pl) => pl !== void 0) || [];
	const lifeCyclePlugin = {
		id: "lifecycle-hooks",
		name: "lifecycle-hooks",
		hooks: {
			onSuccess: options?.fetchOptions?.onSuccess,
			onError: options?.fetchOptions?.onError,
			onRequest: options?.fetchOptions?.onRequest,
			onResponse: options?.fetchOptions?.onResponse
		}
	};
	const { onSuccess: _onSuccess, onError: _onError, onRequest: _onRequest, onResponse: _onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
	const $fetch = createFetch({
		baseURL,
		...isCredentialsSupported ? { credentials: "include" } : {},
		method: "GET",
		jsonParser(text) {
			if (!text) return null;
			return parseJSON(text, { strict: false });
		},
		customFetchImpl: fetch,
		...restOfFetchOptions,
		plugins: [
			lifeCyclePlugin,
			...restOfFetchOptions.plugins || [],
			...options?.disableDefaultFetchPlugins ? [] : [redirectPlugin],
			...pluginsFetchPlugins
		]
	});
	const { $sessionSignal, session, broadcastSessionUpdate } = getSessionAtom($fetch, options);
	const plugins = options?.plugins || [];
	let pluginsActions = {};
	const pluginsAtoms = {
		$sessionSignal,
		session
	};
	const pluginPathMethods = {
		"/sign-out": "POST",
		"/revoke-sessions": "POST",
		"/revoke-other-sessions": "POST",
		"/delete-user": "POST"
	};
	const atomListeners = [{
		signal: "$sessionSignal",
		matcher(path) {
			return path === "/sign-out" || path === "/update-user" || path === "/update-session" || path === "/sign-up/email" || path === "/sign-in/email" || path === "/delete-user" || path === "/verify-email" || path === "/revoke-sessions" || path === "/revoke-session" || path === "/revoke-other-sessions" || path === "/change-email" || path === "/change-password";
		},
		callback(path) {
			if (path === "/sign-out") broadcastSessionUpdate("signout");
			else if (path === "/update-user" || path === "/update-session") broadcastSessionUpdate("updateUser");
		}
	}];
	for (const plugin of plugins) {
		if (plugin.getAtoms) Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
		if (plugin.pathMethods) Object.assign(pluginPathMethods, plugin.pathMethods);
		if (plugin.atomListeners) atomListeners.push(...plugin.atomListeners);
	}
	const $store = {
		notify: (signal) => {
			pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
		},
		listen: (signal, listener) => {
			pluginsAtoms[signal].subscribe(listener);
		},
		atoms: pluginsAtoms
	};
	for (const plugin of plugins) if (plugin.getActions) pluginsActions = defu(plugin.getActions?.($fetch, $store, options) ?? {}, pluginsActions);
	return {
		get baseURL() {
			return baseURL;
		},
		pluginsActions,
		pluginsAtoms,
		pluginPathMethods,
		atomListeners,
		$fetch,
		$store
	};
};
function isAtom(value) {
	return typeof value === "object" && value !== null && "get" in value && typeof value.get === "function" && "lc" in value && typeof value.lc === "number";
}
function getMethod(path, knownPathMethods, args) {
	const method = knownPathMethods[path];
	const { fetchOptions, query: _query, ...body } = args || {};
	if (method) return method;
	if (fetchOptions?.method) return fetchOptions.method;
	if (body && Object.keys(body).length > 0) return "POST";
	return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
	function createProxy(path = []) {
		return new Proxy(function() {}, {
			get(_, prop) {
				if (typeof prop !== "string") return;
				if (prop === "then" || prop === "catch" || prop === "finally") return;
				const fullPath = [...path, prop];
				let current = routes;
				for (const segment of fullPath) if (current && typeof current === "object" && segment in current) current = current[segment];
				else {
					current = void 0;
					break;
				}
				if (typeof current === "function") return current;
				if (isAtom(current)) return current;
				return createProxy(fullPath);
			},
			apply: async (_, __, args) => {
				const routePath = "/" + path.map(toKebabCase).join("/");
				const arg = args[0] || {};
				const fetchOptions = args[1] || {};
				const { query, fetchOptions: argFetchOptions, ...body } = arg;
				const options = {
					...fetchOptions,
					...argFetchOptions
				};
				const method = getMethod(routePath, knownPathMethods, arg);
				return await client(routePath, {
					...options,
					body: method === "GET" ? void 0 : {
						...body,
						...options?.body || {}
					},
					query: query || options?.query,
					method,
					async onSuccess(context) {
						await options?.onSuccess?.(context);
						if (!atomListeners || options.disableSignal) return;
						/**
						* We trigger listeners
						*/
						const matches = atomListeners.filter((s) => s.matcher(routePath));
						if (!matches.length) return;
						const visited = /* @__PURE__ */ new Set();
						for (const match of matches) {
							const signal = atoms[match.signal];
							if (!signal) return;
							if (visited.has(match.signal)) continue;
							visited.add(match.signal);
							/**
							* To avoid race conditions we set the signal in a setTimeout
							*/
							const val = signal.get();
							setTimeout(() => {
								signal.set(!val);
							}, 10);
							match.callback?.(routePath);
						}
					}
				});
			}
		});
	}
	return createProxy();
}
/**
* Subscribe to store changes and get store's value.
*
* Can be used with store builder too.
*
* ```js
* import { useStore } from 'nanostores/react'
*
* import { router } from '../store/router'
*
* export const Layout = () => {
*   let page = useStore(router)
*   if (page.route === 'home') {
*     return <HomePage />
*   } else {
*     return <Error404 />
*   }
* }
* ```
*
* @param store Store instance.
* @returns Store value.
*/
function useStore(store, options = {}) {
	const snapshotRef = (0, import_react.useRef)(store.get());
	const { keys, deps = [store, keys] } = options;
	const subscribe = (0, import_react.useCallback)((onChange) => {
		const emitChange = (value) => {
			if (snapshotRef.current === value) return;
			snapshotRef.current = value;
			onChange();
		};
		emitChange(store.value);
		if (keys?.length) return listenKeys(store, keys, emitChange);
		return store.listen(emitChange);
	}, deps);
	const get = () => snapshotRef.current;
	return (0, import_react.useSyncExternalStore)(subscribe, get, get);
}
function getAtomKey(str) {
	return `use${capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
	const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, $store, atomListeners } = getClientConfig(options);
	const resolvedHooks = {};
	for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[getAtomKey(key)] = () => useStore(value);
	return createDynamicPathProxy({
		...pluginsActions,
		...resolvedHooks,
		$fetch,
		$store
	}, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
var authClient = createAuthClient();
var dateFormatter = new Intl.DateTimeFormat("pt-BR", {
	dateStyle: "short",
	timeStyle: "short",
	timeZone: "America/Sao_Paulo"
});
function Home() {
	const data = Route.useLoaderData();
	const router = useRouter();
	const [phase, setPhase] = (0, import_react.useState)("Todos");
	const [status, setStatus] = (0, import_react.useState)("Próximos");
	const [showPlacar, setShowPlacar] = (0, import_react.useState)(false);
	const [teamQuery, setTeamQuery] = (0, import_react.useState)("");
	const normalizedQuery = normalizeText(teamQuery.trim());
	const isSearching = normalizedQuery.length > 0;
	let filteredMatches;
	if (isSearching) filteredMatches = data.matches.filter((match) => matchMatchesTeam(match, normalizedQuery));
	else {
		filteredMatches = data.matches.filter((match) => matchMatchesPhase(match, phase)).filter((match) => matchMatchesStatus(match, status));
		if (status === "Finalizados") filteredMatches.reverse();
	}
	const teamOptions = Array.from(new Set(data.matches.flatMap((match) => [match.homeTeam, match.awayTeam]))).sort((a, b) => a.localeCompare(b));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen px-4 py-6 text-[var(--sea-ink)] sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-7xl flex-col gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "island-shell overflow-hidden rounded-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pitch-band grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "green",
									className: "gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-3.5" }), "Copa 2026"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "canary",
									children: "Bolão CFFDP"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "display-title text-4xl font-bold leading-tight text-[var(--sea-ink)] sm:text-5xl",
								children: "Bolão CFFDP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-base font-medium text-[var(--sea-ink-soft)]",
								children: "Palpites entre amigos, ranking ao vivo e aquela pressão boa de acompanhar a Copa inteira até a final."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionBox, {
							user: data.user,
							onDone: () => router.invalidate()
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "island-kicker",
										children: "Palpites"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-bold",
										children: "Tabela da Copa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm font-semibold text-[var(--sea-ink-soft)]",
										children: [
											filteredMatches.length,
											" de ",
											data.matches.length,
											" jogos"
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										!data.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											className: "gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }), "Entre para salvar"]
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/guru",
											className: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-4" }), "Guru do Futebol"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/x1",
											className: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" }), "Ranking X1"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/missoes",
											className: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }), "Missões"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/cartas",
											className: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white",
											children: "🃏 Cartas"
										}),
										data.user?.isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin",
											className: "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white/80 px-4 text-sm font-semibold text-[var(--sea-ink)] shadow-sm hover:bg-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), "Admin"]
										}) : null
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--sea-ink-soft)]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "search",
										list: "team-options",
										value: teamQuery,
										onChange: (event) => setTeamQuery(event.target.value),
										placeholder: "Buscar time (ex: Brasil) — todos os jogos dele",
										"aria-label": "Buscar jogos por time",
										className: "h-11 pl-9"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
										id: "team-options",
										children: teamOptions.map((team) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: team }, team))
									})
								]
							}),
							isSearching ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 rounded-lg border border-[var(--line)] bg-white/65 p-2 pl-3 text-sm font-semibold text-[var(--sea-ink-soft)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									filteredMatches.length,
									" jogo(s) com “",
									teamQuery.trim(),
									"”"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setTeamQuery(""),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), "Limpar busca"]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseTabs, {
								activePhase: phase,
								onChange: setPhase,
								data
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusTabs, {
								activeStatus: status,
								onChange: setStatus,
								data
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4",
								children: filteredMatches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-lg border border-[var(--line)] bg-white/65 p-6 text-center text-sm font-semibold text-[var(--sea-ink-soft)]",
									children: isSearching ? "Nenhum jogo encontrado para esse time." : "Nenhum jogo neste filtro."
								}) : filteredMatches.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchCard, {
									match,
									canGuess: Boolean(data.user),
									players: data.players,
									currentUserId: data.user?.id ?? null,
									userAvailableCards: data.userAvailableCards
								}, match.id))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "flex flex-col gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scoreboard, { data }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesCard, {})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setShowPlacar(true),
				className: "fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--sea-ink)] px-5 py-3 text-sm font-bold text-white shadow-lg lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }), "Ver placar"]
			}),
			showPlacar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 lg:hidden",
				onClick: () => setShowPlacar(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[85vh] w-full max-w-lg overflow-y-auto",
					onClick: (event) => event.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "icon",
							"aria-label": "Fechar placar",
							onClick: () => setShowPlacar(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scoreboard, { data })]
				})
			}) : null
		]
	});
}
function matchMatchesPhase(match, phase) {
	if (phase === "Todos") return true;
	if (phase === "Grupos") return match.round === "Fase de grupos";
	if (phase === "16 avos") return match.round === "16 avos de final";
	if (phase === "Oitavas") return match.round === "Oitavas de final";
	if (phase === "Quartas") return match.round === "Quartas de final";
	return [
		"Semifinal",
		"Disputa de 3º lugar",
		"Final"
	].includes(match.round);
}
function normalizeText(value) {
	return value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
function matchMatchesTeam(match, normalizedQuery) {
	return normalizeText(match.homeTeam).includes(normalizedQuery) || normalizeText(match.awayTeam).includes(normalizedQuery);
}
function matchMatchesStatus(match, status) {
	if (status === "Todos") return true;
	if (status === "Finalizados") return match.resultStatus === "confirmed";
	return match.resultStatus !== "confirmed";
}
function StatusTabs({ activeStatus, onChange, data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2 rounded-lg border border-[var(--line)] bg-white/65 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mr-1 hidden items-center gap-1.5 px-2 text-sm font-bold text-[var(--sea-ink-soft)] sm:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "size-4" }), "Status"]
		}), [
			"Próximos",
			"Finalizados",
			"Todos"
		].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: activeStatus === status ? "default" : "ghost",
			size: "sm",
			onClick: () => onChange(status),
			title: `Filtrar por ${status}`,
			children: [status, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[11px] font-black",
				children: data.matches.filter((match) => matchMatchesStatus(match, status)).length
			})]
		}, status))]
	});
}
function PhaseTabs({ activePhase, onChange, data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2 rounded-lg border border-[var(--line)] bg-white/65 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mr-1 hidden items-center gap-1.5 px-2 text-sm font-bold text-[var(--sea-ink-soft)] sm:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, { className: "size-4" }), "Fase"]
		}), [
			"Todos",
			"Grupos",
			"16 avos",
			"Oitavas",
			"Quartas",
			"Finais"
		].map((phase) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: activePhase === phase ? "default" : "ghost",
			size: "sm",
			onClick: () => onChange(phase),
			title: `Filtrar por ${phase}`,
			children: [phase, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[11px] font-black",
				children: data.matches.filter((match) => matchMatchesPhase(match, phase)).length
			})]
		}, phase))]
	});
}
function SessionBox({ user, onDone }) {
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserBox, {
		user,
		onDone
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCard, { onDone });
}
function UserBox({ user, onDone }) {
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)(user.name);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function handleSaveName() {
		const trimmed = name.trim();
		if (!trimmed) {
			setError("Informe um nome.");
			return;
		}
		setError(null);
		setIsSaving(true);
		try {
			const result = await authClient.updateUser({ name: trimmed });
			if (result.error) {
				setError(result.error.message || "Não foi possível salvar o nome.");
				return;
			}
			setIsEditing(false);
			onDone();
		} catch {
			setError("Não foi possível salvar o nome.");
		} finally {
			setIsSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2 rounded-lg border border-white/50 bg-white/70 p-3 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--sea-ink)] text-sm font-bold text-white",
					children: user.name.charAt(0).toUpperCase() || "U"
				}),
				isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (event) => setName(event.target.value),
					"aria-label": "Seu nome",
					autoFocus: true,
					maxLength: 60,
					className: "h-10 flex-1"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-bold",
						children: user.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-[var(--sea-ink-soft)]",
						children: user.email
					})]
				}),
				isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon",
					"aria-label": "Salvar nome",
					title: "Salvar nome",
					disabled: isSaving,
					onClick: handleSaveName,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					size: "icon",
					"aria-label": "Cancelar",
					title: "Cancelar",
					disabled: isSaving,
					onClick: () => {
						setName(user.name);
						setError(null);
						setIsEditing(false);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					size: "icon",
					"aria-label": "Editar nome",
					title: "Editar nome",
					onClick: () => setIsEditing(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					size: "icon",
					"aria-label": "Sair",
					title: "Sair",
					onClick: async () => {
						await authClient.signOut();
						onDone();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {})
				})] })
			]
		}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-md border border-red-500/30 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700",
			children: error
		}) : null]
	});
}
function AuthCard({ onDone }) {
	const [mode, setMode] = (0, import_react.useState)("sign-in");
	const [error, setError] = (0, import_react.useState)(null);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const isSignUp = mode === "sign-up";
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);
		const formData = new FormData(event.currentTarget);
		const name = String(formData.get("name") || "").trim();
		const email = String(formData.get("email") || "").trim();
		const password = String(formData.get("password") || "");
		try {
			const result = isSignUp ? await authClient.signUp.email({
				name,
				email,
				password
			}) : await authClient.signIn.email({
				email,
				password
			});
			if (result.error) {
				setError(result.error.message || "Não foi possível autenticar.");
				return;
			}
			onDone();
		} finally {
			setIsSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "w-full max-w-md bg-white/82",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "p-4 pb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: isSignUp ? "Criar conta" : "Entrar no bolão"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 rounded-md border border-[var(--line)] bg-white/70 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: mode === "sign-in" ? "default" : "ghost",
						size: "sm",
						onClick: () => setMode("sign-in"),
						children: "Entrar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: mode === "sign-up" ? "default" : "ghost",
						size: "sm",
						onClick: () => setMode("sign-up"),
						children: "Criar"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-4 pt-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3",
				onSubmit: handleSubmit,
				children: [
					isSignUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Nome"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							name: "name",
							autoComplete: "name",
							required: true
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							name: "email",
							type: "email",
							autoComplete: "email",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Senha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							name: "password",
							type: "password",
							minLength: 8,
							autoComplete: isSignUp ? "new-password" : "current-password",
							required: true
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: isSubmitting,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {}), isSubmitting ? "Salvando..." : isSignUp ? "Criar conta" : "Entrar"]
					})
				]
			})
		})]
	});
}
function MatchCard({ match, canGuess, players, currentUserId, userAvailableCards = [] }) {
	const router = useRouter();
	const saveGuessFn = useServerFn(saveGuess);
	const useCardFn = useServerFn(useCard);
	const [error, setError] = (0, import_react.useState)(null);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isUsingCard, setIsUsingCard] = (0, import_react.useState)(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		const formData = new FormData(event.currentTarget);
		const homeScore = Number(formData.get("homeScore"));
		const awayScore = Number(formData.get("awayScore"));
		if (!Number.isInteger(homeScore) || !Number.isInteger(awayScore)) {
			setError("Informe placares válidos.");
			return;
		}
		setIsSaving(true);
		try {
			await saveGuessFn({ data: {
				matchId: match.id,
				homeScore,
				awayScore
			} });
			await router.invalidate();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Não foi possível salvar.");
		} finally {
			setIsSaving(false);
		}
	}
	async function handleUseCard(instanceId) {
		setIsUsingCard(true);
		try {
			await useCardFn({ data: {
				cardInstanceId: instanceId,
				matchId: match.id
			} });
			await router.invalidate();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao usar carta.");
		} finally {
			setIsUsingCard(false);
		}
	}
	const isLocked = new Date(match.startsAt).getTime() <= Date.now();
	const hasResult = match.homeScore !== null && match.awayScore !== null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "feature-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "gap-3 pb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							match.matchNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								children: ["Jogo ", match.matchNumber]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: match.group
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: hasResult ? "green" : "canary",
								children: hasResult ? "Encerrado" : "Aberto"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-sm font-semibold text-[var(--sea-ink-soft)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }), dateFormatter.format(new Date(match.startsAt))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamName, {
							align: "right",
							children: match.homeTeam
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-md border border-[var(--line)] bg-white/70 px-3 py-2 text-sm font-black",
							children: "vs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamName, { children: match.awayTeam })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
					match.round,
					" · ",
					match.venue
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
			hasResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-md border border-[var(--line)] bg-white/70 p-3 text-center text-sm font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Resultado: ",
					match.homeScore,
					" x ",
					match.awayScore
				] }), match.oddsMultiplier && match.oddsMultiplier >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 inline-block rounded bg-amber-100 px-1.5 py-0.5 text-xs font-black text-amber-700",
					title: "Placar raro! Odds elevadas para quem acertou.",
					children: match.oddsMultiplier === 6 ? "🔥 Ninguém acertou! 6x" : `🔥 ${match.oddsMultiplier}x odds`
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-3 sm:grid-cols-[1fr_auto]",
				onSubmit: handleSubmit,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_auto_1fr] items-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreInput, {
							label: match.homeTeam,
							name: "homeScore",
							defaultValue: match.guess?.homeScore,
							disabled: !canGuess || isLocked
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pb-2 text-center text-lg font-black",
							children: "x"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreInput, {
							label: match.awayTeam,
							name: "awayScore",
							defaultValue: match.guess?.awayScore,
							disabled: !canGuess || isLocked
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: !canGuess || isLocked || isSaving,
					className: "self-end",
					children: [isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {}), isLocked ? "Bloqueado" : isSaving ? "Salvando..." : "Salvar"]
				})]
			}),
			match.guess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm font-semibold text-[var(--sea-ink-soft)]",
				children: [
					"Seu palpite: ",
					match.guess.homeScore,
					" x ",
					match.guess.awayScore,
					hasResult ? ` · ${match.guess.points} ponto(s)${match.oddsMultiplier && match.oddsMultiplier > 1 && match.guess.points > 2 ? ` (odds ${match.oddsMultiplier}x)` : ""}` : ""
				]
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700",
				children: error
			}) : null,
			currentUserId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X1Section, {
				match,
				players,
				currentUserId,
				isLocked,
				hasResult
			}) : null,
			currentUserId && !isLocked && !hasResult ? userAvailableCards.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSection, {
				availableCards: userAvailableCards,
				usedCards: match.cardsUsed,
				onUseCard: handleUseCard,
				isUsingCard
			}) : null : match.cardsUsed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-1.5 border-t border-[var(--line)] pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "w-full text-xs font-bold text-[var(--sea-ink-soft)]",
					children: "🃏 Cartas usadas"
				}), match.cardsUsed.map((cardId) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700",
					children: ["🃏 ", cardId]
				}, cardId))]
			}) : null
		] })]
	});
}
var CARD_RARITY_COLORS = {
	common: "bg-zinc-100 text-zinc-700 border-zinc-200",
	rare: "bg-blue-100 text-blue-700 border-blue-200",
	legendary: "bg-amber-100 text-amber-700 border-amber-300"
};
function CardSection({ availableCards, usedCards, onUseCard, isUsingCard }) {
	const alreadyUsedOnThisMatch = usedCards.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 border-t border-[var(--line)] pt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs font-bold text-[var(--sea-ink-soft)]",
			children: "🃏 Cartas"
		}), alreadyUsedOnThisMatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children: usedCards.map((cardId) => {
				const card = availableCards.find((c) => c.cardId === cardId) ?? {
					icon: "🃏",
					name: cardId,
					rarity: "common"
				};
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `text-xs rounded border px-2 py-0.5 font-medium ${CARD_RARITY_COLORS[card.rarity]}`,
					children: [
						card.icon,
						" ",
						card.name,
						" ✓"
					]
				}, cardId);
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children: availableCards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onUseCard(card.instanceId),
				disabled: isUsingCard,
				className: `text-xs rounded border px-2 py-1 font-medium transition-opacity hover:opacity-80 disabled:opacity-50 ${CARD_RARITY_COLORS[card.rarity]}`,
				title: card.name,
				children: [
					card.icon,
					" ",
					card.name
				]
			}, card.instanceId))
		})]
	});
}
function X1Section({ match, players, currentUserId, isLocked, hasResult }) {
	const router = useRouter();
	const createFn = useServerFn(createX1Challenge);
	const respondFn = useServerFn(respondX1Challenge);
	const cancelFn = useServerFn(cancelX1Challenge);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [opponentId, setOpponentId] = (0, import_react.useState)("");
	const [stake, setStake] = (0, import_react.useState)(1);
	const [error, setError] = (0, import_react.useState)(null);
	const [isBusy, setIsBusy] = (0, import_react.useState)(false);
	const x1 = match.x1;
	const opponents = players.filter((player) => player.id !== currentUserId);
	async function run(action) {
		setError(null);
		setIsBusy(true);
		try {
			await action();
			setOpen(false);
			setOpponentId("");
			setStake(1);
			await router.invalidate();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Não foi possível.");
		} finally {
			setIsBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 border-t border-[var(--line)] pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center gap-1.5 text-sm font-bold text-[var(--sea-ink-soft)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" }), "X1"]
			}),
			x1?.accepted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-semibold",
				children: x1.accepted.outcome === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Duelo com ",
					x1.accepted.opponentName,
					" · ",
					x1.accepted.stake,
					" pt(s) em jogo"
				] }) : x1.accepted.outcome === "won" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-emerald-700",
					children: [
						"Você venceu o X1 vs ",
						x1.accepted.opponentName,
						" (+",
						x1.accepted.delta,
						" pts)"
					]
				}) : x1.accepted.outcome === "lost" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-red-700",
					children: [
						"Você perdeu o X1 vs ",
						x1.accepted.opponentName,
						" (",
						x1.accepted.delta,
						" pts)"
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"X1 vs ",
					x1.accepted.opponentName,
					" empatou (push)"
				] })
			}) : x1?.incoming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2",
					children: [
						x1.incoming.challengerName,
						" te desafiou · ",
						x1.incoming.stake,
						" pt(s)"
					]
				}), isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-[var(--sea-ink-soft)]",
					children: "Jogo já começou."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						disabled: isBusy,
						onClick: () => run(() => respondFn({ data: {
							challengeId: x1.incoming.id,
							accept: true
						} })),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), "Aceitar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						disabled: isBusy,
						onClick: () => run(() => respondFn({ data: {
							challengeId: x1.incoming.id,
							accept: false
						} })),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), "Recusar"]
					})]
				})]
			}) : x1?.outgoing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 rounded-md border border-[var(--line)] bg-white/70 p-3 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Aguardando ",
					x1.outgoing.opponentName,
					" · ",
					x1.outgoing.stake,
					" pt(s)"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					size: "sm",
					disabled: isBusy,
					onClick: () => run(() => cancelFn({ data: { challengeId: x1.outgoing.id } })),
					children: "Cancelar"
				})]
			}) : isLocked || hasResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-[var(--sea-ink-soft)]",
				children: "Sem X1 neste jogo."
			}) : opponents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-[var(--sea-ink-soft)]",
				children: "Nenhum oponente disponível ainda."
			}) : open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 rounded-md border border-[var(--line)] bg-white/70 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: opponentId,
						onChange: (event) => setOpponentId(event.target.value),
						className: "h-10 rounded-md border border-[var(--line)] bg-white px-3 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Escolha o oponente"
						}), opponents.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: player.id,
							children: player.name
						}, player.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: stake,
						onChange: (event) => setStake(Number(event.target.value)),
						className: "h-10 rounded-md border border-[var(--line)] bg-white px-3 text-sm font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 1,
								children: "1 ponto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 2,
								children: "2 pontos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 3,
								children: "3 pontos"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							disabled: isBusy || !opponentId,
							onClick: () => run(() => createFn({ data: {
								matchId: match.id,
								opponentId,
								stake
							} })),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, {}), "Enviar desafio"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							disabled: isBusy,
							onClick: () => setOpen(false),
							children: "Cancelar"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "secondary",
				size: "sm",
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, {}), "Desafiar X1"]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-medium text-red-700",
				children: error
			}) : null
		]
	});
}
function ScoreInput({ label, name, defaultValue, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: `${name}-${label}`,
			className: "truncate text-xs",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: `${name}-${label}`,
			name,
			type: "number",
			inputMode: "numeric",
			min: 0,
			max: 30,
			defaultValue: defaultValue ?? "",
			disabled,
			className: "h-12 text-center text-lg font-black",
			required: true
		})]
	});
}
function TeamName({ align, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: align === "right" ? "truncate text-right text-lg font-black" : "truncate text-lg font-black",
		title: children,
		children
	});
}
function Scoreboard({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "island-kicker",
			children: "Placar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Ranking" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-7 text-yellow-600" })]
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
		className: "grid gap-3",
		children: data.standings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-[var(--sea-ink-soft)]",
			children: "O ranking aparece quando a primeira conta for criada."
		}) : data.standings.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 rounded-md border border-[var(--line)] bg-white/70 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PositionDelta, { delta: player.delta }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-9 items-center justify-center rounded-full bg-[var(--sand)] font-black",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PositionBadge, { position: player.position })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-bold",
						children: player.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium text-[var(--sea-ink-soft)]",
						children: [
							player.guessesCount,
							" palpite(s) · ",
							player.exactHits,
							" exato(s)"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-black",
						children: player.points
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-[var(--sea-ink-soft)]",
						children: "pts"
					})]
				})
			]
		}, player.id))
	})] });
}
function PositionBadge({ position }) {
	if (position <= 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, {
		className: `size-5 ${position === 1 ? "text-yellow-500" : position === 2 ? "text-gray-400" : "text-amber-700"}`,
		"aria-label": `${position}º`
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: position });
}
function PositionDelta({ delta }) {
	if (delta > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
		className: "size-4 text-emerald-600",
		"aria-label": "Subiu posições"
	});
	if (delta < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, {
		className: "size-4 text-red-600",
		"aria-label": "Caiu posições"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block w-4 text-center text-[var(--sea-ink-soft)]",
		children: "·"
	});
}
function RulesCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "border-yellow-500/30 bg-yellow-100/45",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "island-kicker",
				children: "Regras"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Pontuação" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-7 text-emerald-700" })]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-md bg-white/70 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "size-5 text-emerald-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						children: "Acertar o palpite = 2 pontos"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-md bg-white/70 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-5 text-yellow-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						children: "Acertar o placar exato = 1 ponto extra (com odds)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-md bg-white/70 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-5 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						children: "Placar raro = ponto extra multiplicado (até 6x)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-md bg-white/70 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-5 text-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						children: "X1 tem ranking próprio — não afeta o ranking geral"
					})]
				})
			]
		})]
	});
}
//#endregion
export { Home as component };
