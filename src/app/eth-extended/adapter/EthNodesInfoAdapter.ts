import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { ObservableWatcher } from "plugin-api/watcher/ObservableWatcher";
import { IEthNodesInfo } from "app/eth-extended/module/dashboard/charts/data/IEthNodesInfo";

export class EthNodesInfoAdapter implements IDataAdapter<{}, IEthNodesInfo> {
    contextType = {};

    constructor(private dataSource: AlethioDataSource) {

    }

    async load() {
        let { netstatsStore } = this.dataSource.stores;

        let info: IEthNodesInfo = {
            activeNodesCount: netstatsStore.getActiveNodesCount()
        };
        return info;
    }

    createWatcher() {
        return new ObservableWatcher(() => {
            let { netstatsStore } = this.dataSource.stores;
            netstatsStore.getActiveNodesCount();
        });
    }
}
