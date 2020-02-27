import * as React from "react";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { BalancePieChart } from "./chart/BalancePieChart";
import { UsdValueBox } from "@alethio/ui/lib/data/box/UsdValueBox";
import { ITotalBalance } from "app/eth-extended/data/account/balance/ITotalBalance";
import { CHART_DATA_KEY, IPortfolioChartData } from "./chart/BalanceChartData";
import { BalanceAreaChartSmall } from "./chart/BalanceAreaChartSmall";
import { IAccountBalanceData } from "app/eth-extended/data/account/balance/IAccountBalanceDataSet";
import { IBalanceAreaChartSmallPayload } from "./chart/IBalanceAreaChartSmallPayload";
import { LayoutBoxItem } from "@alethio/ui/lib/layout/content/LayoutBoxItem";
import { ResponsiveContainer } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";

interface IEthBalanceDetailsProps {
    ethBalance: IAccountBalanceData;
    totalBalance: ITotalBalance;
    locale: string;
    ethSymbol: string;
    usdPricesEnabled: boolean;
}

export class EthBalanceDetails extends React.PureComponent<IEthBalanceDetailsProps> {
    render() {
        let { locale, ethBalance, ethSymbol, usdPricesEnabled } = this.props;
        let newestDataPoint = ethBalance.chart[0];
        let percentFraction = this.props.totalBalance.usd ?
            newestDataPoint.balanceUsd / this.props.totalBalance.usd :
            1;

        return (
            <>
                <LayoutBoxItem>
                    <EthValueBox wei={newestDataPoint.balance} locale={locale} symbol={ethSymbol} />
                </LayoutBoxItem>
                { usdPricesEnabled ?
                <>
                <ResponsiveContainer behavior="hide" mediaQuery={theme => theme.media.mAndBelow}>
                    <LayoutBoxItem>
                        <ValueBox>
                            <BalancePieChart percentage={percentFraction * 100} />
                        </ValueBox>
                    </LayoutBoxItem>
                </ResponsiveContainer>
                <LayoutBoxItem>
                    <ValueBox>{percentFraction.toLocaleString(locale, {
                        style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 2})
                    }</ValueBox>
                </LayoutBoxItem>
                <ResponsiveContainer behavior="hide" mediaQuery={theme => theme.media.mAndBelow}>
                    <LayoutBoxItem>
                        <ValueBox>
                            <BalanceAreaChartSmall data={this.getChartData()} />
                        </ValueBox>
                    </LayoutBoxItem>
                </ResponsiveContainer>
                <LayoutBoxItem justifyContent="flex-end">
                    <UsdValueBox
                        colors="secondary"
                        value={newestDataPoint.balanceUsd}
                        locale={locale}
                    />
                </LayoutBoxItem>
                </> : null }
            </>
        );
    }

    private getChartData() {
        // TODO: dedupe this logic (see BalanceChartRenderer, ChartSection and AllTokensBalanceDetails)
        let data: IPortfolioChartData<IBalanceAreaChartSmallPayload> = {
            max: -Infinity,
            min: +Infinity,
            points: []
        };
        data.points = this.props.ethBalance.chart.map(balance => {
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
