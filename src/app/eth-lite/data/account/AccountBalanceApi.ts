import { BigNumber } from "app/util/BigNumber";
import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";

export class AccountBalanceApi {
    constructor(private web3EthApi: Web3EthApi) {

    }

    async fetch(accountAddress: string) {
        let accountBalance = await this.web3EthApi.getAddressBalance(`0x${accountAddress.replace(/^0x/, "")}`);

        if (!accountBalance) {
            throw new Error(`No balance found for address "${accountAddress}"`);
        }
        return new BigNumber(accountBalance);
    }
}
