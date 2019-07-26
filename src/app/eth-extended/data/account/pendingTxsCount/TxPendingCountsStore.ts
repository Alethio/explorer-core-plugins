import { TxPendingCountsApi } from "./TxPendingCountsApi";

export class TxPendingCountsStore {
    constructor(private api: TxPendingCountsApi) {

    }

    async fetch(accountHash: string) {
        return await this.api.fetch(accountHash);
    }

}
