import { HttpApi } from "app/shared/data/HttpApi";
import { NotFoundError } from "app/shared/data/NotFoundError";
import { TokenResponseReader } from "app/eth-extended/data/token/transfer/TokenResponseReader";

export class TokenTransferByTxApi {
    constructor(
        private httpApi: HttpApi,
        private reader: TokenResponseReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(txHash: string) {
        let data: any;
        try {
            data = await this.httpApi.fetch<any>(
                this.endpointUrlMask.replace("%s", txHash)
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
            throw new Error(`No data found for transaction hash "${txHash}"`);
        }

        return this.reader.read(data);
    }
}
