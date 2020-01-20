import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { UsdValueBox } from "@alethio/ui/lib/data/box/UsdValueBox";
import { NumberBox } from "@alethio/ui/lib/data/box/NumberBox";
import { GweiValueBox } from "@alethio/ui/lib/data/box/GweiValueBox";
import { GasUsedValueBox } from "@alethio/ui/lib/data/box/GasUsedValueBox";
import { LayoutSection } from "@alethio/ui/lib/layout/content/LayoutSection";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ErrorIcon } from "@alethio/ui/lib/icon/ErrorIcon";
import { weiToEth } from "app/util/wei";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { isFullTxDetails } from "app/eth-extended/data/tx/details/isFullTxDetails";
import { isPendingTxDetails } from "app/eth-extended/data/tx/details/isPendingTxDetails";
import { TimeInPoolBox } from "@alethio/explorer-ui/lib/box/tx/TimeInPoolBox";
import { isMementoTxDetails } from "app/eth-memento/data/tx/details/isMementoTxDetails";

export interface ITxAdvancedProps {
    txHash: string;
    txDetails: ITxDetails;
    latestEthPrice: number | undefined;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
}

export class TxAdvanced extends React.PureComponent<ITxAdvancedProps> {
    render() {
        let { translation: tr, txDetails: tx, locale, latestEthPrice, ethSymbol } = this.props;

        return <>
            <LayoutSection useWrapper>
                <LayoutRow minWidth={600}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.gasLimit")}</Label>
                        <NumberBox value={tx.gasLimit} locale={locale} />
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("general.gasPrice")}</Label>
                        <GweiValueBox wei={tx.gasPrice} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={750}>
                    { isFullTxDetails(tx) || isMementoTxDetails(tx) ?
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.gasUsed.label")}</Label>
                        <GasUsedValueBox value={tx.gasUsed} limit={tx.gasLimit} locale={locale} />
                    </LayoutRowItem>
                    : null }
                    { isFullTxDetails(tx) || isMementoTxDetails(tx) ?
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.txFee.label")}</Label>
                        <EthValueBox wei={tx.gasUsed.multipliedBy(tx.gasPrice)} decimals={9} locale={locale}
                            symbol={ethSymbol} />
                        { latestEthPrice ?
                        <UsdValueBox colors="highlight"
                            value={weiToEth(tx.gasUsed.multipliedBy(tx.gasPrice))
                                .multipliedBy(latestEthPrice).toNumber()} locale={locale} />
                        : null }
                    </LayoutRowItem>
                    :
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.maxTxFee.label")}</Label>
                        <EthValueBox wei={tx.gasLimit.multipliedBy(tx.gasPrice)} decimals={9} locale={locale}
                            symbol={ethSymbol} />
                        { latestEthPrice ?
                        <UsdValueBox value={weiToEth(tx.gasLimit.multipliedBy(tx.gasPrice))
                            .multipliedBy(latestEthPrice).toNumber()} locale={locale} />
                        : null }
                    </LayoutRowItem>
                    }
                </LayoutRow>
                { isFullTxDetails(tx) || isMementoTxDetails(tx) ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.cumulativeGasUsed.label")}</Label>
                        <NumberBox value={tx.cumulativeGasUsed} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                : null}
            </LayoutSection>
            <LayoutSection>
                { !isPendingTxDetails(tx) && !isMementoTxDetails(tx) && tx.firstSeenAt
                && tx.block.creationTime > tx.firstSeenAt ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.timeSpent.label")}</Label>
                        <TimeInPoolBox
                            seconds={tx.block.creationTime - tx.firstSeenAt}
                            translation={tr.get("txView.content.timeSpent.value")} />
                    </LayoutRowItem>
                </LayoutRow>
                : null }
                { (isFullTxDetails(tx) || isMementoTxDetails(tx)) && tx.error ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.error.label")}</Label>
                        <ValueBox colors="error">{tx.error}</ValueBox>
                        <ErrorIcon />
                    </LayoutRowItem>
                </LayoutRow>
                : null }
            </LayoutSection>
        </>;
    }
}
