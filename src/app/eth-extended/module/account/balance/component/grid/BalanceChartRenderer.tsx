import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { IAccountBalanceData } from "app/eth-extended/data/account/balance/IAccountBalanceDataSet";
import { BalanceAreaChartSmall } from "../chart/BalanceAreaChartSmall";
import { IBalanceAreaChartSmallPayload } from "../chart/IBalanceAreaChartSmallPayload";
import { CHART_DATA_KEY, IPortfolioChartData } from "../chart/BalanceChartData";

export class BalanceChartRenderer implements IGridFieldRenderer<IAccountBalanceData> {
    render(f: IAccountBalanceData) {
        return (
            <BalanceAreaChartSmall data={this.getChartData(f)} />
        );
    }

    private getChartData(f: IAccountBalanceData) {
        let data: IPortfolioChartData<IBalanceAreaChartSmallPayload> = {
            max: -Infinity,
            min: +Infinity,
            points: []
        };
        data.points = f.chart.map(balance => {
            let point: IBalanceAreaChartSmallPayload = {
                [CHART_DATA_KEY]: balance.balanceUsd
            };
            data.min = Math.min(data.min, balance.balanceUsd);
            data.max = Math.max(data.max, balance.balanceUsd);
            return point;
        }).reverse();

        // Ensure we don't get a "thin" chart stroke at the minimum
        if (data.max - data.min < 1) {
            data.max = data.min + 1;
        }

        return data;
    }
}
