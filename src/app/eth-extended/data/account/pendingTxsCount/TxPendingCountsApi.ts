import { TxPendingCountsReader as TxPendingCountsReader } from "./TxPendingCountsReader";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";

export class TxPendingCountsApi {
    constructor(
        private dsRpcApi: DsRpcApi,
        private reader: TxPendingCountsReader
    ) {

    }

    async fetch(accountHash: string, blockNo: number) {
        let data = await this.dsRpcApi.fetch("pending:v2:getAccountTransactions:counters", {
            address: "0x" + accountHash.replace(/^0x/, ""),
            number: blockNo
        });

        if (!data) {
            throw new Error(`No data found in deepstream for accountHash "${accountHash}" and blockNo "${blockNo}"`);
        }

        return this.reader.read(data);
    }

}
