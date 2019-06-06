import { ICache } from "app/util/cache/ICache";
import { CmLiteByAccountApi } from "app/eth-extended/data/contractMsg/lite/byAccount/CmLiteByAccountApi";
import { ICursor } from "./ICursor";
import { ICmLiteByAccount } from "app/eth-extended/data/contractMsg/lite/byAccount/ICmLiteByAccount";

export class CmLiteByAccountStore {
    constructor(
        private cache: ICache<string, ICmLiteByAccount[]>,
        private api: CmLiteByAccountApi
    ) {

    }

    async fetch(accountHash: string, atCursor: ICursor, limit: number) {
        let cacheKey = this.getCacheKey(accountHash, atCursor, limit);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        let data = await this.api.fetch(accountHash, atCursor, limit);
        this.cache.set(cacheKey, data);
        return data;
    }

    private getCacheKey(accountHash: string, cursor: ICursor, limit: number) {
        return accountHash + "_" + JSON.stringify(cursor) + "_" + limit;
    }
}
