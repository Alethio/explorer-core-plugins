import { IDataSource } from "plugin-api/IDataSource";
import { Search } from "app/eth-lite/data/search/Search";
import { LastBlockWatcher } from "app/shared/data/watcher/LastBlockWatcher";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { BlockValueStore } from "app/shared/data/block/value/BlockValueStore";
import { BlockDetailsStore } from "app/eth-lite/data/block/details/BlockDetailsStore";
import { UncleDetailsStore } from "app/eth-lite/data/uncle/UncleDetailsStore";
import { TxDetailsStore } from "app/eth-lite/data/tx/details/TxDetailsStore";
import { TxReceiptStore } from "app/eth-lite/data/tx/receipt/TxReceiptStore";
import { AccountDetailsApi } from "app/eth-lite/data/account/AccountDetailsApi";
import { AccountBalanceApi } from "app/eth-lite/data/account/AccountBalanceApi";
import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { EthLitePluginConfig } from "app/eth-lite/EthLitePluginConfig";
import { when } from "mobx";
import { IAuthStore } from "app/eth-lite/IAuthStore";
import { ILogger } from "plugin-api";

interface IWeb3DataStores {
    blockStateStore: BlockStateStore;
    blockDetailsStore: BlockDetailsStore;
    blockValueStore: BlockValueStore;
    uncleDetailsStore: UncleDetailsStore;
    txDetailsStore: TxDetailsStore;
    txReceiptStore: TxReceiptStore;
    accountDetailsApi: AccountDetailsApi;
    accountBalanceApi: AccountBalanceApi;
    search: Search;
}

export class Web3DataSource implements IDataSource {
    dependencies: IDataSource["dependencies"];

    constructor(
        private config: EthLitePluginConfig,
        private logger: ILogger,
        private lastBlockWatcher: LastBlockWatcher,
        private web3EthApi: Web3EthApi,
        public stores: IWeb3DataStores
    ) {
        let authStoreUri = config.getAuthStoreUri();
        if (authStoreUri) {
            this.dependencies = [{
                ref: authStoreUri,
                alias: "authStore"
            }];
        }
    }

    /**
     * @param depData optional for cms v1.0.0-beta.11 backwards compatibility
     */
    async init(depData?: Map<string, unknown>) {
        // tslint:disable-next-line:no-shadowed-variable
        let Eth = await import("web3-eth").then(({ Eth }) => Eth);
        // tslint:disable-next-line:no-shadowed-variable
        let HttpProvider = await import("web3-providers").then(( { HttpProvider }) => HttpProvider);
        let nodeUrl = this.config.getNodeUrl();
        let web3Eth = new Eth(
            nodeUrl.match(/^https?:\/\/.*:.*@.*/) ?
                new HttpProvider(nodeUrl, { withCredentials: true }) :
                nodeUrl
        );
        this.web3EthApi.setWeb3Eth(web3Eth);

        const customAuthStore = depData && depData.get("authStore") as IAuthStore;
        if (customAuthStore) {
            this.logger.info(`Performing authentication using custom AuthStore ${this.config.getAuthStoreUri()}...`);
            // The data source initialization is blocked until auth is performed
            // This is needed because all data stores depend on the RPC node being ready for requests
            await new Promise<void>(resolve => when(() => customAuthStore.isAuthenticated, resolve));
            customAuthStore.applyLoginInfo(web3Eth);

        }
        this.lastBlockWatcher.watch();
    }
}
