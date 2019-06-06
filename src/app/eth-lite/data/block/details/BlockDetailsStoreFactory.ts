import { BlockDetailsStore } from "./BlockDetailsStore";
import { FifoCache } from "app/util/cache/FifoCache";
import { IBlockDetails } from "./IBlockDetails";
import { BlockDetailsReader } from "./BlockDetailsReader";
import { BlockDetailsApi } from "./BlockDetailsApi";
import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { TxDetailsReader } from "app/eth-lite/data/tx/details/TxDetailsReader";

const CACHE_SIZE = 100;

export class BlockDetailsStoreFactory {
    constructor(private web3EthApi: Web3EthApi) {

    }

    create() {
        return new BlockDetailsStore(
            new FifoCache<number, IBlockDetails>(CACHE_SIZE),
            new BlockDetailsApi(
                this.web3EthApi,
                new BlockDetailsReader(
                    new TxDetailsReader()
                )
            )
        );
    }
}
