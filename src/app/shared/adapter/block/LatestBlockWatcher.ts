import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { ObservableWatcher } from "plugin-api/watcher/ObservableWatcher";

export class LatestBlockWatcher extends ObservableWatcher {
    constructor(private blockStateStore: BlockStateStore, throttleSeconds = 0) {
        super(() => this.blockStateStore.getLatest(), throttleSeconds);
    }
}
