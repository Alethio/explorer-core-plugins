import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { HashValueBox } from "@alethio/ui/lib/data/box/HashValueBox";
import { LayoutSection } from "@alethio/ui/lib/layout/content/LayoutSection";
import { ErrorIcon } from "@alethio/ui/lib/icon/ErrorIcon";
import { Tooltip } from "@alethio/ui/lib/overlay/tooltip/Tooltip";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TimeElapsedBox } from "app/shared/component/TimeElapsedBox";
import { BlockHashBox } from "@alethio/explorer-ui/lib/box/block/BlockHashBox";
import { ParentHashBox } from "@alethio/explorer-ui/lib/box/block/ParentHashBox";
import { BlockSizeBox } from "@alethio/explorer-ui/lib/box/block/BlockSizeBox";
import { UncleHashBox } from "@alethio/explorer-ui/lib/box/uncle/UncleHashBox";
import { UnclesCountBox } from "@alethio/explorer-ui/lib/box/block/UnclesCountBox";
import { ITranslation } from "plugin-api/ITranslation";
import { IBlockDetails } from "app/shared/data/block/details/IBlockDetails";
import { BlockBasicSlotType } from "./BlockBasicSlotType";
import { BlockSummary } from "./blockSummary/BlockSummary";
import { isFullTxLite } from "app/shared/data/tx/lite/isFullTxLite";
import { ITxLiteFull } from "app/shared/data/tx/lite/ITxLiteFull";

export interface IBlockBasicProps {
    blockDetails: IBlockDetails;
    translation: ITranslation;
    locale: string;
    slots: Record<BlockBasicSlotType, JSX.Element[]>;
}

export class BlockBasic extends React.PureComponent<IBlockBasicProps> {
    render() {
        let { translation: tr, blockDetails: block, slots, locale } = this.props;

        return <LayoutSection useWrapper>
            <LayoutRow minWidth={900}>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.blockNumber.label")}</Label>
                    <BlockNumberBox noLink>{block.id}</BlockNumberBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    {block.creationTime ?
                    <>
                    <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                    <TimeElapsedBox timestamp={block.creationTime}
                        translation={tr}
                        locale={locale} />
                    </>
                    : null }
                    { slots[BlockBasicSlotType.Confirmations] }
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.uncles.label")}</Label>
                    <UnclesCountBox locale={locale}>{block.uncles.length}</UnclesCountBox>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow minWidth={760}>
                <LayoutRowItem>
                    <Label>{tr.get("general.hash")}</Label>
                    { block.inconsistentWarning ?
                        <Tooltip content={
                            <div style={{width: 450, textAlign: "center"}}>
                                { tr.get("blockView.content.inconsistentWarning.text") }
                            </div>
                        }>
                            <ErrorIcon />
                        </Tooltip>
                    : null}
                    <BlockHashBox>{block.hash}</BlockHashBox>
                </LayoutRowItem>
                {block.parentHash ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.parentHash.label")}</Label>
                    <ParentHashBox
                        linkTo={block.parentId ? `page://aleth.io/block?blockNumber=${block.parentId}` : void 0}
                    >
                        {block.parentHash}
                    </ParentHashBox>
                </LayoutRowItem> : null }
            </LayoutRow>
            { block.uncles.length ?
            <LayoutRow>
                <LayoutRowItem fullRow>
                    <Label>{tr.get("blockView.content.uncles.label")}</Label>
                    {block.uncles.map(uncleHash => (
                        <UncleHashBox key={uncleHash} linkTo={`page://aleth.io/uncle?uncleHash=${uncleHash}`}>
                            {uncleHash}
                        </UncleHashBox>
                    ))}
                </LayoutRowItem>
            </LayoutRow>
            : null }
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
            { block.transactions.length && isFullTxLite(block.transactions[0]) ?
            <LayoutRow>
                <LayoutRowItem fullRow autoHeight>
                    <Label>{tr.get("blockView.content.blockSummary.label")}</Label>
                    <div style={{maxWidth: 500, flex: "1 1 auto"}}>
                        <BlockSummary transactions={block.transactions as ITxLiteFull[]} translation={tr}/>
                    </div>
                </LayoutRowItem>
            </LayoutRow>
            : null }
        </LayoutSection>;
    }
}
