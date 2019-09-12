import { IEthNodesInfo } from "app/eth-extended/module/dashboard/charts/data/IEthNodesInfo";
import { LazyRecord } from "app/util/network/LazyRecord";
import { IPropagationChartItem } from "app/eth-extended/module/dashboard/charts/data/IPropagationChartItem";

export class EthStatsStore {
    ethNodesInfo: LazyRecord<IEthNodesInfo>;
    propagationChartData: LazyRecord<IPropagationChartItem[]>;
}
