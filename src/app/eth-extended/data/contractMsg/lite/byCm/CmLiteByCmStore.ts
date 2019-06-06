import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { ICache } from "app/util/cache/ICache";
import { CmLiteByCmApi } from "app/eth-extended/data/contractMsg/lite/byCm/CmLiteByCmApi";

export class CmLiteByCmStore {
    constructor(
        private cache: ICache<string, ICmLite[]>,
        private api: CmLiteByCmApi
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
