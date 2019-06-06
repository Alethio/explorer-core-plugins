import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { Search } from "app/eth-lite/data/search/Search";

export class SearchFactory {
    constructor(private web3EthApi: Web3EthApi) {

    }

    create(blockStateStore: BlockStateStore) {
        return new Search(
            this.web3EthApi,
            blockStateStore
        );
    }
}
