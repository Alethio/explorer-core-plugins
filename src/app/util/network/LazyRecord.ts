import { Deepstream } from "app/util/network/Deepstream";
import { EventDispatcher } from "@puzzl/core/lib/event/EventDispatcher";
import { IDataReader } from "app/util/network/IDataReader";

enum SubStatus {
    Unsubscribed,
    Pending,
    Subscribed
}

/**
 * A wrapper for a Deepstream record that allows subscribing to the record in a lazy fashion.
 * Deepstream API for record subscription accepts a callback which is called the first time with the current value
 * of the record and then is called each time a new value is received. This forces us to set up a static subscription
 * even if end up never using it. Instead, we will have a single fetch method, we will set up the subscription
 * on the first call and then update the value in the background, using some internal state. Further calls to fetch
 * will end up returning whatever value we have in our internal state
 */
export class LazyRecord<T> {
    /** Record subscription status */
    private subStatus = SubStatus.Unsubscribed;
    /**
     * Promise that's resolved when the subscription is set-up, with the current value of the record.
     * We store this in case fetch is called again before the subscription is fully set up.
     */
    private subPromise: Promise<T> | undefined;
    /** The record value, which we update with the subscription callback */
    private value: T | undefined;
    /** Reference to the record, so we can unsubscribe at the end */
    private record: deepstreamIO.Record | undefined;
    /** If there was an error in the subscription callback, remember it so we can reject on fetch */
    private err: unknown;
    /** Remember the subscription listener, so we can destroy the subscription */
    private listener: ((data: T) => void) | undefined;
    /** Event used to notify the outside world on record value changes */
    private _onData = new EventDispatcher<this, void>();

    constructor(
        private recordName: string,
        private deepstream: Deepstream,
        private dataReader: IDataReader<T> = rawData => rawData
    ) {

    }

    async fetch() {
        if (this.subStatus === SubStatus.Unsubscribed) {
            return this.subPromise = new Promise<T>((resolve, reject) => {
                this.subStatus = SubStatus.Pending;
                let listener = this.listener = (rawData: T) => {
                    try {
                        let data = typeof this.dataReader === "function" ?
                            this.dataReader(rawData) :
                            this.dataReader.read(rawData);

                        this.value = data;
                        this.err = void 0;
                        if (this.subStatus !== SubStatus.Subscribed) {
                            this.subStatus = SubStatus.Subscribed;
                            resolve(data);
                        } else {
                            this._onData.dispatch(this, void 0);
                        }
                    } catch (e) {
                        this.value = void 0;
                        this.err = e;
                        if (this.subStatus !== SubStatus.Subscribed) {
                            this.subStatus = SubStatus.Subscribed;
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
        } else if (this.subStatus === SubStatus.Pending) {
            return this.subPromise as Promise<T>;
        } else if (this.subStatus === SubStatus.Subscribed) {
            if (this.err) {
                return Promise.reject(this.err);
            }
            return this.value as T;
        } else {
            throw new Error(`Unknown SubStatus "${this.subStatus}"`);
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
