import { TxLiteByAccountPendingApi } from "app/eth-extended/data/tx/lite/byAccount/pending/TxLiteByAccountPendingApi";

export class TxLiteByAccountPendingStore {
    constructor(
        private api: TxLiteByAccountPendingApi
    ) {

    }

    async fetch(accountHash: string, blockNo: number, offset: number, limit: number) {
        let data = await this.api.fetch(accountHash, blockNo, offset, limit);
        return data;
    }
}
