import { IContractDataSource, SourceType } from "./ContractDataSource";

export class EtherscanContractDataSource implements IContractDataSource {
    type = SourceType.Etherscan;

    getUrl(address: string) {
        return "https://etherscan.io/address/0x" + address.replace(/^0x/, "") + "#code";
    }
}
