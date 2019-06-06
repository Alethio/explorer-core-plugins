import { observable } from "mobx";
import { IBlockTxTimeInPool } from "./IBlockTxTimeInPool";

export class BlockTxTimeInPoolStore {
    @observable.ref
    private latestValues: IBlockTxTimeInPool[] | undefined;

    setLatestValues(values: IBlockTxTimeInPool[]) {
        let valueMap = new Map<number, IBlockTxTimeInPool>();

        // Remove duplicates by overwriting previous values
        values.forEach(blockValue => {
            valueMap.set(blockValue.id, blockValue);
        });

        this.latestValues = [...valueMap.values()].sort((a, b) => a.id - b.id);
    }

    getLatestValues() {
        return this.latestValues;
    }
}
