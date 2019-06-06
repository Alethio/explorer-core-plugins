import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { TxDetailsStore } from "app/eth-lite/data/tx/details/TxDetailsStore";
import { FifoCache } from "app/util/cache/FifoCache";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";
import { TxDetailsApi } from "app/eth-lite/data/tx/details/TxDetailsApi";
import { TxDetailsReader } from "app/eth-lite/data/tx/details/TxDetailsReader";

const CACHE_SIZE = 10000;

export class TxDetailsStoreFactory {
    constructor(private web3EthApi: Web3EthApi) {

    }

    create() {
        return new TxDetailsStore(
            new FifoCache<string, ITxDetails>(CACHE_SIZE),
            new TxDetailsApi(
                this.web3EthApi,
                new TxDetailsReader()
            )
        );
    }
}
