import { CHART_DATA_KEY } from "./BalanceChartData";
import { BigNumber } from "app/util/BigNumber";

export interface IBalanceAreaChartPayload {
    /** Balance used to plot chart (USD, ETH or Token volume, depending on settings) */
    [CHART_DATA_KEY]: number;
    /** Balance in Wei (unset for token balances) */
    balanceWei?: BigNumber;
    /** Balance in token volume (for token balances) */
    balanceToken?: number;
    timestamp: number;
}
