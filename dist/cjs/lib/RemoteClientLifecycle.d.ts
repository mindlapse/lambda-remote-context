export interface RemoteClientLifecycle<T> {
    init: () => Promise<T>;
    cleanUp?: (client: T) => Promise<void>;
}
