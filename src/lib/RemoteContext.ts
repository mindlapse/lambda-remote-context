import RemoteClient from './RemoteClient.js'

/**
 * Provides lifecycle hooks for RemoteClient instances added via addClient(client):
 *
 * - initialise() which calls client.initializeClient() on each client
 *
 * - cleanUp() which calls client.cleanUp() on each client.
 *
 */
export default class RemoteContext {
    private clients: RemoteClient<any>[] = []

    /**
     * Add a client to have this RemoteContext manage initialisation and cleanup.
     * (chainable method)
     */
    addClient(client: RemoteClient<any>): RemoteContext {
        this.clients.push(client)
        return this
    }

    /**
     * Initialize all clients, synchronously in the order the were added
     */
    async initialize() {
        await this.runAllThrowFirst((client) => client.initializeClient())
    }

    /**
     * Cleanup all RemoteClients, in parallel.
     * @throws The error from the earliest failed cleanup in the list
     */
    async cleanUp() {
        await this.runAllThrowFirst((client) => client.cleanUp())
    }

    private runAllThrowFirst = async (
        onClient: (client: RemoteClient<any>) => Promise<void>
    ) => {
        // Collect cleanup ops
        const ops = this.clients.map((client) => onClient(client))

        // Execute all and wait until all cleanup ops are complete
        const outcomes = await Promise.allSettled(ops)

        // Verify all cleanups were successful, otherwise throw
        for (let outcome of outcomes) {
            if (outcome.status === 'rejected') {
                throw outcome.reason
            }
        }
    }
}
