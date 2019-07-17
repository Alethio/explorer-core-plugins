import { AccountBalanceStore } from "./AccountBalanceStore";
import { AccountBalanceApi } from "./AccountBalanceApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { AccountBalanceDataSetReader } from "./AccountBalanceDataSetReader";
import { BalanceHttpApi } from "app/eth-extended/data/account/balance/BalanceHttpApi";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

export class AccountBalanceStoreFactory {
    constructor(private appConfig: EthExtendedPluginConfig) {

    }

    create() {
        return new AccountBalanceStore(
            new AccountBalanceApi(
                new BalanceHttpApi(new HttpRequest()),
                this.appConfig.getBalanceLatestApiUrl(),
                this.appConfig.getBalanceHistoricalApiUrl(),
                new AccountBalanceDataSetReader()
            )
        );
    }
}
