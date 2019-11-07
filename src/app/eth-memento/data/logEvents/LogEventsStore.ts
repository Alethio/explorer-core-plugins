import { LogEventsByTxStore } from "app/shared/data/logEvents/byTx/LogEventsByTxStore";

export class LogEventsStore {
    constructor(
        private byTx: LogEventsByTxStore
    ) {

    }

    fetchByTx(txHash: string) {
        return this.byTx.fetch(txHash);
    }
}
