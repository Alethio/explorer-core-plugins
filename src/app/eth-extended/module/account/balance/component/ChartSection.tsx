import * as React from "react";
import { ChartContainer } from "./ChartContainer";
import { AccountBalance } from "app/eth-extended/data/account/balance/AccountBalance";
import { observer } from "mobx-react";
import { LoadStatus } from "plugin-api/LoadStatus";
import { BalanceChartLoadingMask } from "./chart/BalanceChartLoadingMask";
import { SpinnerRegular } from "@alethio/ui/lib/fx/SpinnerRegular";
import { ErrorIconHint } from "app/shared/component/ErrorIconHint";
import { BalanceAreaChart } from "./chart/BalanceAreaChart";
import { ITranslation } from "plugin-api/ITranslation";
import { IPortfolioChartData, CHART_DATA_KEY } from "./chart/BalanceChartData";
import { IBalanceAreaChartPayload } from "./chart/IBalanceAreaChartPayload";
import { BALANCE_HISTORY_DAYS } from "app/eth-extended/data/account/balance/AccountBalanceStore";
import { IAsyncData } from "plugin-api/IAsyncData";

export interface IChartSectionProps {
    accountBalance: IAsyncData<AccountBalance>;
    isFreshAccount: boolean;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
}

@observer
export class ChartSection extends React.Component<IChartSectionProps> {
    render() {
        let { accountBalance, isFreshAccount, translation: tr, locale, ethSymbol } = this.props;

        return (
            <ChartContainer>
                { !isFreshAccount && accountBalance.loadStatus !== LoadStatus.Loaded ? <BalanceChartLoadingMask>
                    { accountBalance.loadStatus === LoadStatus.Loading ?
                    <SpinnerRegular size={36} /> :
                    <ErrorIconHint translation={tr} size={36} /> }
                </BalanceChartLoadingMask> : void 0 }
                <BalanceAreaChart
                    data={!isFreshAccount && accountBalance.isLoaded() ?
                        this.computeChartData(accountBalance.data) : this.getPlaceholderChartData()}
                    locale={locale}
                    ethSymbol={ethSymbol}
                    disabled={isFreshAccount || !accountBalance.isLoaded()}
                />
            </ChartContainer>
        );
    }

    private computeChartData(accountBalance: AccountBalance) {
        let data: IPortfolioChartData<IBalanceAreaChartPayload> = {
            max: -Infinity,
            min: +Infinity,
            points: []
        };
        data.points = accountBalance.computeTotalBalance().map(balance => {
            let point: IBalanceAreaChartPayload = {
                [CHART_DATA_KEY]: balance.usd,
                balanceWei: balance.wei,
                timestamp: balance.timestamp
            };
            data.min = Math.min(data.min, balance.usd);
            data.max = Math.max(data.max, balance.usd);
            return point;
        }).reverse();

        // Ensure we don't get a "thin" chart stroke at the minimum
        if (data.max - data.min < 1) {
            data.max = data.min + 1;
        }

        return data;
    }

    getPlaceholderChartData() {
        let data: IPortfolioChartData<IBalanceAreaChartPayload> = {
            max: 10,
            min: 0,
            // Match the number of data points that will be fetched from the server.
            // This ensures a smooth animation when the chart loads
            points: Array(BALANCE_HISTORY_DAYS).fill(
                {[CHART_DATA_KEY]: 0} as IBalanceAreaChartPayload
            )
        };
        return data;
    }
}
