import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IPropagationChartItem } from "app/eth-extended/module/dashboard/charts/data/IPropagationChartItem";
import { EventWatcher } from "plugin-api/watcher/EventWatcher";

export class PropagationInfoAdapter implements IDataAdapter<{}, IPropagationChartItem[]> {
    contextType = {};

    constructor(private dataSource: AlethioDataSource) {

    }

    async load() {
        let { ethStatsStore } = this.dataSource.stores;

        return ethStatsStore.propagationChartData.fetch();
    }

    createWatcher() {
        return new EventWatcher(this.dataSource.stores.ethStatsStore.propagationChartData.onData, () => true);
    }
}
