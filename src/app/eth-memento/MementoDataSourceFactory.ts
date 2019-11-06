import {EthMementoPluginConfig} from "app/eth-memento/EthMementoPluginConfig";
import {ILogger} from "plugin-api";
import {BlockDetailsStoreFactory} from "app/shared/data/block/details/BlockDetailsStoreFactory";
import {MementoDataSource} from "app/eth-memento/MementoDataSource";
import {TxLiteByAccountStoreFactory} from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStoreFactory";
import {BlockStateStore} from "app/shared/data/BlockStateStore";
import {BlockValueStoreFactory} from "app/eth-extended/data/block/value/BlockValueStoreFactory";

export class MementoDataSourceFactory {
    create(config: EthMementoPluginConfig, logger: ILogger) {
        let blockStateStore = new BlockStateStore();
        let blockDetailsStore = new BlockDetailsStoreFactory(config).create();
        let blockValueStore = new BlockValueStoreFactory(config).create();
        let txByAccountStore = new TxLiteByAccountStoreFactory(config).create();

        // no need for prices
        let pricesStore;

        let mementoDataSource = new MementoDataSource(
            {
                blockStateStore,
                blockDetailsStore,
                blockValueStore,
                txByAccountStore,
                pricesStore
            }
        );

        return mementoDataSource;
    }
}
