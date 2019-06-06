export const CHART_DATA_KEY = "balanceUsd";

export interface IPortfolioChartAreaData {
    [CHART_DATA_KEY]: number;
}

export interface IPortfolioChartData<TPayload extends IPortfolioChartAreaData> {
    min: number;
    max: number;
    points: TPayload[];
}
