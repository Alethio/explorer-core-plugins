import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { NumberBox } from "@alethio/ui/lib/data/box/NumberBox";
import { GasUsedValueBox } from "@alethio/ui/lib/data/box/GasUsedValueBox";
import { DifficultyBox } from "@alethio/ui/lib/data/box/DifficultyBox";
import { DecodedHexData } from "@alethio/ui/lib/data/hex/DecodedHexData";
import { HexData } from "@alethio/ui/lib/data/hex/HexData";
import { HashValueBox } from "@alethio/ui/lib/data/box/HashValueBox";
import { LayoutSection } from "@alethio/ui/lib/layout/content/LayoutSection";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TimeElapsedBox } from "app/shared/component/TimeElapsedBox";
import { BlockHashBox } from "@alethio/explorer-ui/lib/box/block/BlockHashBox";
import { ParentHashBox } from "@alethio/explorer-ui/lib/box/block/ParentHashBox";
import { BlockSizeBox } from "@alethio/explorer-ui/lib/box/block/BlockSizeBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { UncleHashBox } from "@alethio/explorer-ui/lib/box/uncle/UncleHashBox";
import { UnclesCountBox } from "@alethio/explorer-ui/lib/box/block/UnclesCountBox";
import { ITranslation } from "plugin-api/ITranslation";
import { IBlockDetails } from "app/eth-lite/data/block/details/IBlockDetails";
import { BlockDetailsSlotType } from "./BlockDetailsSlotType";

export interface IBlockDetailsProps {
    blockDetails: IBlockDetails;
    translation: ITranslation;
    locale: string;
    slots: Record<BlockDetailsSlotType, JSX.Element[]>;
}

export class BlockDetails extends React.PureComponent<IBlockDetailsProps> {
    render() {
        let { translation: tr, blockDetails: block, slots, locale } = this.props;

        return <>
            <LayoutSection useWrapper>
                <LayoutRow minWidth={900}>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.blockNumber.label")}</Label>
                        <BlockNumberBox noLink>{block.id}</BlockNumberBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        { block.creationTime ?
                        <>
                        <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                        <TimeElapsedBox timestamp={block.creationTime}
                            translation={tr}
                            locale={locale} />
                        </>
                        : null }
                        { slots[BlockDetailsSlotType.Confirmations] }
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.uncles.label")}</Label>
                        <UnclesCountBox locale={locale}>{block.uncles.length}</UnclesCountBox>
                    </LayoutRowItem>
                </LayoutRow>
                <LayoutRow minWidth={760}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.hash")}</Label>
                        <BlockHashBox>{block.hash}</BlockHashBox>
                    </LayoutRowItem>
                    {block.parentHash ?
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.parentHash.label")}</Label>
                        <ParentHashBox
                            linkTo={block.parentId !== void 0 ?
                                `page://aleth.io/block?blockNumber=${block.parentId}` :
                                void 0}
                        >
                            {block.parentHash}
                        </ParentHashBox>
                    </LayoutRowItem> : null }
                </LayoutRow>
                { block.uncles.length ?
                <LayoutRow>
                    <LayoutRowItem fullRow>
                        <Label>{tr.get("blockView.content.uncles.label")}</Label>
                        {block.uncles.map((uncleHash, idx) => (
                            <UncleHashBox key={uncleHash}
                                linkTo={`page://aleth.io/uncle?blockNumber=${block.id}&uncleIndex=${idx}`}
                            >
                                {uncleHash}
                            </UncleHashBox>
                        ))}
                    </LayoutRowItem>
                </LayoutRow>
                : null }
                { block.nonce ?
                <LayoutRow minWidth={710}>
                    <LayoutRowItem>
                        <Label>{tr.get("general.nonce")}</Label>
                        <HashValueBox>{block.nonce}</HashValueBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.blockSize.label")}</Label>
                        <BlockSizeBox bytes={block.byteSize} locale={locale} translations={{
                            bytes: tr.get("general.bytes")
                        }} />
                    </LayoutRowItem>
                </LayoutRow>
                : null }
            </LayoutSection>
            { slots[BlockDetailsSlotType.Txs]}
            <LayoutSection useWrapper>
                <LayoutRow minWidth={760}>
                    { block.sha3uncles ?
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.sha3Uncles.label")}</Label>
                        <HashValueBox>{block.sha3uncles}</HashValueBox>
                    </LayoutRowItem>
                    : null }
                </LayoutRow>
                <LayoutRow>
                    <LayoutRowItem fullRow>
                        <Label>{tr.get("blockView.content.beneficiary.label")}</Label>
                        <AddressHashBox>{block.beneficiaryAddress}</AddressHashBox>
                    </LayoutRowItem>
                </LayoutRow>
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
                { slots && slots[BlockDetailsSlotType.ExtraData] ||
                <LayoutRow>
                    <LayoutRowItem autoHeight>
                        <Label>{tr.get("blockView.content.extraData.label")}</Label>
                        <DecodedHexData data={block.extraData} />
                    </LayoutRowItem>
                </LayoutRow> }
                { block.mixHash ?
                <LayoutRow minWidth={760}>
                    <LayoutRowItem>
                        <Label>{tr.get("blockView.content.mixHash.label")}</Label>
                        <HashValueBox>{block.mixHash}</HashValueBox>
                    </LayoutRowItem>
                </LayoutRow>
                : null }
            </LayoutSection>
            <LayoutSection useWrapper>
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <Label>{tr.get("blockView.content.logsBloom.label")}</Label>
                        <HexData data={block.logsBloom} />
                    </LayoutRowItem>
                </LayoutRow>
            </LayoutSection>
        </>;
    }
}
