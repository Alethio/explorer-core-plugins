import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IPendingPoolInfo } from "app/eth-extended/module/dashboard/charts/data/IPendingPoolInfo";
import { ObservableWatcher } from "plugin-api/watcher/ObservableWatcher";

export class PendingPoolInfoAdapter implements IDataAdapter<{}, IPendingPoolInfo> {
    contextType = {};

    constructor(private dataSource: AlethioDataSource) {

    }

    async load() {
        let { pendingPoolStore } = this.dataSource.stores;

        let info: IPendingPoolInfo = {
            erc: pendingPoolStore.getErc(),
            eth: pendingPoolStore.getEth(),
            size: pendingPoolStore.getSize()
        };
        return info;
    }

    createWatcher() {
        return new ObservableWatcher(() => {
            let { pendingPoolStore } = this.dataSource.stores;
            pendingPoolStore.getErc();
            pendingPoolStore.getEth();
            pendingPoolStore.getSize();
        });
    }
}
