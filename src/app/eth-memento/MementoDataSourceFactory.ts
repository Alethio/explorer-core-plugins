import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";
import { ILogger } from "plugin-api";
import { BlockDetailsStoreFactory } from "app/shared/data/block/details/BlockDetailsStoreFactory";
import { MementoDataSource } from "app/eth-memento/MementoDataSource";
import { TxLiteByAccountStoreFactory } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStoreFactory";
import { BlockValueStoreFactory } from "app/shared/data/block/value/BlockValueStoreFactory";
import { TxDetailsStoreFactory } from "app/eth-memento/data/tx/details/TxDetailsStoreFactory";
import { LogEventsStoreFactory } from "app/eth-memento/data/logEvents/LogEventsStoreFactory";
import { UncleDetailsStoreFactory } from "app/shared/data/uncle/UncleDetailsStoreFactory";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { LatestBlockNumberApiFactory } from "app/eth-memento/data/block/latest/LatestBlockNumberApiFactory";
import { LastBlockWatcher } from "app/eth-memento/data/watcher/LastBlockWatcher";
import { SearchFactory } from "app/eth-memento/data/search/SearchFactory";

export class MementoDataSourceFactory {
    create(config: EthMementoPluginConfig, logger: ILogger) {
        let blockStateStore = new BlockStateStore();

        let latestBlockApi = new LatestBlockNumberApiFactory(config).create();
        let lastBlockWatcher = new LastBlockWatcher(latestBlockApi, blockStateStore, logger);

        let blockDetailsStore = new BlockDetailsStoreFactory(config).create();
        let blockValueStore = new BlockValueStoreFactory(config).create();
        let txByAccountStore = new TxLiteByAccountStoreFactory(config).create();
        let txDetailsStore = new TxDetailsStoreFactory(config).create();
        let logEventsStore = new LogEventsStoreFactory(config).create();
        let uncleDetailsStore = new UncleDetailsStoreFactory(config).create();

        let search = new SearchFactory(config).create(blockStateStore);

        let mementoDataSource = new MementoDataSource(
            lastBlockWatcher,
            {
                blockStateStore,
                blockDetailsStore,
                blockValueStore,
                txDetailsStore,
                txByAccountStore,
                logEventsStore,
                uncleDetailsStore,
                search
            }
        );

        return mementoDataSource;
    }
}
