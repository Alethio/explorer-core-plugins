import { FifoCache } from "app/util/cache/FifoCache";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/eth-extended/data/HttpApi";
import { UncleDetailsStore } from "./UncleDetailsStore";
import { IUncleDetails } from "./IUncleDetails";
import { UncleDetailsApi } from "./UncleDetailsApi";
import { UncleDetailsReader } from "app/eth-extended/data/uncle/UncleDetailsReader";
import { AlethioDataSourceConfig } from "app/eth-extended/AlethioDataSourceConfig";

const CACHE_SIZE = 5;

export class UncleDetailsStoreFactory {
    constructor(private appConfig: AlethioDataSourceConfig) {

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
