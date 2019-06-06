import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { when, IReactionDisposer } from "mobx";
import { EventDispatcher } from "@puzzl/core/lib/event/EventDispatcher";
import { IDataWatcher } from "plugin-api/IDataWatcher";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { isPendingTxDetails } from "app/eth-extended/data/tx/details/isPendingTxDetails";
import { isFullTxDetails } from "app/eth-extended/data/tx/details/isFullTxDetails";
import { PendingTxWatcher } from "app/eth-extended/adapter/watcher/PendingTxWatcher";

export class TxDataWatcher implements IDataWatcher {
    private refreshDisposer: IReactionDisposer | undefined;
    private pendingTxHandler: () => void;
    private dataRefreshEvent = new EventDispatcher<void, void>();

    constructor(
        private blockStateStore: BlockStateStore,
        private pendingTxWatcher: PendingTxWatcher,
        private lastDetails: ITxDetails
    ) {

    }

    get onData() {
        return this.dataRefreshEvent.asEvent();
    }

    watch() {
        let txDetails = this.lastDetails;
        let txHash = txDetails.hash;

        if (!txDetails || isPendingTxDetails(txDetails)) {
            let handler = this.pendingTxHandler = () => {
                this.dataRefreshEvent.dispatch(void 0, void 0);
                this.pendingTxWatcher.unwatch(txHash, handler);
            };
            this.pendingTxWatcher.watch(txHash, handler);
        } else if (!isFullTxDetails(txDetails)) {
            let blockNumber = txDetails.block.id;
            // Make sure we don't end up in an infinite refresh if for some reason the tx is not in the db yet
            if (blockNumber <= this.blockStateStore.getLatest()) {
                // No need to refresh already consolidated blocks
                return;
            }
            this.refreshDisposer = when(() => blockNumber <= this.blockStateStore.getLatest(), () => {
                this.dataRefreshEvent.dispatch(void 0, void 0);
            });
        }
    }

    unwatch() {
        if (this.refreshDisposer) {
            this.refreshDisposer();
            this.refreshDisposer = void 0;
        }
        if (this.pendingTxHandler) {
            this.pendingTxWatcher.unwatch(this.lastDetails.hash, this.pendingTxHandler);
        }
    }
}
