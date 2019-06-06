import { TxLiteByAccountPendingReader } from "./TxLiteByAccountPendingReader";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";

export class TxLiteByAccountPendingApi {
    constructor(
        private dsRpcApi: DsRpcApi,
        private reader: TxLiteByAccountPendingReader
    ) {

    }

    /**
     * @param accountHash
     * @param blockNo only used because the call returns the mined txs count as well
     */
    async fetch(accountHash: string, blockNo: number, offset: number, limit: number) {
        let data = await this.dsRpcApi.fetch("pending:v2:getAccountTransactions:pending", {
            address: "0x" + accountHash.replace(/^0x/, ""),
            number: blockNo,
            offset,
            limit
        });

        if (!data) {
            throw new Error(`No data found in deepstream for accountHash "${accountHash}""`);
        }

        // tslint:disable-next-line: no-string-literal
        return ((data as any)["transactions"] as any[]).map((raw: any) => this.reader.read(raw));
    }
}
