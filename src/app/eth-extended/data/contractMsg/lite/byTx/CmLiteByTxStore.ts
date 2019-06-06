import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { ICache } from "app/util/cache/ICache";
import { CmLiteByTxApi } from "./CmLiteByTxApi";

export class CmLiteByTxStore {
    constructor(
        private cache: ICache<string, ICmLite[]>,
        private api: CmLiteByTxApi
    ) {

    }

    async fetch(txHash: string) {
        let cacheKey = this.getCacheKey(txHash);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        let data = await this.api.fetch(txHash);
        this.cache.set(cacheKey, data);
        return data;
    }

    private getCacheKey(txHash: string) {
        return txHash;
    }
}
