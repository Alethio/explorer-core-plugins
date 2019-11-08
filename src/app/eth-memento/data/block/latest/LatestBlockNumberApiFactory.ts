import { LatestBlockNumberReader } from "./LatestBlockNumberReader";
import { LatestBlockNumberApi } from "./LatestBlockNumberApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";

export class LatestBlockNumberApiFactory {
    constructor(private appConfig: EthMementoPluginConfig) {

    }

    create() {
        return new LatestBlockNumberApi(
            new HttpApi(new HttpRequest()),
            new LatestBlockNumberReader(),
            this.appConfig.getBlockApiUrlMask()
        );
    }
}
