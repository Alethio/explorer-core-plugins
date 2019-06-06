import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { BlockRangeStore } from "app/shared/data/block/value/BlockRangeStore";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";
import { FifoCache } from "app/util/cache/FifoCache";
import { BlockValueApi } from "app/eth-lite/data/block/value/BlockValueApi";
import { BlockValueReader } from "app/eth-lite/data/block/value/BlockValueReader";
import { BlockValueStore } from "app/shared/data/block/value/BlockValueStore";

/** Number of cached pages */
const CACHE_SIZE = 20;
/** Block value items per page */
const PAGE_SIZE = 15;

export class BlockValueStoreFactory {
    constructor(private web3EthApi: Web3EthApi) {
    }

    create() {
        return new BlockValueStore(
            new BlockRangeStore<IBlockTxCount>(
                new FifoCache<number, IBlockTxCount[]>(CACHE_SIZE),
                PAGE_SIZE,
                new BlockValueApi(
                    this.web3EthApi,
                    new BlockValueReader()
                )
            )
        );
    }
}
