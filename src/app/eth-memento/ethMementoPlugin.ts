import { IPlugin } from "plugin-api/IPlugin";
import { accountTxsModule } from "app/eth-memento/module/account/accountTxsModule";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";
import {MementoDataSourceFactory} from "app/eth-memento/MementoDataSourceFactory";
import {BlockDetailsAdapter} from "app/shared/adapter/block/BlockDetailsAdapter";
import {blockBasicModule} from "app/shared/module/block/blockBasic/blockBasicModule";
import {blockTxsModule} from "app/shared/module/block/blockTxs/blockTxsModule";
import {blockAdvancedModule} from "app/shared/module/block/blockAdvanced/blockAdvancedModule";
import {blockLogsBloomModule} from "app/shared/module/block/blockLogsBloom/blockLogsBloomModule";
import {EthPriceAdapter} from "app/shared/adapter/EthPriceAdapter";
import {BlockListAdapter} from "app/shared/adapter/block/BlockListAdapter";

const ethMementoPlugin: IPlugin = {
    init(configData: unknown, api, logger, publicPath) {
        __webpack_public_path__ = publicPath;

        let config = new EthMementoPluginConfig().fromJson(configData as any);
        let dataSource = new MementoDataSourceFactory().create(config, logger);

        let ethSymbol = config.getEthSymbol();

        api.addDataSource("source://aleth.io/memento/api", dataSource);

        api.addModuleDef("module://aleth.io/memento/account/txs", accountTxsModule({
            store: dataSource.stores.txByAccountStore,
            ethSymbol
        }));

        api.addDataAdapter("adapter://aleth.io/extended/block/details", new BlockDetailsAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/prices/latest", new EthPriceAdapter(dataSource, logger));
        api.addModuleDef("module://aleth.io/block/basic", blockBasicModule);
        api.addModuleDef("module://aleth.io/block/txs", blockTxsModule(ethSymbol));
        api.addModuleDef("module://aleth.io/block/advanced", blockAdvancedModule(ethSymbol));
        api.addModuleDef("module://aleth.io/block/logs-bloom", blockLogsBloomModule);
        api.addDataAdapter("adapter://aleth.io/block-range/summary", new BlockListAdapter(dataSource));
    },

    getAvailableLocales() {
        return ["en-US", "zh-CN"];
    },

    async loadTranslations(locale: string) {
        return await import("./translation/" + locale + ".json");
    }
};

// tslint:disable-next-line:no-default-export
export default ethMementoPlugin;

export const manifest = __plugin_manifest__;
