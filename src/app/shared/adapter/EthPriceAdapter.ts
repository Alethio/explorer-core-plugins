import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IDataAdapter } from "plugin-api/IDataAdapter";
import { ILogger } from "plugin-api/ILogger";
import { EthPriceWatcher } from "app/eth-extended/adapter/watcher/EthPriceWatcher";
import { blockContextType } from "app/shared/context/blockContextType";
import {MementoDataSource} from "app/eth-memento/MementoDataSource";

export interface IEthPriceContext {
    blockNumber: number;
}

export class EthPriceAdapter implements IDataAdapter<IEthPriceContext, number> {
    contextType = blockContextType;

    constructor(private dataSource: AlethioDataSource | MementoDataSource, private logger: ILogger) {

    }

    async load(context: IEthPriceContext) {
        let { blockStateStore, pricesStore } = this.dataSource.stores;

        if (!pricesStore) {
            return void 0;
        }

        let latest = blockStateStore.getLatest();

        let pricesResult = await pricesStore.fetch([ latest, context.blockNumber ]);

        // TODO: try/catch should be at framework level
        try {
            return pricesResult.getEthPrices(latest).prices.usd;
        } catch (e) {
            this.logger.error(e);
            return void 0;
        }
    }

    createWatcher(context: IEthPriceContext) {
        return new EthPriceWatcher(this.dataSource.stores.blockStateStore, 10);
    }
}
