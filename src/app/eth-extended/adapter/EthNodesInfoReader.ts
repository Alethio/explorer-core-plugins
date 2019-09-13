import { IDataReaderObject } from "app/util/network/IDataReader";
import { IEthNodesInfo } from "app/eth-extended/module/dashboard/charts/data/IEthNodesInfo";

export class EthNodesInfoReader implements IDataReaderObject<IEthNodesInfo> {
    read(rawData: any) {
        let data: IEthNodesInfo = {
            activeNodesCount: Number(rawData["ethstats:nodeCountData"].active)
        };
        return data;
    }
}
