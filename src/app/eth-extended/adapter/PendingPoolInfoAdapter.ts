import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IPendingPoolInfo } from "app/eth-extended/module/dashboard/charts/data/IPendingPoolInfo";
import { EventWatcher } from "plugin-api/watcher/EventWatcher";

export class PendingPoolInfoAdapter implements IDataAdapter<{}, IPendingPoolInfo> {
    contextType = {};

    constructor(private dataSource: AlethioDataSource) {

    }

    async load() {
        let { pendingPoolStore } = this.dataSource.stores;

        let { erc20, eth } = await pendingPoolStore.statsPerSec.fetch();
        let size = await pendingPoolStore.poolSize.fetch();

        let info: IPendingPoolInfo = {
            erc: erc20,
            eth,
            size
        };
        return info;
    }

    createWatcher() {
        return [
            new EventWatcher(this.dataSource.stores.pendingPoolStore.statsPerSec.onData, () => true),
            new EventWatcher(this.dataSource.stores.pendingPoolStore.poolSize.onData, () => true)
        ];
    }
}
