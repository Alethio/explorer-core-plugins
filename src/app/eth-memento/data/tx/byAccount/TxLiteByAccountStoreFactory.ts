import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";
import { FifoCache } from "app/util/cache/FifoCache";
import { HttpApi } from "app/shared/data/HttpApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { TxLiteByAccountStore } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStore";
import { ITxLiteByAccount } from "app/eth-memento/data/tx/byAccount/ITxLiteByAccount";
import { TxLiteByAccountApi } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountApi";
import { TxLiteByAccountReader } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountReader";

const CACHE_SIZE = 5;

export class TxLiteByAccountStoreFactory {
    constructor(private appConfig: EthMementoPluginConfig) {

    }

    create() {
        return new TxLiteByAccountStore(
            new FifoCache<string, ITxLiteByAccount[]>(CACHE_SIZE),
            new TxLiteByAccountApi(
                new HttpApi(new HttpRequest()),
                new TxLiteByAccountReader(),
                this.appConfig.getAccountTxApiUrlMask()
            )
        );
    }
}
