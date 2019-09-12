import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IBlockTxTimeInPool } from "app/eth-extended/data/block/txTimeInPool/IBlockTxTimeInPool";
import { EventWatcher } from "plugin-api/watcher/EventWatcher";

export class BlockAvgTxTimeInPoolAdapter implements IDataAdapter<void, (IBlockTxTimeInPool | undefined)[]> {
    contextType = {};

    constructor(private dataSource: AlethioDataSource) {

    }

    async load() {
        return await this.dataSource.stores.blockTxTimeInPoolStore.latestValues.fetch();
    }

    createWatcher() {
        return new EventWatcher(this.dataSource.stores.blockTxTimeInPoolStore.latestValues.onData, () => true);
    }
}
