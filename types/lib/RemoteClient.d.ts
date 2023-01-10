import { RemoteClientConfig } from "./RemoteClientConfig.js";
export default abstract class RemoteClient<T> {
    private config;
    private client?;
    constructor(config: RemoteClientConfig<T>);
    /**
     * Initialize the client
     */
    initializeClient(): Promise<void>;
    /**
     * Get client
     * @returns An instance of the client
     * @throws Error if the client was not initialized.
     */
    getClient(): T;
    /**
     * Cleanup any resources, connections, etc
     */
    cleanUp(): Promise<void>;
}
