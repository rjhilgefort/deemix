"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackFileResponse = void 0;
const effect_1 = require("effect");
exports.StackFileResponse = effect_1.Schema.Struct({
    StackFileContent: effect_1.Schema.String,
});
