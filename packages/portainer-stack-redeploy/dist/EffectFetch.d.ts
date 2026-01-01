import { Effect } from 'effect';
export declare const EffectFetch: {
    fetch: (url: string | URL | Request, options?: RequestInit) => Effect.Effect<Response, unknown, never>;
    responseJson: (response: Response) => Effect.Effect<any, import("effect/Cause").UnknownException, never>;
    fetchJson: (url: string | URL | Request, options?: RequestInit | undefined) => Effect.Effect<any, unknown, never>;
};
//# sourceMappingURL=EffectFetch.d.ts.map