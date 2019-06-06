import { IPlugin } from "plugin-api/IPlugin";
import { dashboardPage } from "app/eth-lite/page/dashboardPage";
import { Web3DataSourceFactory } from "app/eth-lite/Web3DataSourceFactory";
import { SearchAdapter } from "app/shared/adapter/SearchAdapter";
import { LatestBlockNumberAdapter } from "app/shared/adapter/block/LatestBlockNumberAdapter";
import { BlockListAdapter } from "app/shared/adapter/block/BlockListAdapter";
import { BlockDetailsAdapter } from "app/eth-lite/adapter/block/BlockDetailsAdapter";
import { blockDetailsModule } from "app/eth-lite/module/block/blockDetails/blockDetailsModule";
import { BlockConfirmationsAdapter } from "app/shared/adapter/block/BlockConfirmationsAdapter";
import { unclePage } from "app/eth-lite/page/unclePage";
import { uncleDetailsModule } from "app/shared/module/uncle/uncleDetails/uncleDetailsModule";
import { UncleDetailsAdapter } from "app/eth-lite/adapter/uncle/UncleDetailsAdapter";
import { blockTxsModule } from "app/eth-lite/module/block/blockTxs/blockTxsModule";
import { txParentBlockContext } from "app/eth-lite/context/txParentBlockContext";
import { TxDetailsAdapter } from "app/eth-lite/adapter/tx/TxDetailsAdapter";
import { TxReceiptAdapter } from "app/eth-lite/adapter/tx/TxReceiptAdapter";
import { txDetailsModule } from "app/eth-lite/module/tx/txDetails/txDetailsModule";
import { AccountDetailsAdapter } from "app/eth-lite/adapter/account/AccountDetailsAdapter";
import { AccountBalanceAdapter } from "app/eth-lite/adapter/account/AccountBalanceAdapter";
import { accountDetailsModule } from "app/eth-lite/module/account/accountDetailsModule";
import { accountContractModule } from "app/eth-lite/module/account/accountContractModule";
import { BlockBasicInfoAdapter } from "app/shared/adapter/block/BlockBasicInfoAdapter";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { uncleByIndexContextType } from "app/eth-lite/context/uncleByIndexContextType";

const ethLitePlugin: IPlugin = {
    init(config, api, logger, publicPath) {
        __webpack_public_path__ = publicPath;

        let dataSource = new Web3DataSourceFactory().create(config, logger);

        api.addDataSource("source://aleth.io/web3", dataSource);

        api.addPageDef("page://aleth.io/dashboard", dashboardPage);
        api.addDataAdapter("adapter://aleth.io/search", new SearchAdapter(dataSource.stores.search));

        api.addDataAdapter("adapter://aleth.io/block/latestNo",
            new LatestBlockNumberAdapter(dataSource.stores.blockStateStore));
        api.addDataAdapter("adapter://aleth.io/block/basic", new BlockBasicInfoAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/lite/block/details", new BlockDetailsAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/block/details", new BlockDetailsAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/block-range/summary", new BlockListAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/block/confirmations",
            new BlockConfirmationsAdapter(dataSource.stores.blockStateStore));

        api.addModuleDef("module://aleth.io/lite/block/details", blockDetailsModule);
        api.addModuleDef("module://aleth.io/lite/block/txs", blockTxsModule);

        api.addPageDef("page://aleth.io/uncle", unclePage);
        api.addDataAdapter("adapter://aleth.io/lite/uncle/details", new UncleDetailsAdapter(dataSource));
        api.addModuleDef("module://aleth.io/lite/uncle/details",
            uncleDetailsModule(AlethioAdapterType.UncleDetailsLite, uncleByIndexContextType));

        api.addContextDef("context://aleth.io/lite/tx/parentBlock", txParentBlockContext);
        api.addDataAdapter("adapter://aleth.io/lite/tx/details", new TxDetailsAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/lite/tx/receipt", new TxReceiptAdapter(dataSource));
        api.addModuleDef("module://aleth.io/lite/tx/details", txDetailsModule);

        api.addDataAdapter("adapter://aleth.io/lite/account/details", new AccountDetailsAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/lite/account/balance", new AccountBalanceAdapter(dataSource));
        api.addModuleDef("module://aleth.io/lite/account/details", accountDetailsModule);
        api.addModuleDef("module://aleth.io/lite/account/contract", accountContractModule);
    },

    getAvailableLocales() {
        return ["en-US", "zh-CN"];
    },

    async loadTranslations(locale: string) {
        return await import("./translation/" + locale + ".json");
    }
};

// tslint:disable-next-line:no-default-export
export default ethLitePlugin;
