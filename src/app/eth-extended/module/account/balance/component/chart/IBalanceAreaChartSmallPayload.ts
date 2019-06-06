import { CHART_DATA_KEY } from "./BalanceChartData";

export interface IBalanceAreaChartSmallPayload {
    /** Balance in USD */
    [CHART_DATA_KEY]: number;
}
