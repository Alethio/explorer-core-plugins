import { AccountDetailsReader } from "./AccountDetailsReader";
import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";

export class AccountDetailsApi {
    constructor(
        private web3EthApi: Web3EthApi,
        private accountDetailsReader: AccountDetailsReader
    ) {

    }

    async fetch(accountAddress: string) {
        let accountCode = await this.web3EthApi.getAddressCode(`0x${accountAddress.replace(/^0x/, "")}`);

        if (!accountCode) {
            throw new Error(`No contract code found for address "${accountAddress}"`);
        }

        return this.accountDetailsReader.read(accountAddress.replace(/^0x/, ""), accountCode);
    }
}
