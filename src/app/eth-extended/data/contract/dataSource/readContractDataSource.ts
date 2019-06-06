// tslint:disable:no-string-literal
import { EtherscanContractDataSource } from "./EtherscanContractDataSource";
import { EthstatsContractDataSource } from "./EthstatsContractDataSource";

export function readContractDataSource(dataAlethioComments?: any) {
    let dataSource = dataAlethioComments && dataAlethioComments["contractDataSource"] || "";
    if (dataSource && /^(.*)(etherscan)(.*)$/.test(dataSource)) {
        return new EtherscanContractDataSource();
    }
    return new EthstatsContractDataSource();
}
