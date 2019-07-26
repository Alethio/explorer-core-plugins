import { TxDetailsPartialReader } from "./TxDetailsPartialReader";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";

export class TxDetailsPartialApi {
    constructor(
        private dsRpcApi: DsRpcApi,
        private txDetailsPartialReader: TxDetailsPartialReader
    ) {

    }

    async fetch(txHash: string) {
        let txData = await this.dsRpcApi.fetch("pending:v3:getTx", { hash: "0x" + txHash.replace(/^0x/, "") });

        if (!txData) {
            throw new Error(`No data found in deepstream for txHash "${txHash}"`);
        }

        return this.txDetailsPartialReader.read(txData);
    }
}
