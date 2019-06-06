import { HttpApi } from "app/eth-extended/data/HttpApi";
import { TokenResponseReader } from "app/eth-extended/data/token/transfer/TokenResponseReader";
import { NotFoundError } from "app/eth-extended/data/NotFoundError";

export class TokenTransferByCmApi {
    constructor(
        private httpApi: HttpApi,
        private tokenResponseReader: TokenResponseReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(txHash: string, txValidationIndex: number) {
        let data: any;
        try {
            data = await this.httpApi.fetch<any>(
                this.endpointUrlMask
                    .replace(/%s/, txHash)
                    .replace(/%d/, "" + txValidationIndex)
            );
        } catch (e) {
            if (e instanceof NotFoundError) {
                data = {
                    tokenInfo: [],
                    tokenTransfers: []
                };
            } else {
                throw e;
            }
        }

        if (!data) {
            throw new Error(`No data found for (txHash, validationIndex)=("${txHash}", ${txValidationIndex})`);
        }

        return this.tokenResponseReader.read(data);
    }
}
