"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.String_UrlHost = void 0;
const effect_1 = require("effect");
exports.String_UrlHost = effect_1.Schema.TemplateLiteral(effect_1.Schema.Literal('https://', 'http://'), effect_1.Schema.String, '.', effect_1.Schema.String).pipe(effect_1.Schema.brand('UrlHost'));
