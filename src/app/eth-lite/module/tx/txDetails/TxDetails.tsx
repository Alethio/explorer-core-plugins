import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { NumberBox } from "@alethio/ui/lib/data/box/NumberBox";
import { GweiValueBox } from "@alethio/ui/lib/data/box/GweiValueBox";
import { GasUsedValueBox } from "@alethio/ui/lib/data/box/GasUsedValueBox";
import { LayoutSection } from "@alethio/ui/lib/layout/content/LayoutSection";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ErrorIcon } from "@alethio/ui/lib/icon/ErrorIcon";
import { HexData } from "@alethio/ui/lib/data/hex/HexData";
import { ITranslation } from "plugin-api/ITranslation";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TimeElapsedBox } from "app/shared/component/TimeElapsedBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";
import { ITxReceipt } from "app/eth-lite/data/tx/receipt/ITxReceipt";
import { IBlockBasicInfo } from "app/shared/data/block/IBlockBasicInfo";
import { TxStatus } from "app/eth-lite/module/tx/txDetails/TxStatus";
import { NotAvailableBox } from "app/shared/component/NotAvailableBox";

export interface ITxDetailsProps {
    txHash: string;
    txDetails: ITxDetails;
    txReceipt: ITxReceipt | undefined;
    blockBasicInfo: IBlockBasicInfo;
    translation: ITranslation;
    locale: string;
    blockConfirmationsSlot?: JSX.Element[];
}

export class TxDetails extends React.PureComponent<ITxDetailsProps> {
    render() {
        let {
            translation: tr, txDetails: tx, blockBasicInfo: block, txReceipt, locale, blockConfirmationsSlot
        } = this.props;

        return <>
            <LayoutSection useWrapper>
                <LayoutRow minWidth={960}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.hash")}</Label>
                        <TxHashBox noLink>{this.props.txHash}</TxHashBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label arrow disabled={tx.value.isZero()}>{tr.get("txView.content.txValue.label")}</Label>
                        <EthValueBox wei={tx.value} locale={locale} />
                        { txReceipt ?
                        <TxStatus txReceipt={txReceipt} translation={tr} />
                        : <NotAvailableBox translation={tr} /> }
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={780}>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.blockNumber.label")}</Label>
                        <BlockNumberBox>{tx.block.id}</BlockNumberBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        {block && block.creationTime ?
                        <>
                        <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                        <TimeElapsedBox timestamp={block.creationTime}
                            translation={tr}
                            locale={locale} />
                        </>
                        : null }
                        { blockConfirmationsSlot }
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={650}>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.txIndex.label")}</Label>
                        <NumberBox value={tx.txIndex} locale={locale} />
                    </LayoutRowItem>
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
                    { tx.to && <LayoutRowItem>
                        <Label>{tr.get("general.to")}</Label>
                        <AddressHashBox>{tx.to}</AddressHashBox>
                    </LayoutRowItem> }
                    { txReceipt && txReceipt.contractAddress && <LayoutRowItem>
                        <Label>{tr.get("general.creates")}</Label>
                        <AddressHashBox>{txReceipt.contractAddress}</AddressHashBox>
                    </LayoutRowItem> }
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
                { txReceipt && <LayoutRow minWidth={750}>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.gasUsed.label")}</Label>
                        <GasUsedValueBox value={txReceipt.gasUsed} limit={tx.gasLimit} locale={locale} />
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.txFee.label")}</Label>
                        <EthValueBox wei={txReceipt.gasUsed.multipliedBy(tx.gasPrice)} decimals={9} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow> }
                { txReceipt && <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.cumulativeGasUsed.label")}</Label>
                        <NumberBox value={txReceipt.cumulativeGasUsed} locale={locale} />
                    </LayoutRowItem>
                </LayoutRow> }
            </LayoutSection>
            { txReceipt && !txReceipt.status ?
            <LayoutSection>
                <LayoutRow>
                    <LayoutRowItem>
                        <Label>{tr.get("txView.content.error.label")}</Label>
                        <ValueBox colors="error">{tr.get("txView.content.error.genericValue")}</ValueBox>
                        <ErrorIcon />
                    </LayoutRowItem>
                </LayoutRow>
            </LayoutSection>
            : null }
            { tx.payload ?
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <Label>{tr.get("txView.content.inputData.label")}</Label>
                        <HexData data={tx.payload} />
                    </LayoutRowItem>
                </LayoutRow>
            : null }
        </>;
    }
}
