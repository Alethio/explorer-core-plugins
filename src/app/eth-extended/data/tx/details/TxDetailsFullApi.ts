import { HttpApi } from "app/eth-extended/data/HttpApi";
import { TxDetailsFullReader } from "app/eth-extended/data/tx/details/TxDetailsFullReader";
import { NotFoundError } from "app/eth-extended/data/NotFoundError";

export class TxDetailsFullApi {
    constructor(
        private httpApi: HttpApi,
        private txDetailsReader: TxDetailsFullReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(txHash: string) {
        let data = await this.httpApi.fetch(
            this.endpointUrlMask.replace("%s", txHash)
        );

        if (!data) {
            throw new NotFoundError(`No data found for transaction hash "${txHash}"`);
        }

        return this.txDetailsReader.read(data);
    }
}
