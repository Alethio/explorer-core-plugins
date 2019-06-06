import { TxLiteByAccountMinedStore } from "./mined/TxLiteByAccountMinedStore";
import { TxLiteByAccountPendingStore } from "./pending/TxLiteByAccountPendingStore";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { ICursor } from "app/eth-extended/data/contractMsg/lite/byAccount/ICursor";
import { EventDispatcher } from "@puzzl/core/lib/event/EventDispatcher";

export class TxLiteByAccountStore {
    private _onFetchPending = new EventDispatcher<this, string>();

    get onFetchPending() {
        return this._onFetchPending.asEvent();
    }

    constructor(
        private minedStore: TxLiteByAccountMinedStore,
        private pendingStore: TxLiteByAccountPendingStore,
        private blockStateStore: BlockStateStore
    ) {

    }

    async fetchPending(accountHash: string, offset: number, limit: number) {
        let latestBlock = this.blockStateStore.getLatest();
        let pendingTxs = await this.pendingStore.fetch(
            accountHash, latestBlock, offset, limit
        );

        this._onFetchPending.dispatch(this, accountHash);

        return pendingTxs;
    }

    async fetchMined(accountHash: string, atCursor: ICursor | undefined, limit: number) {
        if (!atCursor) {
            let latestBlock = this.blockStateStore.getLatest();
            atCursor = {
                blockNo: latestBlock + 1,
                blockMsgValidationIndex: 0
            };
        }

        return await this.minedStore.fetch(accountHash, atCursor as ICursor, limit);
    }
}
