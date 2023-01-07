import RemoteClient from './RemoteClient';
/**
 * Provides lifecycle hooks for RemoteClient instances added via addClient(client):
 *
 * - initialise() which calls client.initializeClient() on each client
 *
 * - cleanup() which calls client.cleanUp() on each client.
 *
 */
export default class RemoteContext {
    private clients;
    /**
     * Add a client to have this RemoteContext manage initialisation and cleanup.
     * (chainable method)
     */
    addClient(client: RemoteClient<any>): RemoteContext;
    /**
     * Initialize all clients, synchronously in the order the were added
     */
    initialize(): Promise<void>;
    /**
     * Cleanup all RemoteClients, in parallel.
     * @throws The error from the earliest failed cleanup in the list
     */
    cleanUp(): Promise<void>;
    private runAllThrowFirst;
}
