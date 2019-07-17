import * as React from "react";
import { ITotalBalance } from "app/eth-extended/data/account/balance/ITotalBalance";
import { ITranslation } from "plugin-api/ITranslation";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { AccountBalance } from "app/eth-extended/data/account/balance/AccountBalance";
import { observer } from "mobx-react";
import { LoadStatus } from "plugin-api/LoadStatus";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { UsdValueBox } from "@alethio/ui/lib/data/box/UsdValueBox";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { SpinnerRegular } from "@alethio/ui/lib/fx/SpinnerRegular";
import { ErrorIconHint } from "app/shared/component/ErrorIconHint";
import { TokenDistribution } from "./TokenDistribution";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { BigNumber } from "app/util/BigNumber";
import { IAsyncData } from "plugin-api/IAsyncData";

export interface ITotalPortfolioProps {
    latestBalance: IAsyncData<AccountBalance>;
    totalBalance: ITotalBalance | undefined;
    isFreshAccount: boolean;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
}

@observer
export class TotalPortfolio extends React.Component<ITotalPortfolioProps> {
    render() {
        let { translation: tr, locale, latestBalance, totalBalance, isFreshAccount, ethSymbol } = this.props;

        return (
            <LayoutRow minWidth={960}>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.totalHoldings.label")}</Label>
                    { isFreshAccount || (latestBalance.loadStatus === LoadStatus.Loaded && totalBalance) ?
                    <>
                    <EthValueBox
                        wei={totalBalance ? totalBalance.wei : new BigNumber(0)}
                        locale={locale}
                        symbol={ethSymbol}
                    />
                    <UsdValueBox colors="secondary" value={totalBalance ? totalBalance.usd : 0} locale={locale} />
                    </>
                    :
                    <ValueBox>
                        {latestBalance.loadStatus === LoadStatus.Loading ?
                        <SpinnerRegular /> : <ErrorIconHint translation={tr} />}
                    </ValueBox>
                    }
                </LayoutRowItem>
                { latestBalance.isLoaded() && totalBalance && totalBalance.usd > 0 ?
                <LayoutRowItem fullRow autoHeight>
                    <Label>{tr.get("accountView.content.distribution.label")}</Label>
                    <div style={{maxWidth: 300, flex: "1 1 auto"}}>
                        <TokenDistribution
                            translation={tr}
                            ethBalance={latestBalance.data.getEthBalance()}
                            allTokenBalances={latestBalance.data.getAllTokenBalances()}
                            total={totalBalance.usd}
                        />
                    </div>
                </LayoutRowItem>
                : null}
            </LayoutRow>
        );
    }
}
