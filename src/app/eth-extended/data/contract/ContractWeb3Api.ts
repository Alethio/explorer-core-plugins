import { IAbiFunction } from "./IAbiFunction";
import { Contract } from "web3-eth-contract";
import { ContractAbiResponseReader } from "./ContractAbiResponseReader";
import { Web3Factory } from "app/eth-extended/Web3Factory";
type Web3 = import("web3").default;

export class ContractWeb3Api {
    private web3: Web3;
    private web3Contract?: Contract;

    constructor(
        private web3Factory: Web3Factory,
        private contractAbiResponseReader: ContractAbiResponseReader
    ) {

    }

    async loadAbi(abi: object[], contractAddress: string) {
        this.web3 = await this.web3Factory.create();
        /**
         * We must deep clone the abi because loading the abi with web3 has side effects,
         * it modifies the structure of abi raw data
         * for example by adding the signature to functions and events and constant=undefined for fallback
         */
        let clonedAbi = JSON.parse(JSON.stringify(abi));
        this.web3Contract = new this.web3.eth.Contract(clonedAbi, contractAddress);
    }

    getEncodedFunctionSignature(abiMethod: IAbiFunction) {
        if (!this.web3) {
            throw new Error("web3 not loaded");
        }
        return this.web3.eth.abi.encodeFunctionSignature(abiMethod);
    }

    /**
     * TODO implement batch request.
     * For the moment this is not doable because of the typings. Apparently we can't do
     *     method.call.request
     * Search for a workaround
     * @param abiFn
     * @param inputs
     */
    addToBatch(abiFn: IAbiFunction, inputs: any[] = []) {
        if (!this.web3Contract) {
            throw new Error("Contract was not loaded");
        }
        // let signature = this.web3.eth.abi.encodeFunctionSignature(abiFn);
        // this.batchRequest.add(this.web3Contract.methods[signature](...inputs).call);
    }

    async callAbiMethod(abiFn: IAbiFunction, inputs: any[] = []) {
        if (!this.web3Contract) {
            throw new Error("Contract was not loaded");
        }
        let signature = this.web3.eth.abi.encodeFunctionSignature(abiFn);

        let data = await this.web3Contract.methods[signature](...inputs).call();
        return this.contractAbiResponseReader.read(data, abiFn);
    }
}
