import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IEthNodesInfo } from "app/eth-extended/module/dashboard/charts/data/IEthNodesInfo";
import { EventWatcher } from "plugin-api/watcher/EventWatcher";

export class EthNodesInfoAdapter implements IDataAdapter<{}, IEthNodesInfo> {
    contextType = {};

    constructor(private dataSource: AlethioDataSource) {

    }

    async load() {
        let { netstatsStore } = this.dataSource.stores;

        let info: IEthNodesInfo = {
            activeNodesCount: await netstatsStore.getActiveNodesCount()
        };
        return info;
    }

    createWatcher() {
        return new EventWatcher(this.dataSource.stores.netstatsStore.onData, () => true);
    }
}
