import { TxPendingCountsReader as TxPendingCountsReader } from "./TxPendingCountsReader";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";

export class TxPendingCountsApi {
    constructor(
        private dsRpcApi: DsRpcApi,
        private reader: TxPendingCountsReader
    ) {

    }

    async fetch(accountHash: string) {
        let data = await this.dsRpcApi.fetch("pending:v3:getAccountTransactions:counters", {
            address: "0x" + accountHash.replace(/^0x/, "")
        });

        if (!data) {
            throw new Error(`No data found in deepstream for accountHash "${accountHash}"`);
        }

        return this.reader.read(data);
    }

}
