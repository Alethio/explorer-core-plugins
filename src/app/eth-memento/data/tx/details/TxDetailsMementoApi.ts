import { HttpApi } from "app/shared/data/HttpApi";
import { NotFoundError } from "app/shared/data/NotFoundError";
import { TxDetailsMementoReader } from "app/eth-memento/data/tx/details/TxDetailsMementoReader";

export class TxDetailsMementoApi {
    constructor(
        private httpApi: HttpApi,
        private txDetailsReader: TxDetailsMementoReader,
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
