import { HttpApi } from "app/shared/data/HttpApi";
import { SearchReader } from "./SearchReader";

export class SearchApi {
    constructor(
        private httpApi: HttpApi,
        private searchReader: SearchReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(query: string) {
        let data = await this.httpApi.fetch(
            this.endpointUrlMask.replace("%s", query)
        );

        if (!data) {
            throw new Error(`No data found for query ${query}`);
        }

        return this.searchReader.read(data);
    }
}
