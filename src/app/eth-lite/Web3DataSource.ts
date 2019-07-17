import { IDataSource } from "plugin-api/IDataSource";
import { Search } from "app/eth-lite/data/search/Search";
import { LastBlockWatcher } from "app/eth-lite/data/watcher/LastBlockWatcher";
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
    constructor(
        private config: EthLitePluginConfig,
        private lastBlockWatcher: LastBlockWatcher,
        private web3EthApi: Web3EthApi,
        public stores: IWeb3DataStores
    ) {

    }

    async init() {
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
        this.lastBlockWatcher.watch();
    }
}
