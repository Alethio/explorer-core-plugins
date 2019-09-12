import { Deepstream } from "app/util/network/Deepstream";
import { EventDispatcher } from "@puzzl/core/lib/event/EventDispatcher";

export class LazyRecord<T> {
    private isSubscribed = false;
    private value: T | undefined;
    private record: deepstreamIO.Record | undefined;
    private listener: ((data: T) => void) | undefined;
    private _onData = new EventDispatcher<this, T>();

    constructor(private recordName: string, private deepstream: Deepstream) {

    }

    async fetch() {
        // TODO handle transition (not registered -> registered)
        if (!this.isSubscribed) {
            return new Promise<T>((resolve, reject) => {
                let listener = this.listener = (data: T) => {
                    if (!this.isSubscribed) {
                        this.value = data;
                        this.isSubscribed = true;
                        resolve(data);
                    } else {
                        this.value = data;
                        this._onData.dispatch(this, data);
                    }
                };
                this.deepstream.subscribeToRecord<T>(this.recordName, listener)
                    .then(record => this.record = record)
                    .catch(reject);
            });
        } else {
            return this.value as T;
        }
    }

    get onData() {
        return this._onData.asEvent();
    }

    dispose() {
        if (this.record) {
            this.record.unsubscribe(this.listener);
            this.record = void 0;
        }
    }
}
