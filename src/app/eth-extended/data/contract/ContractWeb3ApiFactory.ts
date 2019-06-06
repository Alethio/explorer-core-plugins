import { ContractWeb3Api } from "./ContractWeb3Api";
import { ContractAbiResponseReader } from "./ContractAbiResponseReader";
import { Web3Factory } from "app/eth-extended/Web3Factory";

export class ContractWeb3ApiFactory {
    constructor(
        private web3Factory: Web3Factory
    ) {

    }

    create() {
        return new ContractWeb3Api(
            this.web3Factory,
            new ContractAbiResponseReader()
        );
    }
}
