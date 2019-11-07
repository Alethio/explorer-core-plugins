import { ICache } from "app/util/cache/ICache";
import { TxDetailsMementoApi } from "app/eth-memento/data/tx/details/TxDetailsMementoApi";
import { ITxDetailsMemento } from "app/eth-memento/data/tx/details/ITxDetailsMemento";

export class TxDetailsStore {
    constructor(
        private txDetailsCache: ICache<string, ITxDetailsMemento>,
        private txDetailsMementoApi: TxDetailsMementoApi
    ) {

    }

    async fetch(txHash: string) {
        if (this.txDetailsCache.has(txHash)) {
            return this.txDetailsCache.get(txHash)!;
        }

        let details = await this.txDetailsMementoApi.fetch(txHash);
        this.txDetailsCache.set(txHash, details);
        return details;
    }
}
