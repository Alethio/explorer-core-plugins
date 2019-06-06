import { ICache } from "app/util/cache/ICache";
import { TxLiteByAccountMinedApi } from "app/eth-extended/data/tx/lite/byAccount/mined/TxLiteByAccountMinedApi";
import { ITxLiteByAccountMined } from "app/eth-extended/data/tx/lite/byAccount/mined/ITxLiteByAccountMined";
import { ICursor } from "app/eth-extended/data/contractMsg/lite/byAccount/ICursor";

export class TxLiteByAccountMinedStore {
    constructor(
        private cache: ICache<string, ITxLiteByAccountMined[]>,
        private api: TxLiteByAccountMinedApi
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
