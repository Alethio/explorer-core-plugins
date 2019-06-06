import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { FifoCache } from "app/util/cache/FifoCache";
import { TxReceiptStore } from "app/eth-lite/data/tx/receipt/TxReceiptStore";
import { ITxReceipt } from "app/eth-lite/data/tx/receipt/ITxReceipt";
import { TxReceiptApi } from "app/eth-lite/data/tx/receipt/TxReceiptApi";
import { TxReceiptReader } from "app/eth-lite/data/tx/receipt/TxReceiptReader";

const CACHE_SIZE = 10000;

export class TxReceiptStoreFactory {
    constructor(private web3EthApi: Web3EthApi) {

    }

    create() {
        return new TxReceiptStore(
            new FifoCache<string, ITxReceipt>(CACHE_SIZE),
            new TxReceiptApi(
                this.web3EthApi,
                new TxReceiptReader()
            )
        );
    }
}
