/*
Base class for RemoteClients used with RemoteContext

Each RemoteClient:
- is intended to wrap a third party connection (e.g. to Redis, Prisma, etc)
- has lifecycle hooks for init and cleanup
- is typically added to a RemoteContext which can handle convenient
  init and cleanup of all RemoteClients

*/
export default class RemoteClient {
    lifecycle;
    client;
    constructor(lifecycle) {
        this.lifecycle = lifecycle;
    }
    /**
     * Initialize the client
     */
    async initializeClient() {
        this.client = await this.lifecycle.init?.();
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
    async cleanUp() {
        if (this.client) {
            await this.lifecycle?.cleanUp?.(this.client);
        }
    }
}
