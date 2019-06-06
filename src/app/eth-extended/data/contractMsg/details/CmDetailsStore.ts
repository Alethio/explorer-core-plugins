import { ICache } from "app/util/cache/ICache";
import { CmDetailsApi } from "app/eth-extended/data/contractMsg/details/CmDetailsApi";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";

export class CmDetailsStore {
    constructor(
        private cache: ICache<string, ICmDetails>,
        private api: CmDetailsApi
    ) {

    }

    async fetch(txHash: string, validationIndex: number) {
        let cacheKey = this.getCacheKey(txHash, validationIndex);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        let details = await this.api.fetch(txHash, validationIndex);
        this.cache.set(cacheKey, details);
        return details;
    }

    private getCacheKey(txHash: string, validationIndex: number) {
        return txHash + "_" + validationIndex;
    }
}
