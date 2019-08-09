import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { HexData } from "@alethio/ui/lib/data/hex/HexData";
import { LayoutSection } from "@alethio/ui/lib/layout/content/LayoutSection";
import { ITranslation } from "plugin-api/ITranslation";
import { IBlockDetails } from "app/eth-extended/data/block/details/IBlockDetails";

export interface IBlockLogsBloomProps {
    blockDetails: IBlockDetails;
    translation: ITranslation;
    locale: string;
}

export class BlockLogsBloom extends React.PureComponent<IBlockLogsBloomProps> {
    render() {
        let { translation: tr, blockDetails: block } = this.props;

        return <LayoutSection useWrapper>
            <LayoutRow>
                <LayoutRowItem fullRow autoHeight>
                    <Label>{tr.get("blockView.content.logsBloom.label")}</Label>
                    <HexData data={block.logsBloom} />
                </LayoutRowItem>
            </LayoutRow>
        </LayoutSection>;
    }
}
