import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { UsdValueBox } from "@alethio/ui/lib/data/box/UsdValueBox";
import { NumberBox } from "@alethio/ui/lib/data/box/NumberBox";
import { ContractIcon } from "@alethio/ui/lib/icon/ContractIcon";
import { GweiValueBox } from "@alethio/ui/lib/data/box/GweiValueBox";
import { GasUsedValueBox } from "@alethio/ui/lib/data/box/GasUsedValueBox";
import { LayoutSection } from "@alethio/ui/lib/layout/content/LayoutSection";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ErrorIcon } from "@alethio/ui/lib/icon/ErrorIcon";
import { weiToEth } from "app/util/wei";
import { ITranslation } from "plugin-api/ITranslation";
import { TxType } from "app/eth-extended/data/tx/TxType";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { isFullTxDetails } from "app/eth-extended/data/tx/details/isFullTxDetails";
import { isPendingTxDetails } from "app/eth-extended/data/tx/details/isPendingTxDetails";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { TxTypeBox } from "@alethio/explorer-ui/lib/box/tx/TxTypeBox";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TimeElapsedBox } from "app/shared/component/TimeElapsedBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { TimeInPoolBox } from "@alethio/explorer-ui/lib/box/tx/TimeInPoolBox";
import { TxStatus } from "./TxStatus";

export interface ITxDetailsProps {
    txHash: string;
    txDetails: ITxDetails;
    latestEthPrice: number | undefined;
    translation: ITranslation;
    locale: string;
    blockConfirmationsSlot?: JSX.Element[];
}

export class TxDetails extends React.PureComponent<ITxDetailsProps> {
    render() {
        let { translation: tr, txDetails: tx, locale, latestEthPrice, blockConfirmationsSlot } = this.props;

        return <>
            <LayoutSection useWrapper>
                <LayoutRow minWidth={960}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.hash")}</Label>
                        <TxHashBox noLink>{this.props.txHash}</TxHashBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.txType.label")}</Label>
                        <TxTypeBox>{tr.get("general.tx.type." + TxType[tx.type])}</TxTypeBox>
                        <Label arrow disabled={tx.value.isZero()}>{tr.get("txView.content.txValue.label")}</Label>
                        <EthValueBox wei={tx.value} locale={locale} />
                        { latestEthPrice ?
                            <UsdValueBox
                                value={weiToEth(tx.value).multipliedBy(latestEthPrice).toNumber()}
                                locale={locale}
                            />
                        : null }
                        <TxStatus tx={tx} translation={tr} />
                    </LayoutRowItem>
                </LayoutRow>
                { !isPendingTxDetails(tx) ?
                <LayoutRow minWidth={780}>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.blockNumber.label")}</Label>
                        <BlockNumberBox>{tx.block.id}</BlockNumberBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        {tx.block.creationTime ?
                        <>
                        <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                        <TimeElapsedBox timestamp={tx.block.creationTime}
                            translation={tr}
                            locale={locale} />
                        </>
                        : null }
                        { blockConfirmationsSlot }
                    </LayoutRowItem>
                </LayoutRow>
                :
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.firstSeen.label")}</Label>
                        <TimeElapsedBox timestamp={tx.firstSeenAt}
                            translation={tr}
                            locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                }
                <LayoutRow minWidth={650}>
                    { !isPendingTxDetails(tx) ?
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.txIndex.label")}</Label>
                        <NumberBox value={tx.txIndex} locale={locale} />
                    </LayoutRowItem>
                    : [] }
                    <LayoutRowItem>
                        <Label>{tr.get("general.nonce")}</Label>
                        <NumberBox value={tx.nonce} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={650}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.from")}</Label>
                        <AddressHashBox>{tx.from}</AddressHashBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{
                            tx.type === TxType.Create ?
                            tr.get("general.creates") :
                            tr.get("general.to")
                        }</Label>
                        <AddressHashBox
                            Icon={tx.type === TxType.Create ? ContractIcon : void 0}
                        >{tx.to}</AddressHashBox>
                    </LayoutRowItem>
                </LayoutRow>
            </LayoutSection>
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
                    { !isPendingTxDetails(tx) ?
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.gasUsed.label")}</Label>
                        <GasUsedValueBox value={tx.gasUsed} limit={tx.gasLimit} locale={locale} />
                    </LayoutRowItem>
                    : null }
                    { !isPendingTxDetails(tx) ?
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.txFee.label")}</Label>
                        <EthValueBox wei={tx.gasUsed.multipliedBy(tx.gasPrice)} decimals={9} locale={locale} />
                        { latestEthPrice ?
                        <UsdValueBox colors="highlight"
                            value={weiToEth(tx.gasUsed.multipliedBy(tx.gasPrice))
                                .multipliedBy(latestEthPrice).toNumber()} locale={locale} />
                        : null }
                    </LayoutRowItem>
                    :
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.maxTxFee.label")}</Label>
                        <EthValueBox wei={tx.gasLimit.multipliedBy(tx.gasPrice)} decimals={9} locale={locale} />
                        { latestEthPrice ?
                        <UsdValueBox value={weiToEth(tx.gasLimit.multipliedBy(tx.gasPrice))
                            .multipliedBy(latestEthPrice).toNumber()} locale={locale} />
                        : null }
                    </LayoutRowItem>
                    }
                </LayoutRow>
                { !isPendingTxDetails(tx) ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.cumulativeGasUsed.label")}</Label>
                        <NumberBox value={tx.cumulativeGasUsed} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow>
                : null}
            </LayoutSection>
            <LayoutSection>
                { !isPendingTxDetails(tx) && tx.firstSeenAt && tx.block.creationTime > tx.firstSeenAt ?
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.timeSpent.label")}</Label>
                        <TimeInPoolBox
                            seconds={tx.block.creationTime - tx.firstSeenAt}
                            translation={tr.get("txView.content.timeSpent.value")} />
                    </LayoutRowItem>
                </LayoutRow>
                : null }
                { isFullTxDetails(tx) && tx.error ?
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
