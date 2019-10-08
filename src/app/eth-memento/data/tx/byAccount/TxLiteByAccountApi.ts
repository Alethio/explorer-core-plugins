import { HttpApi } from "app/shared/data/HttpApi";
import { TxLiteByAccountReader } from "./TxLiteByAccountReader";
import { ICursor } from "./ICursor";

export class TxLiteByAccountApi {
    constructor(
        private httpApi: HttpApi,
        private reader: TxLiteByAccountReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(accountHash: string, atCursor: ICursor, limit: number) {
        let data = await this.httpApi.fetchList(
            this.endpointUrlMask.replace(/%s/, accountHash) + "?" +
            `includedInBlock=${atCursor.blockNo}` + "&" +
            `txIndex=${atCursor.txIndex}` + "&" +
            `limit=${limit}`
        );

        return data.map(item => this.reader.read(item));
    }
}
