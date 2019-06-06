import { IDataWatcher } from "plugin-api/IDataWatcher";
import { EventDispatcher } from "@puzzl/core/lib/event/EventDispatcher";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { IReactionDisposer, autorun } from "mobx";

export class EthPriceWatcher implements IDataWatcher {
    private _onData = new EventDispatcher<void, void>();
    private reactionDisposer: IReactionDisposer | undefined;
    private lastBlockNo: number | undefined;

    get onData() {
        return this._onData.asEvent();
    }

    constructor(
        private blockStateStore: BlockStateStore,
        private refreshBlocks: number
    ) {

    }

    watch() {
        if (this.reactionDisposer) {
            throw new Error(`Already watching`);
        }
        this.reactionDisposer = autorun(() => {
            let latest = this.blockStateStore.getLatest();
            if (!this.lastBlockNo || latest - this.lastBlockNo >= this.refreshBlocks) {
                this.lastBlockNo = latest;
                this._onData.dispatch(void 0, void 0);
            }
        });
    }

    unwatch() {
        if (this.reactionDisposer) {
            this.reactionDisposer();
            this.reactionDisposer = void 0;
        }
    }
}
