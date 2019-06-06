import { ContractDetailsApi } from "app/eth-extended/data/contract/ContractDetailsApi";
import { ICache } from "app/util/cache/ICache";
import { ContractAbi } from "app/eth-extended/data/contract/ContractAbi";

export class ContractDetailsStore {
    constructor(
        private sourceCodeCache: ICache<number, string>,
        private abiCache: ICache<number, ContractAbi>,
        private accountCodeCache: ICache<number, string>,
        private api: ContractDetailsApi
    ) {

    }

    async fetchSourceCode(contractId: number) {
        let sourceCode = this.sourceCodeCache.get(contractId);
        if (sourceCode) {
            return sourceCode;
        }
        sourceCode = await this.api.fetchSourceCode(contractId);
        this.sourceCodeCache.set(contractId, sourceCode);
        return sourceCode;
    }

    async fetchAbi(contractId: number) {
        let abi = this.abiCache.get(contractId);
        if (abi) {
            return abi;
        }
        abi = await this.api.fetchAbi(contractId);
        this.abiCache.set(contractId, abi);
        return abi;
    }

    async fetchAccountCode(contractId: number) {
        let accountCode = this.accountCodeCache.get(contractId);
        if (accountCode) {
            return accountCode;
        }
        accountCode = await this.api.fetchAccountCode(contractId);
        this.accountCodeCache.set(contractId, accountCode);
        return accountCode;
    }
}
