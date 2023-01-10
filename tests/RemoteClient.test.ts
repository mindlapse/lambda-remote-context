import { expect, jest, describe, it, beforeEach } from '@jest/globals'
import RemoteClient from '../src/lib/RemoteClient'
import { RemoteClientLifecycle } from '../src/lib/RemoteClientLifecycle'

class ThirdPartyClient {}

class SampleClient extends RemoteClient<ThirdPartyClient> {
    constructor(config: RemoteClientLifecycle<ThirdPartyClient>) {
        super(config)
    }
}

describe('RemoteClient', () => {
    const tpc = new ThirdPartyClient()
    let cleanUp: jest.Mock<(tpc: ThirdPartyClient) => Promise<void>>
    let remoteClient: SampleClient

    beforeEach(async () => {
        const init = jest.fn<() => Promise<ThirdPartyClient>>(async () => {
            return tpc
        })
        cleanUp = jest.fn<(tpc: ThirdPartyClient) => Promise<void>>()
        remoteClient = new SampleClient({
            init,
            cleanUp,
        })
    })

    it('initializeClient() calls config.init', async () => {
        await remoteClient.initializeClient()
        expect(remoteClient['client']).toBe(tpc)
    })

    it('getClient() throws Error if client is not initialised', () => {
        expect(() => remoteClient.getClient()).toThrowError('Not initialized')
    })

    it('getClient() returns client after initialisation', async () => {
        await remoteClient.initializeClient()
        expect(remoteClient.getClient()).toBe(tpc)
    })

    it('cleanUp() does not invoke cleanUp fn given during construction if the client is not initialised', async () => {
        await remoteClient.cleanUp()
        expect(cleanUp).not.toHaveBeenCalled()
    })

    it('cleanUp() invokes the cleanUp fn from construction if the client was initialised', async () => {
        await remoteClient.initializeClient()
        await remoteClient.cleanUp()
        expect(cleanUp).toHaveBeenCalledWith(tpc)
    })
})
