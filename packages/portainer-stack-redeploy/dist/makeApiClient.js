"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApiClient = void 0;
const effect_1 = require("effect");
const EffectFetch_1 = require("./EffectFetch");
const makeApiClient = ({ host, accessToken, }) => ({
    get: (uri) => {
        console.log(`${host}${uri}`);
        console.log({
            method: 'GET',
            headers: { 'X-API-Key': accessToken },
        });
        return EffectFetch_1.EffectFetch.fetchJson(`${host}${uri}`, {
            method: 'GET',
            headers: { 'X-API-Key': accessToken },
        });
    },
    post: (uri, body) => EffectFetch_1.EffectFetch.fetchJson(`${host}${uri}`, {
        method: 'POST',
        headers: { 'X-API-Key': accessToken },
        ...(effect_1.Predicate.isNullable(body) ? {} : { body: JSON.stringify(body) }),
    }),
    put: (uri, body) => EffectFetch_1.EffectFetch.fetchJson(`${host}${uri}`, {
        method: 'PUT',
        headers: { 'X-API-Key': accessToken },
        body: JSON.stringify(body),
    }),
});
exports.makeApiClient = makeApiClient;
