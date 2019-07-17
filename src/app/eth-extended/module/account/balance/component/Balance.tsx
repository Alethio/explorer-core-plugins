import * as React from "react";
import { ChartSection } from "./ChartSection";
import { ContentBottomSection } from "./ContentBottomSection";
import { ResponsiveContainer, MinimumWidth } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";
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
}

export class Balance extends React.Component<IBalanceProps> {
    render() {
        let { historicalBalance, isFreshAccount, totalBalance, translation: tr, locale, ethSymbol } = this.props;

        return <>
            <ChartSection
                accountBalance={historicalBalance}
                isFreshAccount={isFreshAccount}
                translation={tr}
                locale={locale}
                ethSymbol={ethSymbol}
            />
            <ContentBottomSection>
                <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForStandardView}}>
                    <Spacer height="58px" />
                </ResponsiveContainer>
                { !isFreshAccount ?
                <BalanceSection
                    historicalBalance={historicalBalance}
                    totalBalance={totalBalance}
                    translation={tr}
                    locale={locale}
                    ethSymbol={ethSymbol}
                /> : null }
            </ContentBottomSection>
        </>;
    }
}
