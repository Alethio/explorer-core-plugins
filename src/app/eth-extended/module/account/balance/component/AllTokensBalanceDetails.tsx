import * as React from "react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { BalancePieChart } from "./chart/BalancePieChart";
import { UsdValueBox } from "@alethio/ui/lib/data/box/UsdValueBox";
import { CHART_DATA_KEY, IPortfolioChartData } from "./chart/BalanceChartData";
import { BalanceAreaChartSmall } from "./chart/BalanceAreaChartSmall";
import { ITokenAggregatedBalance } from "app/eth-extended/data/account/balance/ITokenAggregatedBalance";
import { ITotalBalance } from "app/eth-extended/data/account/balance/ITotalBalance";
import { IBalanceAreaChartSmallPayload } from "./chart/IBalanceAreaChartSmallPayload";
import { LayoutBoxItem } from "@alethio/ui/lib/layout/content/LayoutBoxItem";
import { Expander } from "@alethio/ui/lib/control/expander/Expander";
import { ITranslation } from "plugin-api/ITranslation";
import { ResponsiveContainer, MinimumWidth } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";

interface IAllTokensBalanceDetailsProps {
    tokenAggregatedBalance: ITokenAggregatedBalance[];
    totalTokenTypes: number;
    totalBalance: ITotalBalance;
    locale: string;
    translation: ITranslation;
    expanded: boolean;
    usdPricesEnabled: boolean;
    onToggleExpand(): void;
}

export class AllTokensBalanceDetails extends React.PureComponent<IAllTokensBalanceDetailsProps> {
    render() {
        let { locale, translation: tr, usdPricesEnabled } = this.props;
        let totalTokenUsdBalance = this.props.tokenAggregatedBalance[0].balanceUsd;
        let percentFraction = this.props.totalBalance.usd ?
            totalTokenUsdBalance / this.props.totalBalance.usd :
            0;

        return (
            <>
                <LayoutBoxItem>
                    <Expander
                        label={tr.get("accountView.content.tokens.label")}
                        value={this.props.totalTokenTypes}
                        open={this.props.expanded}
                        locale={locale}
                        onClick={this.props.onToggleExpand}
                    />
                </LayoutBoxItem>
                { usdPricesEnabled ?
                <>
                <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForFullView}}>
                    <LayoutBoxItem>
                        <ValueBox>
                            <BalancePieChart percentage={percentFraction * 100} clockwise />
                        </ValueBox>
                    </LayoutBoxItem>
                </ResponsiveContainer>
                <LayoutBoxItem>
                    <ValueBox>{percentFraction.toLocaleString(locale, {
                        style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 2})
                    }</ValueBox>
                </LayoutBoxItem>
                <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForFullView}}>
                    <LayoutBoxItem>
                        <ValueBox>
                            <BalanceAreaChartSmall data={this.getChartData()} />
                        </ValueBox>
                    </LayoutBoxItem>
                </ResponsiveContainer>
                <LayoutBoxItem justifyContent="flex-end">
                    <UsdValueBox colors="secondary" value={totalTokenUsdBalance} locale={locale} />
                </LayoutBoxItem>
                </> : null }
            </>
        );
    }

    private getChartData() {
        let data: IPortfolioChartData<IBalanceAreaChartSmallPayload> = {
            max: -Infinity,
            min: +Infinity,
            points: []
        };
        data.points = this.props.tokenAggregatedBalance.map(balance => {
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
