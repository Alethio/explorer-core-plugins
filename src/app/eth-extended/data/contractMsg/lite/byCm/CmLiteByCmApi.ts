import { HttpApi } from "app/shared/data/HttpApi";
import { CmLiteReader } from "app/eth-extended/data/contractMsg/lite/CmLiteReader";

export class CmLiteByCmApi {
    constructor(
        private httpApi: HttpApi,
        private contractMsgLiteReader: CmLiteReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(txHash: string, txValidationIndex: number) {
        let data = await this.httpApi.fetchList(
            this.endpointUrlMask
                .replace(/%s/, txHash)
                .replace(/%d/, "" + txValidationIndex)
        );

        return data.map(item => this.contractMsgLiteReader.read(item));
    }
}
