import { CHART_DATA_KEY } from "./BalanceChartData";
import { BigNumber } from "app/util/BigNumber";

export interface IBalanceAreaChartPayload {
    /** Balance in USD */
    [CHART_DATA_KEY]: number;
    balanceWei: BigNumber;
    timestamp: number;
}
