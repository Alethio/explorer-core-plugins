import { IPlugin } from "plugin-api";
import { blockPage } from "./page/block/blockPage";
import { blockListModule } from "./module/block/blockList/blockListModule";
import { blockConfirmationsModule } from "./module/block/blockConfirmationsModule";
import { blockListContext } from "./context/blockListContext";
import { searchModule } from "./module/search/searchModule";
import { latestBlockContext } from "./context/latestBlockContext";
import { latestBlockInfoModule } from "./module/block/latestBlockInfo/latestBlockInfoModule";
import { txPage } from "./page/tx/txPage";
import { txListModule } from "./module/tx/txList/txListModule";
import { accountPage } from "./page/account/accountPage";
import { identiconModule as accountIdenticonModule } from "./module/account/identicon/accountIdenticonModule";
import { toolbarSearchModule } from "./module/search/toolbarSearchModule";
import { toolbarFeedbackModule } from "./module/toolbar/feedback/toolbarFeedbackModule";
import { topbarSearchModule } from "./module/search/topbarSearchModule";
import { topbarFeedbackModule } from "./module/toolbar/feedback/topbarFeedbackModule";
import { SearchInlineStore } from "./module/search/SearchInlineStore";
import { privacyPolicyPage } from "./page/privacy-policy/privacyPolicyPage";
import { latestBlockRangeContext } from "./context/latestBlockRangeContext";
import { chartsModule } from "./module/dashboard/chartsModule";
import { blocksChartModule } from "./module/dashboard/blocksChart/blocksChartModule";
import { ethstatsModule } from "./module/toolbar/ethstatsModule";
import { alethioApiModule as toolbarApiModule } from "./module/toolbar/alethioApiModule";
import { alethioMonitoringModule as toolbarMonitoringModule } from "./module/toolbar/alethioMonitoringModule";
import { alethioReportsModule as toolbarReportsModule } from "./module/toolbar/alethioReportsModule";
import { alethioApiModule as topbarApiModule } from "./module/topbar/alethioApiModule";
import { alethioMonitoringModule as topbarMonitoringModule } from "./module/topbar/alethioMonitoringModule";
import { alethioReportsModule as topbarReportsModule } from "./module/topbar/alethioReportsModule";
import { alethioCompanyModule as toolbarAlethioCompanyModule } from "./module/toolbar/alethioCompanyModule";
import { alethioCompanyModule as topbarAlethioCompanyModule } from "./module/topbar/alethioCompanyModule";
import { networkModule } from "./module/dashboard/networkModule";
import { cookieBannerModule } from "./module/cookieBannerModule";
import { CookieBannerState } from "@alethio/explorer-ui/lib/cookieBanner/CookieBannerState";
import { StorageFactory } from "app/shared/storage/StorageFactory";

const ethCommonPlugin: IPlugin = {
    init(config, api, logger, publicPath) {
        __webpack_public_path__ = publicPath;

        api.addPageDef("page://aleth.io/block", blockPage);
        api.addContextDef("context://aleth.io/block/list", blockListContext);
        api.addContextDef("context://aleth.io/block/latest", latestBlockContext);
        api.addModuleDef("module://aleth.io/block/list", blockListModule);
        api.addModuleDef("module://aleth.io/block/confirmations", blockConfirmationsModule);

        api.addPageDef("page://aleth.io/tx", txPage);
        api.addModuleDef("module://aleth.io/tx/list", txListModule);

        api.addPageDef("page://aleth.io/account", accountPage);
        api.addModuleDef("module://aleth.io/account/identicon", accountIdenticonModule);

        api.addModuleDef("module://aleth.io/dashboard/network", networkModule);

        api.addModuleDef("module://aleth.io/dashboard/charts", chartsModule);
        api.addModuleDef("module://aleth.io/dashboard/blocksChart", blocksChartModule);
        api.addContextDef("context://aleth.io/dashboard/latestBlockRange", latestBlockRangeContext);
        api.addModuleDef("module://aleth.io/dashboard/latestBlockInfo", latestBlockInfoModule);

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

        api.addModuleDef("module://aleth.io/toolbar/feedback", toolbarFeedbackModule);
        api.addModuleDef("module://aleth.io/topbar/feedback", topbarFeedbackModule);

        let searchInlineStore = new SearchInlineStore();
        api.addModuleDef("module://aleth.io/search", searchModule(searchInlineStore));
        api.addModuleDef("module://aleth.io/toolbar/search", toolbarSearchModule(searchInlineStore));
        api.addModuleDef("module://aleth.io/topbar/search", topbarSearchModule(searchInlineStore));

        let storage = new StorageFactory(window.localStorage).create();

        api.addPageDef("page://aleth.io/privacy-policy", privacyPolicyPage);
        api.addModuleDef("module://aleth.io/cookie-banner", cookieBannerModule(
            new CookieBannerState(storage)));
    },

    getAvailableLocales() {
        return ["en-US", "zh-CN"];
    },

    async loadTranslations(locale: string) {
        return await import("./translation/" + locale + ".json");
    }
};

// tslint:disable-next-line:no-default-export
export default ethCommonPlugin;

export const manifest = __plugin_manifest__;
