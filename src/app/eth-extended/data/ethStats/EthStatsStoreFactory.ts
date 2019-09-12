import { Deepstream } from "app/util/network/Deepstream";
import { EthStatsStore } from "app/eth-extended/data/ethStats/EthStatsStore";
import { LazyRecord } from "app/util/network/LazyRecord";
import { EthNodesInfoReader } from "app/eth-extended/adapter/EthNodesInfoReader";
import { PropagationChartDataReader } from "app/eth-extended/module/dashboard/charts/data/PropagationChartDataReader";

export class EthStatsStoreFactory {
    constructor(private deepstream: Deepstream) {

    }

    create() {
        let ethStatsStore = new EthStatsStore();
        ethStatsStore.ethNodesInfo = new LazyRecord(
            "ethstats/stats/nodeCountData",
            this.deepstream,
            new EthNodesInfoReader()
        );
        ethStatsStore.propagationChartData = new LazyRecord(
            "ethstats/chart/blockPropagationChartData",
            this.deepstream,
            rawData => (
                rawData["ethstats:blockPropagationChartData"]["ethstats:blockPropagationHistogramData"] as any[])
                    .map((item) => new PropagationChartDataReader().read(item)
            )
        );
        return ethStatsStore;
    }
}
