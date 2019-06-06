import { ICache } from "app/util/cache/ICache";
import { ILogEvent } from "../ILogEvent";
import { LogEventsByTxApi } from "./LogEventsByTxApi";

export class LogEventsByTxStore {
    constructor(
        private cache: ICache<string, ILogEvent[]>,
        private api: LogEventsByTxApi
    ) {

    }

    async fetch(txHash: string) {
        if (this.cache.has(txHash)) {
            return this.cache.get(txHash)!;
        }

        let data = await this.api.fetch(txHash);
        this.cache.set(txHash, data);
        return data;
    }
}
