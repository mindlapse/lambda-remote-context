import { RemoteClientLifecycle } from './RemoteClientLifecycle';
export default abstract class RemoteClient<T> {
    private lifecycle;
    private client?;
    constructor(lifecycle: RemoteClientLifecycle<T>);
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
