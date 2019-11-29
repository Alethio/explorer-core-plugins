import { IDataAdapter } from "plugin-api/IDataAdapter";
import { ILogger } from "plugin-api/ILogger";
import { EthPriceWatcher } from "app/eth-extended/adapter/watcher/EthPriceWatcher";
import { blockContextType } from "app/shared/context/blockContextType";
import { PricesStore } from "app/eth-extended/data/prices/PricesStore";
import { BlockStateStore } from "app/shared/data/BlockStateStore";

export interface IEthPriceContext {
    blockNumber: number;
}

export class EthPriceAdapter implements IDataAdapter<IEthPriceContext, number> {
    contextType = blockContextType;

    constructor(private pricesStore: PricesStore, private blockStateStore: BlockStateStore, private logger: ILogger) {

    }

    async load(context: IEthPriceContext) {
        let latest = this.blockStateStore.getLatest();

        let pricesResult = await this.pricesStore.fetch([ latest, context.blockNumber ]);

        // TODO: try/catch should be at framework level
        try {
            return pricesResult.getEthPrices(latest).prices.usd;
        } catch (e) {
            this.logger.error(e);
            return void 0;
        }
    }

    createWatcher(context: IEthPriceContext) {
        return new EthPriceWatcher(this.blockStateStore, 10);
    }
}
