import * as React from "react";
import { IResult } from "app/shared/data/search/IResult";
import { ResultType } from "app/shared/data/search/ResultType";
import { AccountResult } from "./result/AccountResult";
import { ResultWrapper } from "./result/ResultWrapper";
import { BlockResult } from "app/eth-common/module/search/component/result/BlockResult";
import { ITranslation } from "plugin-api/ITranslation";
import { UncleResult } from "app/eth-common/module/search/component/result/UncleResult";
import { TxResult } from "app/eth-common/module/search/component/result/TxResult";

interface IResultComponentProps {
    result: IResult;
    translation?: ITranslation;
}

export interface IResultsListProps {
    results: IResult[];
    translation: ITranslation;
    onActivateResult(r: IResult): void;
}

export class ResultsList extends React.Component<IResultsListProps> {
    render() {
        return (
            <div>{
                this.props.results.map((r, i) => {
                    let ResultComponent = this.getResultComponent(r);
                    return <ResultWrapper key={i} onClick={() => this.props.onActivateResult(r)}>
                        <ResultComponent result={r} translation={this.props.translation} />
                    </ResultWrapper>;
                })
            }</div>
        );
    }

    private getResultComponent(r: IResult): React.ComponentType<IResultComponentProps> {
        if (r.type === ResultType.Account) {
            return AccountResult;
        } else if (r.type === ResultType.Block) {
            return BlockResult;
        } else if (r.type === ResultType.Uncle) {
            return UncleResult;
        } else if (r.type === ResultType.Tx) {
            return TxResult;
        } else {
            throw new Error(`Unknown resultType "${r.type}"`);
        }
    }
}
