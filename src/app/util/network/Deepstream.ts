import * as deepstream from "deepstream.io-client-js";
import { EventDispatcher } from "@puzzl/core/lib/event/EventDispatcher";

export interface IDeepstreamConfig {
    url: string;
    user: string;
    pass: string;
}

// Fixes some missing options in deepstreamIO's client.d.ts
export interface IDeepstreamOptions extends deepstreamIO.Options {
    maxReconnectInterval?: number;
    heartbeatInterval?: number;
}

export interface IDeepstreamErrorInfo {
    error: string;
    event: string;
    topic: string;
}

export class Deepstream {
    private client: deepstreamIO.Client;
    private _onError = new EventDispatcher<this, IDeepstreamErrorInfo>();

    get onError() {
        return this._onError.asEvent();
    }

    constructor(
        private config: IDeepstreamConfig
    ) {

    }

    async connect(options: IDeepstreamOptions = {}) {
        let client = this.client = deepstream(this.config.url, options as deepstreamIO.Options);

        client.on("error", (error, event, topic) => {
            this._onError.dispatch(this, { error, event, topic });
        });

        await new Promise((resolve, reject) => {
            client.login({ username: this.config.user, password: this.config.pass}, (success, data) => {
                if (success) {
                    resolve();
                } else {
                    reject(new Error(`Deepstream login failed. Connection state = ${client.getConnectionState()}`));
                }
            });
        });
    }

    private hasRecord(recordName: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.client.record.has(recordName, (error, hasRecord) => {
                if (error) {
                    reject(new Error(`Error while checking for existence of record ${recordName} (DS Error:${error})`));
                } else {
                    resolve(hasRecord);
                }
            });
        });
    }

    private async getRecord(recordName: string) {
        if (!await this.hasRecord(recordName)) {
            throw new Error(`Record ${recordName} not found`);
        }

        return new Promise<deepstreamIO.Record>(resolve => {
            this.client.record.getRecord(recordName).whenReady(record => {
                resolve(record);
            });
        });
    }

    async subscribeToRecord<T>(recordName: string, listener: (data: T) => void) {
        let record = await this.getRecord(recordName);
        record.subscribe(listener, true);
    }

    async subscribeToEvent<T>(eventName: string, listener: (data: T) => void) {
        this.client.event.subscribe(eventName, listener);
    }

    async unsubscribeFromEvent(eventName: string, listener: (data: any) => void) {
        this.client.event.unsubscribe(eventName, listener);
    }

    async rpcCall<T>(name: string, data: any) {
        return new Promise<T>((resolve, reject) => {
            this.client.rpc.make(name, data, ( error, result ) => {
                if (error) {
                    reject(new Error(`RPC call "${name}" failed. (DS Error:${error})`));
                } else {
                    resolve(result);
                }
            });
        });
    }
}
