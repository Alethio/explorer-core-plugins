import * as React from "react";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { ITranslation } from "plugin-api/ITranslation";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TxCountBox } from "@alethio/explorer-ui/lib/box/block/TxCountBox";
import { UnclesCountBox } from "@alethio/explorer-ui/lib/box/block/UnclesCountBox";
import { TimeElapsedBox } from "app/shared/component/TimeElapsedBox";
import { IBlockBasicInfo } from "app/shared/data/block/IBlockBasicInfo";

export interface ILatestBlockInfoProps {
    translation: ITranslation;
    lastBlock: IBlockBasicInfo;
    locale: string;
}

export class LatestBlockInfo extends React.Component<ILatestBlockInfoProps> {
    render() {
        let { translation: tr, locale } = this.props;

        return (
            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <LayoutRowItem>
                    <Label>{ tr.get("dashboardView.content.latestBlock.label") }</Label>
                    <BlockNumberBox>{ this.props.lastBlock.id }</BlockNumberBox>
                </LayoutRowItem>
                { this.props.lastBlock.creationTime ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.blockCreationTime.label")}</Label>
                    <TimeElapsedBox timestamp={this.props.lastBlock.creationTime}
                        translation={tr}
                        nonclickable
                        locale={locale} />
                </LayoutRowItem>
                : null }
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.transactions.label")}</Label>
                    <TxCountBox>{ this.props.lastBlock.transactions.length }</TxCountBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.uncles.label")}</Label>
                    <UnclesCountBox locale={locale}>{this.props.lastBlock.uncleCount}</UnclesCountBox>
                </LayoutRowItem>
            </div>
        );
    }
}
