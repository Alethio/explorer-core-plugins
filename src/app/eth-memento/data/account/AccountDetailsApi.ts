import { AccountDetailsReader } from "./AccountDetailsReader";
import { HttpApi } from "app/shared/data/HttpApi";

export class AccountDetailsApi {
    constructor(
        private httpApi: HttpApi,
        private accountDetailsReader: AccountDetailsReader,
        private endpointUrlMask: string
    ) {

    }

    async fetch(accountAddress: string) {
        let data = await this.httpApi.fetch(
            this.endpointUrlMask.replace("%s", accountAddress)
        );

        if (!data) {
            throw new Error(`No contract code found for address "${accountAddress}"`);
        }

        return this.accountDetailsReader.read(accountAddress.replace(/^0x/, ""), data);
    }
}
