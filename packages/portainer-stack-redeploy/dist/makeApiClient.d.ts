export declare const makeApiClient: ({ host, accessToken, }: {
    host: string;
    accessToken: string;
}) => {
    get: (uri: string) => import("effect/Effect").Effect<any, unknown, never>;
    post: <T>(uri: string, body?: T) => import("effect/Effect").Effect<any, unknown, never>;
    put: <T>(uri: string, body: T) => import("effect/Effect").Effect<any, unknown, never>;
};
//# sourceMappingURL=makeApiClient.d.ts.map