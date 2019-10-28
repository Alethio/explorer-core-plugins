import { FifoCache } from "app/util/cache/FifoCache";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { TxDetailsStore } from "app/eth-extended/data/tx/details/TxDetailsStore";
import { TxDetailsFullReader } from "app/eth-extended/data/tx/details/TxDetailsFullReader";
import { TxDetailsFullApi } from "app/eth-extended/data/tx/details/TxDetailsFullApi";
import { ITxDetailsFull } from "app/eth-extended/data/tx/details/ITxDetailsFull";
import { TxDetailsPartialApi } from "app/eth-extended/data/tx/details/TxDetailsPartialApi";
import { TxDetailsPartialReader } from "app/eth-extended/data/tx/details/TxDetailsPartialReader";
import { Deepstream } from "app/util/network/Deepstream";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";
import { ILogger } from "plugin-api/ILogger";
import { Decoder } from "app/eth-extended/data/payload/Decoder";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

const CACHE_SIZE = 100;

export class TxDetailsStoreFactory {
    constructor(private appConfig: EthExtendedPluginConfig, private logger: ILogger) {

    }

    create(deepstream: Deepstream) {
        return new TxDetailsStore(
            new FifoCache<string, ITxDetailsFull>(CACHE_SIZE),
            new TxDetailsFullApi(
                new HttpApi(new HttpRequest()),
                new TxDetailsFullReader(new Decoder(this.logger)),
                this.appConfig.getTxApiUrlMask()
            ),
            new TxDetailsPartialApi(
                new DsRpcApi(deepstream),
                new TxDetailsPartialReader()
            ),
            this.logger
        );
    }
}
