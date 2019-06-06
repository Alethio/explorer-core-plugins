import { AccountBalanceDataSetReader } from "./AccountBalanceDataSetReader";
import { BalanceHttpApi } from "app/eth-extended/data/account/balance/BalanceHttpApi";

export class AccountBalanceApi {
    constructor(
        private balanceHttpApi: BalanceHttpApi,
        private latestBalanceEndpointUrl: string,
        private historicalBalanceEndpointUrl: string,
        private accountBalanceDataSetReader: AccountBalanceDataSetReader
    ) {

    }

    /**
     * Fetches token/eth balance data for an account, in the time range starting from the given block number
     * and ending with a number of specified days in the past
     */
    async fetchLatest(accountHash: string, blockNumber: number) {
        let data = await this.balanceHttpApi.fetch<any>(this.latestBalanceEndpointUrl, {
            account: accountHash,
            blockNumber
        });

        return this.accountBalanceDataSetReader.read(data);
    }

    /**
     * Fetches token/eth balance data for an account, in the time range starting from the given block number
     * and ending with a number of specified days in the past
     */
    async fetchHistorical(accountHash: string, blockNumber: number, days: number) {
        let data = await this.balanceHttpApi.fetch<any>(this.historicalBalanceEndpointUrl, {
            account: accountHash,
            blockNumber,
            days
        });

        return this.accountBalanceDataSetReader.read(data);
    }
}
