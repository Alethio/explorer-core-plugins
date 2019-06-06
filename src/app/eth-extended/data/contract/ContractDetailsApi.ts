import { HttpApi } from "app/eth-extended/data/HttpApi";
import { ContractAbiFactory } from "./ContractAbiFactory";

enum ResourceType {
    ContractCode = "contract-code",
    ContractAbi = "contract-abi",
    ContractSourceCode = "contract-source-code"
}

export class ContractDetailsApi {
    constructor(
        private httpApi: HttpApi,
        private contractAbiFactory: ContractAbiFactory,
        private endpointUrlMask: string
    ) {

    }

    private async fetch<T>(contractId: number, resourceType: ResourceType) {
        let data = await this.httpApi.fetch<T>(
            this.endpointUrlMask
                .replace(/%d/, "" + contractId)
                .replace(/%s/, resourceType)
        );

        if (!data) {
            throw new Error(`No data found for contract ID "${contractId}", resourceType="${resourceType}"`);
        }

        return data;
    }

    async fetchSourceCode(contractId: number) {
        let data = await this.fetch<any>(contractId, ResourceType.ContractSourceCode);

        return data as string;
    }

    async fetchAbi(contractId: number) {
        let data = await this.fetch<any>(contractId, ResourceType.ContractAbi);

        let contractAbi = this.contractAbiFactory.create(data);
        return contractAbi;
    }

    async fetchAccountCode(contractId: number) {
        let data = await this.fetch<any>(contractId, ResourceType.ContractCode);

        return data as string;
    }
}
