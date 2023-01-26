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
/**
 * Provides lifecycle hooks for RemoteClient instances added via addClient(client):
 *
 * - initialise() which calls client.initializeClient() on each client
 *
 * - cleanUp() which calls client.cleanUp() on each client.
 *
 */
class RemoteContext {
    constructor() {
        this.clients = [];
        this.runAllThrowFirst = (onClient) => __awaiter(this, void 0, void 0, function* () {
            // Collect cleanup ops
            const ops = this.clients.map((client) => onClient(client));
            // Execute all and wait until all cleanup ops are complete
            const outcomes = yield Promise.allSettled(ops);
            // Verify all cleanups were successful, otherwise throw
            for (let outcome of outcomes) {
                if (outcome.status === 'rejected') {
                    throw outcome.reason;
                }
            }
        });
    }
    /**
     * Add a client to have this RemoteContext manage initialisation and cleanup.
     * (chainable method)
     */
    addClient(client) {
        this.clients.push(client);
        return this;
    }
    /**
     * Initialize all clients, synchronously in the order the were added
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runAllThrowFirst((client) => client.initializeClient());
        });
    }
    /**
     * Cleanup all RemoteClients, in parallel.
     * @throws The error from the earliest failed cleanup in the list
     */
    cleanUp() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.runAllThrowFirst((client) => client.cleanUp());
        });
    }
}
exports.default = RemoteContext;
