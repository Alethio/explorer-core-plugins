import { HttpApi } from "app/shared/data/HttpApi";
import { ICursor } from "app/eth-extended/data/contractMsg/lite/byAccount/ICursor";
import { CmLiteByAccountReader } from "./CmLiteByAccountReader";

export class CmLiteByAccountApi {
    constructor(
        private httpApi: HttpApi,
        private contractMsgLiteReader: CmLiteByAccountReader,
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

        return data.map(item => this.contractMsgLiteReader.read(item));
    }
}
