import { HttpApi } from "app/shared/data/HttpApi";
import { LatestBlockNumberReader } from "./LatestBlockNumberReader";

export class LatestBlockNumberApi {
    constructor(
        private httpApi: HttpApi,
        private latestBlockNumberReader: LatestBlockNumberReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch() {
        let data = await this.httpApi.fetch(
            this.endpointUrlMask.replace("%d", "latest")
        );

        if (!data) {
            throw new Error(`No data found for block #latest`);
        }

        return this.latestBlockNumberReader.read(data);
    }
}
