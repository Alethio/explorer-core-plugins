import { HttpApi } from "app/eth-extended/data/HttpApi";
import { CmDetailsReader } from "app/eth-extended/data/contractMsg/details/CmDetailsReader";

export class CmDetailsApi {
    constructor(
        private httpApi: HttpApi,
        private contractMsgDetailsReader: CmDetailsReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(txHash: string, txValidationIndex: number) {
        let data = await this.httpApi.fetch(
            this.endpointUrlMask
                .replace(/%s/, txHash)
                .replace(/%d/, "" + txValidationIndex)
        );

        if (!data) {
            throw new Error(`No data found for (txHash, txValidationIndex)=("${txHash}", ${txValidationIndex})`);
        }

        return this.contractMsgDetailsReader.read(data);
    }
}
