"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stacks = exports.Stack = void 0;
const effect_1 = require("effect");
exports.Stack = effect_1.Schema.Struct({
    Id: effect_1.Schema.Number,
    Name: effect_1.Schema.String,
    EndpointId: effect_1.Schema.Number,
});
exports.Stacks = effect_1.Schema.Array(exports.Stack);
