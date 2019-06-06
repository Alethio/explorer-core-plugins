import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { TxReceiptReader } from "app/eth-lite/data/tx/receipt/TxReceiptReader";

export class TxReceiptApi {
    constructor(
        private web3EthApi: Web3EthApi,
        private reader: TxReceiptReader
    ) {

    }

    async fetch(txHash: string) {
        let txReceipt = await this.web3EthApi.getTransactionReceipt(`0x${txHash.replace(/^0x/, "")}`);

        if (!txReceipt) {
            throw new Error(`No receipt found  for txHash "${txHash}"`);
        }

        return this.reader.read(txReceipt);
    }
}
