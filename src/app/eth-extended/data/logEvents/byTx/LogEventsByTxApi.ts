import { HttpApi } from "app/eth-extended/data/HttpApi";
import { LogEventsReader } from "../LogEventsReader";

export class LogEventsByTxApi {
    constructor(
        private httpApi: HttpApi,
        private reader: LogEventsReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(txHash: string) {
        let data = await this.httpApi.fetchList(
            this.endpointUrlMask.replace("%s", txHash)
        );

        return data.map(item => this.reader.read(item));
    }
}
