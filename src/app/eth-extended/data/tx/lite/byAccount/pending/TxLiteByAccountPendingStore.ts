import { TxLiteByAccountPendingApi } from "app/eth-extended/data/tx/lite/byAccount/pending/TxLiteByAccountPendingApi";

export class TxLiteByAccountPendingStore {
    constructor(
        private api: TxLiteByAccountPendingApi
    ) {

    }

    async fetch(accountHash: string, offset: number, limit: number) {
        let data = await this.api.fetch(accountHash, offset, limit);
        return data;
    }
}
