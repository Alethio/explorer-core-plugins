import { HttpApi } from "app/shared/data/HttpApi";
import { CmLiteReader } from "app/eth-extended/data/contractMsg/lite/CmLiteReader";

export class CmLiteByTxApi {
    constructor(
        private httpApi: HttpApi,
        private contractMsgLiteReader: CmLiteReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(txHash: string) {
        let data = await this.httpApi.fetchList(
            this.endpointUrlMask.replace("%s", txHash)
        );

        return data.map(item => this.contractMsgLiteReader.read(item));
    }
}
