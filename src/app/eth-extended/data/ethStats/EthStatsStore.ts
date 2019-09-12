import { IEthNodesInfo } from "app/eth-extended/module/dashboard/charts/data/IEthNodesInfo";
import { LazyRecord } from "app/util/network/LazyRecord";

export class EthStatsStore {
    ethNodesInfo: LazyRecord<IEthNodesInfo>;
}
