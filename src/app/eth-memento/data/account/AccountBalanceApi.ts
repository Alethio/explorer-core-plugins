import { BigNumber } from "app/util/BigNumber";
import { HttpApi } from "app/shared/data/HttpApi";

export class AccountBalanceApi {
    constructor(
        private httpApi: HttpApi,
        private endpointUrlMask: string
    ) {

    }

    async fetch(accountAddress: string) {
        let data = await this.httpApi.fetch(
            this.endpointUrlMask.replace("%s", accountAddress)
        );

        if (!data) {
            throw new Error(`No balance found for address "${accountAddress}"`);
        }

        // tslint:disable:no-string-literal
        let accountBalance = (data as any)["balance"];

        return new BigNumber(accountBalance);
    }
}
