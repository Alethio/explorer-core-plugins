import * as React from "react";
import { IAccountDetails } from "../../../../data/account/details/IAccountDetails";
import { isPrecompiledAccountDetails } from "../../../../data/account/details/isPrecompiledAccountDetails";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { ITranslation } from "plugin-api/ITranslation";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { NumberBox } from "@alethio/ui/lib/data/box/NumberBox";
import { isProtocolAccountDetails } from "../../../../data/account/details/isProtocolAccountDetails";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";

export interface IAccountMetaProps {
    account: IAccountDetails;
    locale: string;
    ethSymbol: string;
    translation: ITranslation;
}

export class AccountMeta extends React.Component<IAccountMetaProps> {
    render() {
        let { translation: tr, account, locale, ethSymbol } = this.props;

        if (isPrecompiledAccountDetails(account)) {
            return <>
                {account.meta.precompiledActivatedAt ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("accountView.content.precompiledActivatedAt.label")}</Label>
                        <BlockNumberBox>{account.meta.precompiledActivatedAt}</BlockNumberBox>
                    </LayoutRowItem>
                </LayoutRow> : null }
                { account.meta.precompiledGasWordCost ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("accountView.content.precompiledGasWordCost.label")}</Label>
                        <NumberBox value={account.meta.precompiledGasWordCost} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow> : null }
                { account.meta.precompiledGasDivisor ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("accountView.content.precompiledGasDivisor.label")}</Label>
                        <NumberBox value={account.meta.precompiledGasDivisor} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow> : null }
                { account.meta.precompiledGasPoint ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("accountView.content.precompiledGasPoint.label")}</Label>
                        <NumberBox value={account.meta.precompiledGasPoint} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow> : null }
                { account.meta.precompiledGasBaseCost ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("accountView.content.precompiledGasBaseCost.label")}</Label>
                        <NumberBox value={account.meta.precompiledGasBaseCost} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow> : null }
            </>;
        }

        if (isProtocolAccountDetails(account)) {
            return <>
                { account.meta.accountBalancePrefunded ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("accountView.content.accountBalancePrefunded.label")}</Label>
                        <EthValueBox wei={account.meta.accountBalancePrefunded} locale={locale} symbol={ethSymbol} />
                    </LayoutRowItem>
                </LayoutRow> : null }
            </>;
        }

        return null;
    }
}
