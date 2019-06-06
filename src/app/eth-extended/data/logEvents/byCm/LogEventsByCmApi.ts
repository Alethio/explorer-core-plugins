import { HttpApi } from "app/eth-extended/data/HttpApi";
import { LogEventsReader } from "../LogEventsReader";

export class LogEventsByCmApi {
    constructor(
        private httpApi: HttpApi,
        private reader: LogEventsReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(txHash: string, txValidationIndex: number) {
        let data = await this.httpApi.fetchList(
            this.endpointUrlMask
                .replace(/%s/, txHash)
                .replace(/%d/, "" + txValidationIndex)
        );

        return data.map(item => this.reader.read(item));
    }
}
