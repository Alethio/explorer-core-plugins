import { HttpApi } from "app/eth-extended/data/HttpApi";
import { AccountDetailsReader } from "./AccountDetailsReader";

export class AccountDetailsApi {
    constructor(
        private httpApi: HttpApi,
        private accountDetailsReader: AccountDetailsReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(accountHash: string) {
        let data = await this.httpApi.fetch(
            this.endpointUrlMask.replace("%s", accountHash)
        );

        if (!data) {
            throw new Error(`No data found for account ${accountHash}`);
        }

        return this.accountDetailsReader.read(accountHash.replace(/^0x/, ""), data);
    }
}
