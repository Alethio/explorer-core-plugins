import { ITokenTransfer } from "app/eth-extended/data/token/transfer/ITokenTransfer";
import { ICache } from "app/util/cache/ICache";
import { TokenTransferByTxApi } from "app/eth-extended/data/token/transfer/byTx/TokenTransferByTxApi";

export class TokenTransferByTxStore {
    constructor(
        private cache: ICache<string, ITokenTransfer[]>,
        private api: TokenTransferByTxApi
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
