import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { NumberBox } from "@alethio/ui/lib/data/box/NumberBox";
import { GasUsedValueBox } from "@alethio/ui/lib/data/box/GasUsedValueBox";
import { DifficultyBox } from "@alethio/ui/lib/data/box/DifficultyBox";
import { DecodedHexData } from "@alethio/ui/lib/data/hex/DecodedHexData";
import { HashValueBox } from "@alethio/ui/lib/data/box/HashValueBox";
import { LayoutSection } from "@alethio/ui/lib/layout/content/LayoutSection";
import { CmCountBox } from "app/eth-extended/component/box/cm/CmCountBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { MinerLabelBox } from "@alethio/explorer-ui/lib/box/account/MinerLabelBox";
import { TimeInPoolBox } from "@alethio/explorer-ui/lib/box/tx/TimeInPoolBox";
import { Link } from "plugin-api/component/Link";
import { ITranslation } from "plugin-api/ITranslation";
import { IBlockDetails } from "app/eth-extended/data/block/details/IBlockDetails";
import { BlockAdvancedSlotType } from "./BlockAdvancedSlotType";

export interface IBlockAdvancedProps {
    blockDetails: IBlockDetails;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    slots: Record<BlockAdvancedSlotType, JSX.Element[]>;
}

export class BlockAdvanced extends React.PureComponent<IBlockAdvancedProps> {
    render() {
        let { translation: tr, blockDetails: block, slots, locale, ethSymbol } = this.props;

        return <LayoutSection useWrapper>
            { block.transactions.length ?
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.contractMessages.label")}</Label>
                    <CmCountBox>{block.contractMsgCount}</CmCountBox>
                    <ValueBox colors="primary">
                        {tr.get("blockView.content.contractMessages.text")}</ValueBox>
                </LayoutRowItem>
            </LayoutRow>
            : null }
            { block.txTrie || block.sha3uncles ?
            <LayoutRow minWidth={760}>
                { block.txTrie ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.txTrie.label")}</Label>
                    <HashValueBox>{block.txTrie}</HashValueBox>
                </LayoutRowItem>
                : [] }
                { block.sha3uncles ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.sha3Uncles.label")}</Label>
                    <HashValueBox>{block.sha3uncles}</HashValueBox>
                </LayoutRowItem>
                : null }
            </LayoutRow>
            : null }
            { block.beneficiaryAddress ?
            <LayoutRow>
                <LayoutRowItem fullRow>
                    <Label>{tr.get("blockView.content.beneficiary.label")}</Label>
                    <AddressHashBox>{block.beneficiaryAddress}</AddressHashBox>
                    { block.beneficiaryName ?
                    <Link to={`page://aleth.io/account?accountHash=${block.beneficiaryAddress!}`}>
                        <MinerLabelBox>{block.beneficiaryName}</MinerLabelBox>
                    </Link>
                    : null }
                    { block.mineTime ?
                    <TimeInPoolBox seconds={block.mineTime} colors="secondary"
                        translation={tr.get("blockView.content.beneficiary.mineTime")} />
                    : null }
                    <Label arrow>{tr.get("blockView.content.beneficiary.reward.label")}</Label>
                    <EthValueBox wei={block.beneficiaryReward} locale={locale} symbol={ethSymbol} />
                </LayoutRowItem>
            </LayoutRow>
            : null }
            <LayoutRow minWidth={760}>
                <LayoutRowItem>
                    <Label>{tr.get("general.gasLimit")}</Label>
                    <NumberBox value={block.gasLimit} locale={locale} />
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>{tr.get("general.gasUsed")}</Label>
                    <GasUsedValueBox value={block.gasUsed} limit={block.gasLimit} locale={locale} />
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.difficulty.label")}</Label>
                    <DifficultyBox value={block.difficulty} locale={locale} />
                </LayoutRowItem>
            </LayoutRow>
            { slots && slots[BlockAdvancedSlotType.ExtraData] ||
            <LayoutRow>
                <LayoutRowItem autoHeight>
                    <Label>{tr.get("blockView.content.extraData.label")}</Label>
                    <DecodedHexData data={block.extraData} />
                </LayoutRowItem>
            </LayoutRow> }
            { block.mixHash || block.receiptsTrie ?
            <LayoutRow minWidth={760}>
                { block.mixHash ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.mixHash.label")}</Label>
                    <HashValueBox>{block.mixHash}</HashValueBox>
                </LayoutRowItem>
                : [] }
                { block.receiptsTrie ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.receiptsTrie.label")}</Label>
                    <HashValueBox>{block.receiptsTrie}</HashValueBox>
                </LayoutRowItem>
                : null }
            </LayoutRow>
            : null }
        </LayoutSection>;
    }
}
