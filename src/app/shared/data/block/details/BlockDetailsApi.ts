import { HttpApi } from "app/shared/data/HttpApi";
import { BlockDetailsReader } from "./BlockDetailsReader";

export class BlockDetailsApi {
    constructor(
        private httpApi: HttpApi,
        private blockDetailsReader: BlockDetailsReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(blockId: number) {
        let data = await this.httpApi.fetch(
            this.endpointUrlMask.replace("%d", "" + blockId)
        );

        if (!data) {
            throw new Error(`No data found for block #${blockId}`);
        }

        return this.blockDetailsReader.read(data);
    }
}
