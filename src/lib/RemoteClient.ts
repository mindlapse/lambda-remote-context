import { RemoteClientConfig } from "./RemoteClientConfig.js"

/*
Base class for RemoteClients used with RemoteContext

Each RemoteClient:
- is intended to wrap a third party connection (e.g. to Redis, Prisma, etc)
- has lifecycle hooks for init and cleanup
- is typically added to a RemoteContext which can handle convenient 
  init and cleanup of all RemoteClients

*/
export default abstract class RemoteClient<T> {
    private config: RemoteClientConfig<T>
    private client?: T

    constructor(config: RemoteClientConfig<T>) {
        this.config = config
    }

    /**
     * Initialize the client
     */
    async initializeClient() {
        this.client = await this.config.init?.()
    }

    /**
     * Get client
     * @returns An instance of the client
     * @throws Error if the client was not initialized.
     */
    getClient(): T {
        if (!this.client) throw Error('Not initialized')
        return this.client
    }

    /**
     * Cleanup any resources, connections, etc
     */
    async cleanUp() {
        if (this.client) {
            await this.config?.cleanUp?.(this.client!)
        }
    }
}