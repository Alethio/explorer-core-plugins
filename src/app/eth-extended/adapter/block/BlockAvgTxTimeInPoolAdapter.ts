import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IBlockTxTimeInPool } from "app/eth-extended/data/block/txTimeInPool/IBlockTxTimeInPool";

export class BlockAvgTxTimeInPoolAdapter implements IDataAdapter<void, (IBlockTxTimeInPool | undefined)[]> {
    contextType = {};

    constructor(private dataSource: AlethioDataSource) {

    }

    async load() {
        let latestValues = this.dataSource.stores.blockTxTimeInPoolStore.getLatestValues();
        if (!latestValues) {
            return [];
        }
        return latestValues;
    }
}
