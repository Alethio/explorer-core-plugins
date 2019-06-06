import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { ObservableWatcher } from "plugin-api/watcher/ObservableWatcher";
import { IPropagationChartItem } from "app/eth-extended/module/dashboard/charts/data/IPropagationChartItem";

export class PropagationInfoAdapter implements IDataAdapter<{}, IPropagationChartItem[] | undefined> {
    contextType = {};

    constructor(private dataSource: AlethioDataSource) {

    }

    async load() {
        let { propagationChartStore } = this.dataSource.stores;

        return propagationChartStore.getPropagationHistogramData();
    }

    createWatcher() {
        return new ObservableWatcher(() => {
            let { propagationChartStore } = this.dataSource.stores;
            propagationChartStore.getPropagationHistogramData();
        });
    }
}
