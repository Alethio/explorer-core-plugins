import { ICache } from "app/util/cache/ICache";
import { TxLiteByAccountApi } from "./TxLiteByAccountApi";
import { ITxLiteByAccount } from "./ITxLiteByAccount";
import { ICursor } from "./ICursor";

export class TxLiteByAccountStore {
    constructor(
        private cache: ICache<string, ITxLiteByAccount[]>,
        private api: TxLiteByAccountApi
    ) {

    }

    async fetch(accountHash: string, cursor: ICursor, limit: number) {
        let cacheKey = this.getCacheKey(accountHash, cursor, limit);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        let data = await this.api.fetch(accountHash, cursor, limit);
        this.cache.set(cacheKey, data);
        return data;
    }

    private getCacheKey(accountHash: string, cursor: ICursor, limit: number) {
        return accountHash + "_" + JSON.stringify(cursor) + "_" + limit;
    }
}
