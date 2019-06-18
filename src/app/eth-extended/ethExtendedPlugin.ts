import { IPlugin } from "plugin-api/IPlugin";
import { AlethioDataSourceFactory } from "./AlethioDataSourceFactory";
import { BlockDetailsAdapter } from "./adapter/block/BlockDetailsAdapter";
import { EthPriceAdapter } from "./adapter/EthPriceAdapter";
import { BlockConfirmationsAdapter } from "../shared/adapter/block/BlockConfirmationsAdapter";
import { BlockListAdapter } from "../shared/adapter/block/BlockListAdapter";
import { LatestBlockNumberAdapter } from "../shared/adapter/block/LatestBlockNumberAdapter";
import { SearchAdapter } from "../shared/adapter/SearchAdapter";
import { PendingPoolInfoAdapter } from "./adapter/PendingPoolInfoAdapter";
import { PropagationInfoAdapter } from "./adapter/PropagationInfoAdapter";
import { EthNodesInfoAdapter } from "./adapter/EthNodesInfoAdapter";
import { UncleDetailsAdapter } from "./adapter/uncle/UncleDetailsAdapter";
import { TxDetailsAdapter } from "./adapter/tx/TxDetailsAdapter";
import { txSummaryModule } from "./module/tx/txSummary/txSummaryModule";
import { cmParentContext } from "./context/cmParentContext";
import { cmPage } from "./page/cm/cmPage";
import { CmDetailsAdapter } from "./adapter/cm/CmDetailsAdapter";
import { cmListModule } from "./module/cm/cmList/cmListModule";
import { cmDetailsModule } from "./module/cm/cmDetails/cmDetailsModule";
import { cmSummaryModule } from "./module/cm/cmSummary/cmSummaryModule";
import { cmPayloadModule } from "./module/cm/cmPayload/cmPayloadModule";
import { txPayloadModule } from "./module/tx/txPayload/txPayloadModule";
import { AccountDetailsAdapter } from "./adapter/account/AccountDetailsAdapter";
import { AccountBalanceAdapter } from "./adapter/account/AccountBalanceAdapter";
import { accountBalanceModule } from "./module/account/balance/accountBalanceModule";
import { accountSummaryModule } from "./module/account/summary/accountSummaryModule";
import { accountContractModule } from "./module/account/contract/accountContractModule";
import { accountDetailsModule } from "./module/account/accountDetails/accountDetailsModule";
import { avgTimeInPoolChartModule } from "./module/dashboard/charts/avgTimeInPoolChartModule";
import { propagationChartModule } from "./module/dashboard/charts/propagationChartModule";
import { ethstatsModule } from "./module/toolbar/ethstatsModule";
import { BlockAvgTxTimeInPoolAdapter } from "./adapter/block/BlockAvgTxTimeInPoolAdapter";
import { blockDetailsModule } from "./module/block/blockDetails/blockDetailsModule";
import { unclePage } from "./page/uncle/unclePage";
import { uncleDetailsModule } from "app/shared/module/uncle/uncleDetails/uncleDetailsModule";
import { blockTxsModule } from "./module/block/blockTxs/blockTxsModule";
import { txParentBlockContext } from "app/eth-extended/context/txParentBlockContext";
import { txParentBlockOptionalContext } from "app/eth-extended/context/txParentBlockOptionalContext";
import { txDetailsModule } from "app/eth-extended/module/tx/txDetails/txDetailsModule";
import { BlockBasicInfoAdapter } from "app/shared/adapter/block/BlockBasicInfoAdapter";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { dashboardPage } from "app/eth-extended/page/dashboard/dashboardPage";
import { alethioApiModule as toolbarApiModule } from "app/eth-extended/module/toolbar/alethioApiModule";
import {
    alethioMonitoringModule as toolbarMonitoringModule
} from "app/eth-extended/module/toolbar/alethioMonitoringModule";
import { alethioReportsModule as toolbarReportsModule } from "app/eth-extended/module/toolbar/alethioReportsModule";
import { alethioApiModule as topbarApiModule } from "app/eth-extended/module/topbar/alethioApiModule";
import {
    alethioMonitoringModule as topbarMonitoringModule
} from "app/eth-extended/module/topbar/alethioMonitoringModule";
import { alethioReportsModule as topbarReportsModule } from "app/eth-extended/module/topbar/alethioReportsModule";
import { uncleByHashContextType } from "app/eth-extended/context/uncleByHashContextType";
import {
    alethioCompanyModule as toolbarAlethioCompanyModule
} from "app/eth-extended/module/toolbar/alethioCompanyModule";
import {
    alethioCompanyModule as topbarAlethioCompanyModule
} from "app/eth-extended/module/topbar/alethioCompanyModule";

const ethExtendedPlugin: IPlugin = {
    init(config, api, logger, publicPath) {
        __webpack_public_path__ = publicPath;

        let dataSource = new AlethioDataSourceFactory().create(config, logger);

        api.addDataSource("source://aleth.io/api", dataSource);

        api.addDataAdapter("adapter://aleth.io/block/basic", new BlockBasicInfoAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/extended/block/details", new BlockDetailsAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/block/details", new BlockDetailsAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/prices/latest", new EthPriceAdapter(dataSource, logger));
        api.addDataAdapter("adapter://aleth.io/block/confirmations",
            new BlockConfirmationsAdapter(dataSource.stores.blockStateStore));
        api.addDataAdapter("adapter://aleth.io/block-range/summary", new BlockListAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/block/latestNo",
            new LatestBlockNumberAdapter(dataSource.stores.blockStateStore));
        api.addModuleDef("module://aleth.io/block/details", blockDetailsModule);
        api.addModuleDef("module://aleth.io/block/txs", blockTxsModule);

        api.addPageDef("page://aleth.io/uncle", unclePage);
        api.addDataAdapter("adapter://aleth.io/extended/uncle/details", new UncleDetailsAdapter(dataSource));
        api.addModuleDef("module://aleth.io/uncle/details",
            uncleDetailsModule(AlethioAdapterType.UncleDetailsExtended, uncleByHashContextType));

        api.addContextDef("context://aleth.io/extended/tx/parentBlock", txParentBlockContext);
        api.addContextDef("context://aleth.io/extended/tx/parentBlock?optional", txParentBlockOptionalContext);
        api.addDataAdapter("adapter://aleth.io/extended/tx/details", new TxDetailsAdapter(dataSource));
        api.addModuleDef("module://aleth.io/tx/details", txDetailsModule);
        api.addModuleDef("module://aleth.io/tx/summary", txSummaryModule(dataSource));
        api.addModuleDef("module://aleth.io/tx/payload", txPayloadModule);

        api.addDataAdapter("adapter://aleth.io/extended/account/details", new AccountDetailsAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/extended/account/balance?latest",
            new AccountBalanceAdapter(dataSource, false));
        api.addDataAdapter("adapter://aleth.io/extended/account/balance?historical",
            new AccountBalanceAdapter(dataSource, true));
        api.addModuleDef("module://aleth.io/account/details", accountDetailsModule);
        api.addModuleDef("module://aleth.io/account/balance", accountBalanceModule);
        api.addModuleDef("module://aleth.io/account/summary", accountSummaryModule(dataSource));
        api.addModuleDef("module://aleth.io/account/contract", accountContractModule(dataSource));

        api.addPageDef("page://aleth.io/cm", cmPage);
        api.addDataAdapter("adapter://aleth.io/cm/details", new CmDetailsAdapter(dataSource));
        api.addContextDef("context://aleth.io/cm/parent", cmParentContext);
        api.addModuleDef("module://aleth.io/cm/list", cmListModule(dataSource));
        api.addModuleDef("module://aleth.io/cm/details", cmDetailsModule);
        api.addModuleDef("module://aleth.io/cm/summary", cmSummaryModule(dataSource));
        api.addModuleDef("module://aleth.io/cm/payload", cmPayloadModule);

        api.addDataAdapter("adapter://aleth.io/search/v2", new SearchAdapter(dataSource.stores.search));
        api.addDataAdapter("adapter://aleth.io/avgTxTimeInPool", new BlockAvgTxTimeInPoolAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/pendingPoolInfo", new PendingPoolInfoAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/propagationInfo", new PropagationInfoAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/ethNodesInfo", new EthNodesInfoAdapter(dataSource));

        api.addModuleDef("module://aleth.io/toolbar/ethstats", ethstatsModule(config.ethstatsUrl));

        api.addModuleDef("module://aleth.io/toolbar/alethioApi", toolbarApiModule(config.alethioApiUrl));
        api.addModuleDef("module://aleth.io/topbar/alethioApi", topbarApiModule(config.alethioApiUrl));

        api.addModuleDef("module://aleth.io/toolbar/alethioMonitoring",
            toolbarMonitoringModule(config.alethioMonitoringUrl));
        api.addModuleDef("module://aleth.io/topbar/alethioMonitoring",
            topbarMonitoringModule(config.alethioMonitoringUrl));

        api.addModuleDef("module://aleth.io/toolbar/alethioReports", toolbarReportsModule(config.alethioReportsUrl));
        api.addModuleDef("module://aleth.io/topbar/alethioReports", topbarReportsModule(config.alethioReportsUrl));

        api.addModuleDef("module://aleth.io/toolbar/company", toolbarAlethioCompanyModule(config.companyUrl));
        api.addModuleDef("module://aleth.io/topbar/company", topbarAlethioCompanyModule(config.companyUrl));

        api.addPageDef("page://aleth.io/dashboard", dashboardPage);
        api.addModuleDef("module://aleth.io/dashboard/avgTimeInPoolChart", avgTimeInPoolChartModule);
        api.addModuleDef("module://aleth.io/dashboard/propagationChart", propagationChartModule(config.ethstatsUrl));
    },

    getAvailableLocales() {
        return ["en-US", "zh-CN"];
    },

    async loadTranslations(locale: string) {
        return await import("./translation/" + locale + ".json");
    }
};

// tslint:disable-next-line:no-default-export
export default ethExtendedPlugin;
