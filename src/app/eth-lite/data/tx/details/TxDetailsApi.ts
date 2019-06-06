import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { TxDetailsReader } from "app/eth-lite/data/tx/details/TxDetailsReader";

export class TxDetailsApi {
    constructor(
        private web3EthApi: Web3EthApi,
        private reader: TxDetailsReader
    ) {

    }

    async fetch(txHash: string) {
        let txData = await this.web3EthApi.getTransaction(`0x${txHash.replace(/^0x/, "")}`);

        if (!txData) {
            throw new Error(`No data found for txHash "${txHash}"`);
        }

        return this.reader.read(txData);
    }
}
