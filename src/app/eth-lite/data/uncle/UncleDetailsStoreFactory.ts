import { UncleDetailsStore } from "./UncleDetailsStore";
import { IUncleDetails } from "./IUncleDetails";
import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { FifoCache } from "app/util/cache/FifoCache";
import { UncleDetailsApi } from "app/eth-lite/data/uncle/UncleDetailsApi";
import { UncleDetailsReader } from "app/eth-lite/data/uncle/UncleDetailsReader";

const CACHE_SIZE = 5;

export class UncleDetailsStoreFactory {
    constructor(private web3EthApi: Web3EthApi) {

    }

    create() {
        return new UncleDetailsStore(
            new FifoCache<string, IUncleDetails>(CACHE_SIZE),
            new UncleDetailsApi(
                this.web3EthApi,
                new UncleDetailsReader()
            )
        );
    }
}
