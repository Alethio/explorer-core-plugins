import { Deepstream } from "app/util/network/Deepstream";
import { BlockTxTimeInPoolStore } from "app/eth-extended/data/block/txTimeInPool/BlockTxTimeInPoolStore";
import { LazyRecord } from "app/util/network/LazyRecord";
import { BlockTxTimeInPoolReader } from "app/eth-extended/data/block/txTimeInPool/BlockTxTimeInPoolReader";
import { IBlockTxTimeInPool } from "app/eth-extended/data/block/txTimeInPool/IBlockTxTimeInPool";

export class BlockTxTimeInPoolStoreFactory {
    constructor(private deepstream: Deepstream) {

    }

    create() {
        let store = new BlockTxTimeInPoolStore();
        store.latestValues = new LazyRecord(
            "pending/v3/blockSummaries",
            this.deepstream,
            rawData => {
                let values = (rawData as any[]).map(item => new BlockTxTimeInPoolReader().read(item));

                let valueMap = new Map<number, IBlockTxTimeInPool>();

                // Remove duplicates by overwriting previous values
                values.forEach(blockValue => {
                    valueMap.set(blockValue.id, blockValue);
                });

                return [...valueMap.values()].sort((a, b) => a.id - b.id);
            }
        );
        return store;
    }
}
