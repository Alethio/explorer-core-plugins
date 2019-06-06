import { HttpApi } from "app/eth-extended/data/HttpApi";
import { UncleDetailsReader } from "app/eth-extended/data/uncle/UncleDetailsReader";
import { NotFoundError } from "app/eth-extended/data/NotFoundError";

export class UncleDetailsApi {
    constructor(
        private httpApi: HttpApi,
        private uncleDetailsReader: UncleDetailsReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(uncleHash: string) {
        let data = await this.httpApi.fetch(
            this.endpointUrlMask.replace("%s", uncleHash)
        );

        if (!data) {
            throw new NotFoundError(`No data found for uncle "${uncleHash}"`);
        }

        return this.uncleDetailsReader.read(data);
    }
}
