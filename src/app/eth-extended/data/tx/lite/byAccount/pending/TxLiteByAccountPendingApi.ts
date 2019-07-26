import { TxLiteByAccountPendingReader } from "./TxLiteByAccountPendingReader";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";

export class TxLiteByAccountPendingApi {
    constructor(
        private dsRpcApi: DsRpcApi,
        private reader: TxLiteByAccountPendingReader
    ) {

    }

    async fetch(accountHash: string, offset: number, limit: number) {
        let data = await this.dsRpcApi.fetch("pending:v3:getAccountTransactions", {
            address: "0x" + accountHash.replace(/^0x/, ""),
            offset,
            limit
        });

        if (!data) {
            throw new Error(`No data found in deepstream for accountHash "${accountHash}""`);
        }

        // tslint:disable-next-line: no-string-literal
        return (data as any[]).map((raw: any) => this.reader.read(raw));
    }
}
