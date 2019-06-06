import { ResultReader } from "app/eth-extended/data/search/ResultReader";
import { HttpApi } from "app/eth-extended/data/HttpApi";
import { NotFoundError } from "app/eth-extended/data/NotFoundError";

export class SearchHttpApi {
    constructor(
        private httpApi: HttpApi,
        private endpointUrl: string,
        private resultReader: ResultReader
    ) {

    }

    /**
     * Search for a tx / block / uncle hash
     */
    async search(hash: string) {
        let data: any;
        try {
            data = await this.httpApi.fetch(this.endpointUrl.replace("%s", "0x" + hash.replace(/^0x/, "")));
        } catch (e) {
            if (e instanceof NotFoundError) {
                return void 0;
            }
            throw e;
        }

        return this.resultReader.read(data);
    }
}
