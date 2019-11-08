import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { ILogger } from "plugin-api/ILogger";
import { LatestBlockNumberApi } from "app/eth-memento/data/block/latest/LatestBlockNumberApi";

export class LastBlockWatcher {
    private timeoutId: number | undefined;

    constructor(
        private api: LatestBlockNumberApi,
        private store: BlockStateStore,
        private logger: ILogger
    ) {

    }

    watch() {
        this.monitorLastBlock().catch(e => {
            this.logger.error(e);
        });
    }

    private monitorLastBlock = async () => {
        let latestBlock = await this.api.fetch();
        this.store.setLatest(latestBlock);
        this.timeoutId = setTimeout(this.monitorLastBlock, 5000);
    }

    stop() {
        if (this.timeoutId !== void 0) {
            clearTimeout(this.timeoutId);
            this.timeoutId = void 0;
        }
    }
}
