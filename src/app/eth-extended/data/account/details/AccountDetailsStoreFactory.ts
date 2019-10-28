import { AccountDetailsStore } from "./AccountDetailsStore";
import { AccountDetailsReader } from "./AccountDetailsReader";
import { AccountDetailsApi } from "./AccountDetailsApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

export class AccountDetailsStoreFactory {
    constructor(private appConfig: EthExtendedPluginConfig) {

    }

    create() {
        return new AccountDetailsStore(
            new AccountDetailsApi(
                new HttpApi(new HttpRequest()),
                new AccountDetailsReader(),
                this.appConfig.getAccountApiUrlMask()
            )
        );
    }
}
