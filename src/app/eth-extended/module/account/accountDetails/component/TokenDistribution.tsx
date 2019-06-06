import * as React from "react";
import { StackBar } from "@alethio/ui/lib/data/vis/stackBar/StackBar";
import { ITranslation } from "plugin-api/ITranslation";
import { roundPercentages } from "app/helper/roundPercentages";
import { StackBarTooltipText } from "@alethio/ui/lib/data/vis/stackBar/StackBarTooltipText";
import { IAccountBalanceData } from "app/eth-extended/data/account/balance/IAccountBalanceDataSet";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { withTheme } from "@alethio/explorer-ui/lib/styled-components";

export interface IDistributionData {
    count: number;
    color: string;
    label: string;
}

export interface ITokenDistributionProps {
    translation: ITranslation;
    ethBalance: IAccountBalanceData;
    allTokenBalances: IAccountBalanceData[];
    total: number;
    theme: ITheme;
}

class $TokenDistribution extends React.PureComponent<ITokenDistributionProps> {
    render() {
        return (
            <StackBar
                defaultBarHeight={8}
                maxBarHeight={12}
                minBarHeight={4}
                items={this.buildData()}
            />
        );
    }

    private buildData() {
        let distributionData = this.computePortfolioDistribution();
        let roundedItems = roundPercentages(distributionData.map(d => {
            let percent = d.count / this.props.total * 100;
            return {
                ...d,
                percent
            };
        }));
        return roundedItems.map(item => ({
            ...item.originalItem,
            percent: item.percent,
            tooltip: (
                <StackBarTooltipText bubbleColor={item.originalItem.color} >
                    <span>
                        {item.originalItem.label}
                    </span>
                    <span>
                        {item.percent}%
                    </span>
                </StackBarTooltipText>
            )
        }));
    }

    private computePortfolioDistribution() {
        let ethBalance = this.props.ethBalance;
        let ethData: IDistributionData = {
            color: this.props.theme.colors.accountEthBalance,
            count: ethBalance.chart[0].balanceUsd,
            label: ethBalance.currency.name
        };
        let tokenBalances = this.props.allTokenBalances;
        return [ethData].concat(tokenBalances.map(balance => ({
            color: "#" + balance.currency.address.substring(balance.currency.address.length - 6),
            count: balance.chart[0].balanceUsd,
            label: balance.currency.name
        } as IDistributionData)));
    }
}

export const TokenDistribution = withTheme($TokenDistribution);
