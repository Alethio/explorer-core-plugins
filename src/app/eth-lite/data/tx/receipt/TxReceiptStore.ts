import { KeyValueStore } from "app/shared/data/KeyValueStore";
import { ICache } from "app/util/cache/ICache";
import { ITxReceipt } from "app/eth-lite/data/tx/receipt/ITxReceipt";
import { TxReceiptApi } from "app/eth-lite/data/tx/receipt/TxReceiptApi";

export class TxReceiptStore extends KeyValueStore<string, ITxReceipt> {
    constructor(cache: ICache<string, ITxReceipt>, api: TxReceiptApi) {
        super(cache, api);
    }

    fetch(txHash: string) {
        return super.fetch(txHash);
    }
}
