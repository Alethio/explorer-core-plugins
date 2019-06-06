import { IDataAdapter } from "plugin-api/IDataAdapter";
import { LatestBlockWatcher } from "./LatestBlockWatcher";
import { BlockStateStore } from "app/shared/data/BlockStateStore";

export class LatestBlockNumberAdapter implements IDataAdapter<void, number> {
    contextType = {};

    constructor(private blockStateStore: BlockStateStore) {

    }

    async load(context: void) {
        return this.blockStateStore.getLatest();
    }

    createWatcher(context: void) {
        return new LatestBlockWatcher(this.blockStateStore);
    }
}
