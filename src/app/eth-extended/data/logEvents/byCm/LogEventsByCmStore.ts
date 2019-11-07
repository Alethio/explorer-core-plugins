import { ICache } from "app/util/cache/ICache";
import { ILogEvent } from "../../../../shared/data/logEvents/ILogEvent";
import { LogEventsByCmApi } from "./LogEventsByCmApi";

export class LogEventsByCmStore {
    constructor(
        private cache: ICache<string, ILogEvent[]>,
        private api: LogEventsByCmApi
    ) {

    }

    async fetch(txHash: string, txValidationIndex: number) {
        let cacheKey = this.getCacheKey(txHash, txValidationIndex);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        let data = await this.api.fetch(txHash, txValidationIndex);
        this.cache.set(cacheKey, data);
        return data;
    }

    private getCacheKey(txHash: string, txValidationIndex: number) {
        return txHash + "_" + txValidationIndex;
    }
}
