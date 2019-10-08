import { IPlugin } from "plugin-api/IPlugin";
import { accountTxsModule } from "app/eth-memento/module/accountTxsModule";
import { TxLiteByAccountStore } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStore";
import { FifoCache } from "app/util/cache/FifoCache";
import { ITxLiteByAccount } from "app/eth-memento/data/tx/byAccount/ITxLiteByAccount";
import { TxLiteByAccountApi } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountApi";
import { HttpApi } from "app/shared/data/HttpApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { TxLiteByAccountReader } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountReader";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";

const API_CACHE_SIZE = 5;

const ethMementoPlugin: IPlugin = {
    init(configData: unknown, api, logger, publicPath) {
        __webpack_public_path__ = publicPath;

        let config = new EthMementoPluginConfig().fromJson(configData as any);

        let txByAccountStore = new TxLiteByAccountStore(
            new FifoCache<string, ITxLiteByAccount[]>(API_CACHE_SIZE),
            new TxLiteByAccountApi(
                new HttpApi(new HttpRequest()),
                new TxLiteByAccountReader(),
                config.getAccountTxApiUrlMask()
            )
        );
        let ethSymbol = config.getEthSymbol();

        api.addModuleDef("module://aleth.io/memento/account/txs", accountTxsModule({
            store: txByAccountStore,
            ethSymbol
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
