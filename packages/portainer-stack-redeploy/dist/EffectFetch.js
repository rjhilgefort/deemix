"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectFetch = void 0;
const effect_1 = require("effect");
const Effect_fetch = (url, options) => effect_1.Effect.tryPromise({
    try: () => fetch(url, options),
    catch: (error) => {
        console.error(error);
        return error;
    },
});
const responseJson = (response) => effect_1.Effect.tryPromise(() => response.json());
const fetchJson = (0, effect_1.flow)(Effect_fetch, effect_1.Effect.flatMap(responseJson));
exports.EffectFetch = {
    fetch: Effect_fetch,
    responseJson,
    fetchJson,
};
