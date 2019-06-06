import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { ILogger } from "plugin-api/ILogger";

export class LastBlockWatcher {
    private timeoutId: number | undefined;

    constructor(
        private api: Web3EthApi,
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
        let latestBlock = await this.api.getLatestBlock();
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
