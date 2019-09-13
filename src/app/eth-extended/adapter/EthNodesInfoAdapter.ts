import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IEthNodesInfo } from "app/eth-extended/module/dashboard/charts/data/IEthNodesInfo";
import { EventWatcher } from "plugin-api/watcher/EventWatcher";

export class EthNodesInfoAdapter implements IDataAdapter<{}, IEthNodesInfo> {
    contextType = {};

    constructor(private dataSource: AlethioDataSource) {

    }

    async load() {
        let { ethStatsStore } = this.dataSource.stores;

        return ethStatsStore.ethNodesInfo.fetch();
    }

    createWatcher() {
        return new EventWatcher(this.dataSource.stores.ethStatsStore.ethNodesInfo.onData, () => true);
    }
}
