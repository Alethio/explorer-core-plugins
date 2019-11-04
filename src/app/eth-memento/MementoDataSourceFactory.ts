import {EthMementoPluginConfig} from "app/eth-memento/EthMementoPluginConfig";
import {ILogger} from "plugin-api";
import {BlockDetailsStoreFactory} from "app/eth-memento/data/block/details/BlockDetailsStoreFactory";
import {MementoDataSource} from "app/eth-memento/MementoDataSource";
import {BlockValueStoreFactory} from "app/eth-memento/data/block/value/BlockValueStoreFactory";

export class MementoDataSourceFactory {
    create(config: EthMementoPluginConfig, logger: ILogger) {
        let blockDetailsStore = new BlockDetailsStoreFactory(config).create();
        let blockValueStore = new BlockValueStoreFactory(config).create();


        let mementoDataSource = new MementoDataSource(
            {
                blockDetailsStore,
                blockValueStore
            }
        );

        return mementoDataSource;
    }
}
