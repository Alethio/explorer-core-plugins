import { ITokenTransfer } from "app/eth-extended/data/token/transfer/ITokenTransfer";
import { ICache } from "app/util/cache/ICache";
import { TokenTransferByCmApi } from "app/eth-extended/data/token/transfer/byCm/TokenTransferByCmApi";

export class TokenTransferByCmStore {
    constructor(
        private cache: ICache<string, ITokenTransfer[]>,
        private api: TokenTransferByCmApi
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
