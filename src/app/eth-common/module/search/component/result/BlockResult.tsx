import * as React from "react";
import { IResult } from "app/shared/data/search/IResult";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { IBlockResultData } from "app/shared/data/search/result/IBlockResultData";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { ITranslation } from "plugin-api/ITranslation";

export interface IBlockResultProps {
    result: IResult<IBlockResultData>;
    translation: ITranslation;
}

export class BlockResult extends React.Component<IBlockResultProps> {
    render() {
        let { result, translation: tr } = this.props;

        return (
            <>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <ValueBox>{tr.get("search.result.blockNumber.label")}</ValueBox>
                    <BlockNumberBox>{result.data!.blockNumber}</BlockNumberBox>
                </div>
            </>
        );
    }
}
