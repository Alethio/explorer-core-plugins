import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";
import { AccountDetailsApi } from "app/eth-memento/data/account/AccountDetailsApi";
import { AccountDetailsReader } from "app/eth-memento/data/account/AccountDetailsReader";

export class AccountDetailsApiFactory {
    constructor(private appConfig: EthMementoPluginConfig) {

    }

    create() {
        return new AccountDetailsApi(
            new HttpApi(new HttpRequest()),
            new AccountDetailsReader(),
            this.appConfig.getAccountCodeApiUrlMask()
        );
    }
}
