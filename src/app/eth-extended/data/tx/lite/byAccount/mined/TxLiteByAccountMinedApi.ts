import { HttpApi } from "app/shared/data/HttpApi";
import { TxLiteByAccountMinedReader } from "./TxLiteByAccountMinedReader";
import { ICursor } from "app/eth-extended/data/contractMsg/lite/byAccount/ICursor";

export class TxLiteByAccountMinedApi {
    constructor(
        private httpApi: HttpApi,
        private reader: TxLiteByAccountMinedReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(accountHash: string, atCursor: ICursor, limit: number) {
        let data = await this.httpApi.fetchList(
            this.endpointUrlMask.replace(/%s/, accountHash) + "?" +
            `includedInBlock=${atCursor.blockNo}` + "&" +
            `blockMsgValidationIndex=${atCursor.blockMsgValidationIndex}` + "&" +
            `limit=${limit}`
        );

        return data.map(item => this.reader.read(item));
    }
}
