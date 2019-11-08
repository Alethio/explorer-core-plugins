import { Web3DataSource } from "app/eth-lite/Web3DataSource";
import { EthLitePluginConfig } from "app/eth-lite/EthLitePluginConfig";
import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { SearchFactory } from "app/eth-lite/data/search/SearchFactory";
import { LastBlockWatcher } from "app/shared/data/watcher/LastBlockWatcher";
import { ILogger } from "plugin-api/ILogger";
import { BlockValueStoreFactory } from "app/eth-lite/data/block/value/BlockValueStoreFactory";
import { BlockDetailsStoreFactory } from "app/eth-lite/data/block/details/BlockDetailsStoreFactory";
import { UncleDetailsStoreFactory } from "app/eth-lite/data/uncle/UncleDetailsStoreFactory";
import { TxDetailsStoreFactory } from "app/eth-lite/data/tx/details/TxDetailsStoreFactory";
import { TxReceiptStoreFactory } from "app/eth-lite/data/tx/receipt/TxReceiptStoreFactory";
import { AccountBalanceApi } from "app/eth-lite/data/account/AccountBalanceApi";
import { AccountDetailsApi } from "app/eth-lite/data/account/AccountDetailsApi";
import { AccountDetailsReader } from "app/eth-lite/data/account/AccountDetailsReader";

export class Web3DataSourceFactory {
    create(config: EthLitePluginConfig, logger: ILogger) {
        let web3EthApi = new Web3EthApi();

        let blockStateStore = new BlockStateStore();
        let lastBlockWatcher = new LastBlockWatcher(web3EthApi, blockStateStore, logger);

        let blockDetailsStore = new BlockDetailsStoreFactory(web3EthApi).create();
        let blockValueStore = new BlockValueStoreFactory(web3EthApi).create();

        let uncleDetailsStore = new UncleDetailsStoreFactory(web3EthApi).create();

        let txDetailsStore = new TxDetailsStoreFactory(web3EthApi).create();
        let txReceiptStore = new TxReceiptStoreFactory(web3EthApi).create();

        let accountBalanceApi = new AccountBalanceApi(web3EthApi);
        let accountDetailsApi = new AccountDetailsApi(web3EthApi, new AccountDetailsReader());

        let search = new SearchFactory(web3EthApi).create(blockStateStore);

        return new Web3DataSource(
            config,
            lastBlockWatcher,
            web3EthApi,
            {
                blockStateStore,
                blockDetailsStore,
                blockValueStore,
                uncleDetailsStore,
                txDetailsStore,
                txReceiptStore,
                accountBalanceApi,
                accountDetailsApi,
                search
            }
        );
    }
}
