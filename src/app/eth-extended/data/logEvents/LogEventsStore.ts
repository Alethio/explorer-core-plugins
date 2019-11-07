import { LogEventsByTxStore } from "../../../shared/data/logEvents/byTx/LogEventsByTxStore";
import { LogEventsByCmStore } from "./byCm/LogEventsByCmStore";

export class LogEventsStore {
    constructor(
        private byTx: LogEventsByTxStore,
        private byCm: LogEventsByCmStore
    ) {

    }

    fetchByTx(txHash: string) {
        return this.byTx.fetch(txHash);
    }

    fetchByCm(txHash: string, txValidationIndex: number) {
        return this.byCm.fetch(txHash, txValidationIndex);
    }
}
