import { FifoCache } from "app/util/cache/FifoCache";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { UncleDetailsStore } from "./UncleDetailsStore";
import { IUncleDetails } from "./IUncleDetails";
import { UncleDetailsApi } from "./UncleDetailsApi";
import { UncleDetailsReader } from "app/shared/data/uncle/UncleDetailsReader";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";

const CACHE_SIZE = 5;

export class UncleDetailsStoreFactory {
    constructor(private appConfig: EthExtendedPluginConfig | EthMementoPluginConfig) {

    }

    create() {
        return new UncleDetailsStore(
            new FifoCache<string, IUncleDetails>(CACHE_SIZE),
            new UncleDetailsApi(
                new HttpApi(new HttpRequest()),
                new UncleDetailsReader(),
                this.appConfig.getUncleApiUrlMask()
            )
        );
    }
}
