import * as React from "react";
import { IResult } from "app/shared/data/search/IResult";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITxResultData } from "app/shared/data/search/result/ITxResultData";
import { ITranslation } from "plugin-api/ITranslation";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";

export interface ITxResultProps {
    result: IResult<ITxResultData>;
    translation: ITranslation;
}

export class TxResult extends React.Component<ITxResultProps> {
    render() {
        let { result, translation: tr } = this.props;

        return (
            <>
                <div style={{ display: "flex", flexWrap: "wrap", pointerEvents: "none" }}>
                    <ValueBox>{tr.get("search.result.transaction.label")}</ValueBox>
                    <TxHashBox>{result.data!.hash}</TxHashBox>
                </div>
            </>
        );
    }
}
