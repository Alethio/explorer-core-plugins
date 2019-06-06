import { PricesStore } from "./PricesStore";
import { FifoCache } from "app/util/cache/FifoCache";
import { PricesApi } from "./PricesApi";
import { RabbitApi } from "app/eth-extended/data/prices/RabbitApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { PricesDataSetReader } from "./PricesDataSetReader";
import { AlethioDataSourceConfig } from "app/eth-extended/AlethioDataSourceConfig";

const CACHE_SIZE = 100;

export class PricesStoreFactory {
    constructor(private appConfig: AlethioDataSourceConfig) {

    }

    create() {
        return new PricesStore(
            new FifoCache(CACHE_SIZE),
            new PricesApi(
                new RabbitApi(new HttpRequest()),
                this.appConfig.getPricesApiUrl(),
                new PricesDataSetReader()
            )
        );
    }
}
