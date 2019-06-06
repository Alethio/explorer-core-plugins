import { IPlugin } from "plugin-api/IPlugin";
import { blockPage } from "./page/block/blockPage";
import { blockListModule } from "./module/block/blockList/blockListModule";
import { blockConfirmationsModule } from "./module/block/blockConfirmationsModule";
import { blockListContext } from "./context/blockListContext";
import { searchModule } from "./module/search/searchModule";
import { latestBlockContext } from "./context/latestBlockContext";
import { latestBlockInfoModule } from "./module/block/latestBlockInfo/latestBlockInfoModule";
import { txPage } from "app/eth-common/page/tx/txPage";
import { txListModule } from "app/eth-common/module/tx/txList/txListModule";
import { accountPage } from "app/eth-common/page/account/accountPage";
import { identiconModule as accountIdenticonModule } from "./module/account/identicon/accountIdenticonModule";
import { toolbarSearchModule } from "app/eth-common/module/search/toolbarSearchModule";
import { toolbarFeedbackModule } from "app/eth-common/module/toolbar/toolbarFeedbackModule";
import { topbarSearchModule } from "app/eth-common/module/search/topbarSearchModule";
import { topbarFeedbackModule } from "app/eth-common/module/toolbar/topbarFeedbackModule";
import { SearchInlineStore } from "app/eth-common/module/search/SearchInlineStore";
import { privacyPolicyPage } from "app/eth-common/page/privacy-policy/privacyPolicyPage";
import { latestBlockRangeContext } from "app/eth-common/context/latestBlockRangeContext";
import { chartsModule } from "app/eth-common/module/dashboard/chartsModule";
import { blocksChartModule } from "app/eth-common/module/dashboard/blocksChart/blocksChartModule";

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

        api.addModuleDef("module://aleth.io/dashboard/charts", chartsModule);
        api.addModuleDef("module://aleth.io/dashboard/blocksChart", blocksChartModule);
        api.addContextDef("context://aleth.io/dashboard/latestBlockRange", latestBlockRangeContext);
        api.addModuleDef("module://aleth.io/dashboard/latestBlockInfo", latestBlockInfoModule);

        api.addModuleDef("module://aleth.io/toolbar/feedback", toolbarFeedbackModule);
        api.addModuleDef("module://aleth.io/topbar/feedback", topbarFeedbackModule);

        let searchInlineStore = new SearchInlineStore();
        api.addModuleDef("module://aleth.io/search", searchModule(searchInlineStore));
        api.addModuleDef("module://aleth.io/toolbar/search", toolbarSearchModule(searchInlineStore));
        api.addModuleDef("module://aleth.io/topbar/search", topbarSearchModule(searchInlineStore));

        api.addPageDef("page://aleth.io/privacy-policy", privacyPolicyPage);
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
