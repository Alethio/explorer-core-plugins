import { IPlugin } from "plugin-api/IPlugin";
import { accountTxsModule } from "app/eth-memento/module/account/accountTxsModule";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";
import { MementoDataSourceFactory } from "app/eth-memento/MementoDataSourceFactory";
import { BlockDetailsAdapter } from "app/shared/adapter/block/BlockDetailsAdapter";
import { blockBasicModule } from "app/shared/module/block/blockBasic/blockBasicModule";
import { blockTxsModule } from "app/shared/module/block/blockTxs/blockTxsModule";
import { blockAdvancedModule } from "app/shared/module/block/blockAdvanced/blockAdvancedModule";
import { blockLogsBloomModule } from "app/shared/module/block/blockLogsBloom/blockLogsBloomModule";
import { BlockListAdapter } from "app/shared/adapter/block/BlockListAdapter";
import { NullEthPriceAdapter } from "app/eth-memento/adapter/NullEthPriceAdapter";
import { txParentBlockContext } from "app/shared/context/txParentBlockContext";
import { txBasicModule } from "app/shared/module/tx/txBasic/txBasicModule";
import { TxDetailsAdapter } from "app/eth-memento/adapter/tx/TxDetailsAdapter";
import { txAdvancedModule } from "app/shared/module/tx/txAdvanced/txAdvancedModule";
import { BlockBasicInfoAdapter } from "app/shared/adapter/block/BlockBasicInfoAdapter";
import { txPayloadModule } from "app/shared/module/tx/txPayload/txPayloadModule";
import { txSummaryModule } from "app/eth-memento/module/tx/txSummary/txSummaryModule";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";

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

        api.addDataAdapter("adapter://aleth.io/block/basic", new BlockBasicInfoAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/full/block/details", new BlockDetailsAdapter(dataSource));
        api.addDataAdapter("adapter://aleth.io/prices/latest", new NullEthPriceAdapter());
        api.addDataAdapter("adapter://aleth.io/block-range/summary", new BlockListAdapter(dataSource));
        api.addModuleDef("module://aleth.io/memento/block/basic", blockBasicModule);
        api.addModuleDef("module://aleth.io/memento/block/txs", blockTxsModule(ethSymbol));
        api.addModuleDef("module://aleth.io/memento/block/advanced", blockAdvancedModule(ethSymbol));
        api.addModuleDef("module://aleth.io/memento/block/logs-bloom", blockLogsBloomModule);

        api.addDataAdapter(AlethioAdapterType.TxDetailsMemento, new TxDetailsAdapter(dataSource));
        api.addContextDef("context://aleth.io/memento/tx/parentBlock", txParentBlockContext({
            txDetailsAdapterUri: AlethioAdapterType.TxDetailsMemento
        }));
        api.addModuleDef("module://aleth.io/memento/tx/basic", txBasicModule({
            txDetailsAdapterUri: AlethioAdapterType.TxDetailsMemento,
            ethSymbol
        }));
        api.addModuleDef("module://aleth.io/memento/tx/advanced", txAdvancedModule({
            txDetailsAdapterUri: AlethioAdapterType.TxDetailsMemento,
            ethSymbol
        }));
        api.addModuleDef("module://aleth.io/memento/tx/summary", txSummaryModule({ dataSource, ethSymbol }));
        api.addModuleDef("module://aleth.io/memento/tx/payload", txPayloadModule({
            txDetailsAdapterUri: AlethioAdapterType.TxDetailsMemento
        }));

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
