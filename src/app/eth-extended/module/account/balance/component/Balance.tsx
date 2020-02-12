import * as React from "react";
import { ChartSection } from "./ChartSection";
import { ContentBottomSection } from "./ContentBottomSection";
import { ResponsiveContainer } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";
import { AccountBalance } from "app/eth-extended/data/account/balance/AccountBalance";
import { ITranslation } from "plugin-api/ITranslation";
import { Spacer } from "@alethio/ui/lib/layout/Spacer";
import { BalanceSection } from "./BalanceSection";
import { ITotalBalance } from "app/eth-extended/data/account/balance/ITotalBalance";
import { IAsyncData } from "plugin-api/IAsyncData";

export interface IBalanceProps {
    isFreshAccount: boolean;
    historicalBalance: IAsyncData<AccountBalance>;
    totalBalance: ITotalBalance | undefined;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    usdPricesEnabled: boolean;
    mainChartTokenAddress?: string;
}

export class Balance extends React.Component<IBalanceProps> {
    render() {
        let {
            historicalBalance, isFreshAccount, totalBalance, translation: tr, locale, ethSymbol, usdPricesEnabled,
            mainChartTokenAddress
        } = this.props;

        return <>
            <ChartSection
                tokenAddress={mainChartTokenAddress ? mainChartTokenAddress.replace(/^0x/, "") : void 0}
                accountBalance={historicalBalance}
                isFreshAccount={isFreshAccount}
                translation={tr}
                locale={locale}
                ethSymbol={ethSymbol}
                usdPricesEnabled={usdPricesEnabled}
            />
            <ContentBottomSection>
                <ResponsiveContainer behavior="hide" mediaQuery={theme => theme.media.sAndBelow}>
                    <Spacer height="58px" />
                </ResponsiveContainer>
                { !isFreshAccount ?
                <BalanceSection
                    historicalBalance={historicalBalance}
                    totalBalance={totalBalance}
                    translation={tr}
                    locale={locale}
                    ethSymbol={ethSymbol}
                    usdPricesEnabled={usdPricesEnabled}
                /> : null }
            </ContentBottomSection>
        </>;
    }
}
