"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect_logString = void 0;
const effect_1 = require("effect");
const Effect_logString = (message) => (x) => {
    console.log(message);
    return effect_1.Effect.succeed(x);
};
exports.Effect_logString = Effect_logString;
