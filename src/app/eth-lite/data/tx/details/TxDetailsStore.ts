import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";
import { KeyValueStore } from "app/shared/data/KeyValueStore";
import { ICache } from "app/util/cache/ICache";
import { TxDetailsApi } from "app/eth-lite/data/tx/details/TxDetailsApi";

export class TxDetailsStore extends KeyValueStore<string, ITxDetails> {
    constructor(cache: ICache<string, ITxDetails>, api: TxDetailsApi) {
        super(cache, api);
    }

    fetch(txHash: string) {
        return super.fetch(txHash);
    }
}
