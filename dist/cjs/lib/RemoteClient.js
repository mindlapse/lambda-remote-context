"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Base class for RemoteClients used with RemoteContext

Each RemoteClient:
- is intended to wrap a third party connection (e.g. to Redis, Prisma, etc)
- has lifecycle hooks for init and cleanup
- is typically added to a RemoteContext which can handle convenient
  init and cleanup of all RemoteClients

*/
class RemoteClient {
    constructor(lifecycle) {
        this.lifecycle = lifecycle;
    }
    /**
     * Initialize the client
     */
    initializeClient() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.client = yield ((_b = (_a = this.lifecycle).init) === null || _b === void 0 ? void 0 : _b.call(_a));
        });
    }
    /**
     * Get client
     * @returns An instance of the client
     * @throws Error if the client was not initialized.
     */
    getClient() {
        if (!this.client)
            throw Error('Not initialized');
        return this.client;
    }
    /**
     * Cleanup any resources, connections, etc
     */
    cleanUp() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield ((_b = (_a = this.lifecycle) === null || _a === void 0 ? void 0 : _a.cleanUp) === null || _b === void 0 ? void 0 : _b.call(_a, this.client));
            }
        });
    }
}
exports.default = RemoteClient;
