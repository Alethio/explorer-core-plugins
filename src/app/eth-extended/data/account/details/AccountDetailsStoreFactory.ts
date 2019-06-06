import { AccountDetailsStore } from "./AccountDetailsStore";
import { AccountDetailsReader } from "./AccountDetailsReader";
import { AccountDetailsApi } from "./AccountDetailsApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/eth-extended/data/HttpApi";
import { AlethioDataSourceConfig } from "app/eth-extended/AlethioDataSourceConfig";

export class AccountDetailsStoreFactory {
    constructor(private appConfig: AlethioDataSourceConfig) {

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
