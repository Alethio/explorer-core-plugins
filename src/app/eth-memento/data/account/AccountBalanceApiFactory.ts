import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";
import { AccountBalanceApi } from "app/eth-memento/data/account/AccountBalanceApi";

export class AccountBalanceApiFactory {
    constructor(private appConfig: EthMementoPluginConfig) {

    }

    create() {
        return new AccountBalanceApi(
            new HttpApi(new HttpRequest()),
            this.appConfig.getAccountBalanceApiUrlMask()
        );
    }
}
