"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portainerStackRedeploy = void 0;
const effect_1 = require("effect");
const Equal_1 = require("effect/Equal");
const makeApiClient_1 = require("./makeApiClient");
const Effect_logString_1 = require("./Effect_logString");
const String_UrlHost_1 = require("./String_UrlHost");
const Stack_1 = require("./Stack");
const StackFileResponse_1 = require("./StackFileResponse");
/**
 * @url https://github.com/wirgen/portainer-stack-redeploy-action/tree/v1.1
 * @url https://app.swaggerhub.com/apis/portainer/portainer-ce/2.27.1#/stacks/StackUpdate
 */
const portainerStackRedeploy = async (params) => {
    console.log('⏳ Running Portainer Deploy Script...');
    const host = (0, effect_1.pipe)(params.host, effect_1.String.trim, effect_1.String.replace(/\/$/, ''), effect_1.Schema.decodeUnknownEither(String_UrlHost_1.String_UrlHost), effect_1.Either.getOrThrow);
    const apiClient = (0, makeApiClient_1.makeApiClient)({
        host: `${host}/api`,
        accessToken: params.accessToken,
    });
    console.log('🔄 Getting Stack...');
    const stack = await (0, effect_1.pipe)(apiClient.get('/stacks'), effect_1.Effect.mapError(effect_1.Effect.logError), effect_1.Effect.flatMap(effect_1.Schema.decodeUnknown(Stack_1.Stacks)), effect_1.Effect.flatMap(effect_1.Array.findFirst((0, effect_1.flow)(effect_1.Struct.get('Name'), (0, Equal_1.equals)(params.stackName)))), effect_1.Effect.runPromise).catch((error) => {
        console.error(error);
        process.exit(1);
    });
    console.log('🔄 Deploying Stack...');
    await (0, effect_1.pipe)(apiClient.get(`/stacks/${stack.Id}/file`), effect_1.Effect.flatMap(effect_1.Schema.decodeUnknown(StackFileResponse_1.StackFileResponse)), effect_1.Effect.map(effect_1.Struct.get('StackFileContent')), effect_1.Effect.tap((0, Effect_logString_1.Effect_logString)('💾 Updating Stack...')), effect_1.Effect.flatMap((stackFile) => apiClient.put(`/stacks/${stack.Id}?endpointId=${stack.EndpointId}`, {
        stackFileContent: stackFile,
        pullImage: true,
    })), effect_1.Effect.tap((0, Effect_logString_1.Effect_logString)('💾 Stack updated')), effect_1.Effect.tap((0, Effect_logString_1.Effect_logString)('✋ Stopping Stack...')), effect_1.Effect.flatMap(() => apiClient.post(`/stacks/${stack.Id}/stop?endpointId=${stack.EndpointId}`)), effect_1.Effect.tap((0, Effect_logString_1.Effect_logString)('✋ Stack stopped')), effect_1.Effect.tap((0, Effect_logString_1.Effect_logString)('🚀 Starting Stack...')), effect_1.Effect.flatMap(() => apiClient.post(`/stacks/${stack.Id}/start?endpointId=${stack.EndpointId}`)), effect_1.Effect.tap((0, Effect_logString_1.Effect_logString)('🚀 Stack deployed')), effect_1.Effect.runPromise);
    console.log('✅ Done!');
};
exports.portainerStackRedeploy = portainerStackRedeploy;
