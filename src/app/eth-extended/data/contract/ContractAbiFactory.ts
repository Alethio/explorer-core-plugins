import { ContractAbi } from "app/eth-extended/data/contract/ContractAbi";
import { ContractAbiMethodReader } from "app/eth-extended/data/contract/ContractAbiMethodReader";
import { ILogger } from "plugin-api/ILogger";

export class ContractAbiFactory {
    constructor(private logger: ILogger) {

    }

    create(data: object[]) {
        let contractAbi = new ContractAbi(
            new ContractAbiMethodReader(),
            this.logger
        );
        contractAbi.setRawData(data);
        return contractAbi;
    }
}
