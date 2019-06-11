import { ResultReader } from "app/eth-extended/data/search/ResultReader";
import { HttpApi } from "app/eth-extended/data/HttpApi";

export class SearchHttpApi {
    constructor(
        private httpApi: HttpApi,
        private endpointUrl: string,
        private resultReader: ResultReader
    ) {

    }

    /**
     * Search for a hash or token name
     */
    async search(query: string) {
        let data = await this.httpApi.fetch(this.endpointUrl.replace("%s", query));
        return (data as any[]).map(resultRaw => this.resultReader.read(resultRaw, query));
    }
}
