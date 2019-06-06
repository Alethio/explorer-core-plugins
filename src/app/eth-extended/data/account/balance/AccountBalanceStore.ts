import { AccountBalanceApi } from "./AccountBalanceApi";
import { AccountBalance } from "app/eth-extended/data/account/balance/AccountBalance";
import { BigNumber } from "app/util/BigNumber";

export const BALANCE_HISTORY_DAYS = 30;

export class AccountBalanceStore {
    constructor(
        private balanceApi: AccountBalanceApi
    ) {
    }

    /**
     * Fetches token/eth balance data for an account, in the time range starting from the given block number
     * and ending with a number of specified days in the past
     */
    async fetchLatest(accountHash: string, blockNumber: number) {
        // We cannot do caching here because when the latest block changes
        // all subsequent balance for previous days will come with different blocks as well
        let balanceDataSet = await this.balanceApi.fetchLatest(accountHash, blockNumber);
        let balance = new AccountBalance();
        balance.add(...balanceDataSet);
        return balance;
    }

    /**
     * Fetches token/eth balance data for an account, in the time range starting from the given block number
     * and ending with a number of specified days in the past
     */
    async fetchHistorical(accountHash: string, blockNumber: number) {
        // We cannot do caching here because when the latest block changes
        // all subsequent balance for previous days will come with different blocks as well
        let balanceDataSet = await this.balanceApi.fetchHistorical(
            accountHash, blockNumber, BALANCE_HISTORY_DAYS
        );

        // We remove all tokens with 0 token value for the entire duration of the requested timeframe
        let filteredDataSet = balanceDataSet.filter(value => {
            let accumulatedBalance = value.chart.reduce((acc, v) => acc = v.balance.plus(acc), new BigNumber(0));
            return !value.currency.address || accumulatedBalance.isGreaterThan(0);
        });

        let balance = new AccountBalance();
        balance.add(...filteredDataSet);
        return balance;
    }
}
