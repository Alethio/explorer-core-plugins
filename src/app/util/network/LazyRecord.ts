import { Deepstream } from "app/util/network/Deepstream";
import { EventDispatcher } from "@puzzl/core/lib/event/EventDispatcher";
import { IDataReader } from "app/util/network/IDataReader";

export class LazyRecord<T> {
    private isSubscribed = false;
    private value: T | undefined;
    private record: deepstreamIO.Record | undefined;
    private err: unknown;
    private listener: ((data: T) => void) | undefined;
    private _onData = new EventDispatcher<this, void>();

    constructor(
        private recordName: string,
        private deepstream: Deepstream,
        private dataReader: IDataReader<T> = rawData => rawData
    ) {

    }

    async fetch() {
        // TODO handle transition (not registered -> registered)
        if (!this.isSubscribed) {
            return new Promise<T>((resolve, reject) => {
                let listener = this.listener = (rawData: T) => {
                    try {
                        let data = typeof this.dataReader === "function" ?
                            this.dataReader(rawData) :
                            this.dataReader.read(rawData);

                        this.value = data;
                        this.err = void 0;
                        if (!this.isSubscribed) {
                            this.isSubscribed = true;
                            resolve(data);
                        } else {
                            this._onData.dispatch(this, void 0);
                        }
                    } catch (e) {
                        this.value = void 0;
                        this.err = e;
                        if (!this.isSubscribed) {
                            this.isSubscribed = true;
                            reject(e);
                        } else {
                            this._onData.dispatch(this, void 0);
                        }
                    }
                };
                this.deepstream.subscribeToRecord<T>(this.recordName, listener)
                    .then(record => this.record = record)
                    .catch(reject);
            });
        } else {
            if (this.err) {
                return Promise.reject(this.err);
            }
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
