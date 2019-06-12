import * as React from "react";
import { IResult } from "app/shared/data/search/IResult";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITranslation } from "plugin-api/ITranslation";
import { IUncleResultData } from "app/shared/data/search/result/IUncleResultData";
import { UncleHashBox } from "@alethio/explorer-ui/lib/box/uncle/UncleHashBox";

export interface IUncleResultProps {
    result: IResult<IUncleResultData>;
    translation: ITranslation;
}

export class UncleResult extends React.Component<IUncleResultProps> {
    render() {
        let { result, translation: tr } = this.props;

        return (
            <>
                <div style={{ display: "flex", flexWrap: "wrap", pointerEvents: "none" }}>
                    <ValueBox>{tr.get("search.result.uncle.label")}</ValueBox>
                    <UncleHashBox>{result.data!.hash}</UncleHashBox>
                </div>
            </>
        );
    }
}
