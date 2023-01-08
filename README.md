# lambda-remote-context

install with `npm i lambda-remote-context`

Provides two classes:
- `RemoteContext` (lifecycle management for RemoteClient)
- `RemoteClient` (a base class for wrapping third party clients)

A subclass of `RemoteClient` is constructed with async `init` and `cleanUp` methods.

Typically you would create a subclasses of `RemoteClient`, say `AliceRemoteClient` and
`BobRemoteClient`, to wrap third party adapters needed by your serverless function (e.g. Redis, Prisma, Mastodon, etc).  You can construct these clients and have their lifecycle
managed by `RemoteContext` as follows:

```javascript

const arc = new AliceRemoteClient({
    init: async () => console.log('do initialization work'),
    cleanUp: async () => console.log('do cleanup tasks')
})

const brc = new BobRemoteClient({
    init: async () => console.log('do initialization work'),
    cleanUp: async () => console.log('do cleanup tasks')
})

const remoteContext = new RemoteContext()
try {
    await remoteContext
        .addClient(arc)
        .addClient(brc)
        .initialize();

    // Use the RemoteClients in your function to communicate
    // with external resources.  Each RemoteClient should wrap a 
    // client from a third party library.

} finally {
    await remoteContext.cleanUp()
}

```

### Important Note: 
Initalisation and cleanup promises all happen in parallel (i.e. in random order) and the function blocks until all are settled.

If one or more of the settled promises were rejected, then only the `.reason` from the rejected promise of the earliest-added client is thrown.
