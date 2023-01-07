"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteContext = exports.RemoteClient = void 0;
var RemoteClient_1 = require("./lib/RemoteClient");
Object.defineProperty(exports, "RemoteClient", { enumerable: true, get: function () { return __importDefault(RemoteClient_1).default; } });
var RemoteContext_1 = require("./lib/RemoteContext");
Object.defineProperty(exports, "RemoteContext", { enumerable: true, get: function () { return __importDefault(RemoteContext_1).default; } });
