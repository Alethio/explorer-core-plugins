import { FifoCache } from "app/util/cache/FifoCache";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { TxDetailsStore } from "app/eth-memento/data/tx/details/TxDetailsStore";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";
import { TxDetailsMementoApi } from "app/eth-memento/data/tx/details/TxDetailsMementoApi";
import { ITxDetailsMemento } from "app/eth-memento/data/tx/details/ITxDetailsMemento";
import { TxDetailsMementoReader } from "app/eth-memento/data/tx/details/TxDetailsMementoReader";

const CACHE_SIZE = 100;

export class TxDetailsStoreFactory {
    constructor(private appConfig: EthMementoPluginConfig) {

    }

    create() {
        return new TxDetailsStore(
            new FifoCache<string, ITxDetailsMemento>(CACHE_SIZE),
            new TxDetailsMementoApi(
                new HttpApi(new HttpRequest()),
                new TxDetailsMementoReader(),
                this.appConfig.getTxApiUrlMask()
            )
        );
    }
}
