export interface RemoteClientConfig<T> {
    init: () => Promise<T>;
    cleanUp?: (client: T) => Promise<void>;
}
