import * as React from "react";
import { IResult } from "app/shared/data/search/IResult";
import { ResultType } from "app/shared/data/search/ResultType";
import { AccountResult } from "./result/AccountResult";
import { ResultWrapper } from "./result/ResultWrapper";

interface IResultComponentProps {
    result: IResult;
}

export interface IResultsListProps {
    results: IResult[];
    onActivateResult(r: IResult): void;
}

export class ResultsList extends React.Component<IResultsListProps> {
    render() {
        return (
            <div>{
                this.props.results.map((r, i) => {
                    let ResultComponent = this.getResultComponent(r);
                    return <ResultWrapper key={i} onClick={() => this.props.onActivateResult(r)}>
                        <ResultComponent result={r} />
                    </ResultWrapper>;
                })
            }</div>
        );
    }

    private getResultComponent(r: IResult): React.ComponentType<IResultComponentProps> {
        if (r.type === ResultType.Account) {
            return AccountResult;
        } else if (r.type === ResultType.Block) {
            return () => <div>Block</div>;
        } else if (r.type === ResultType.Uncle) {
            return () => <div>Uncle</div>;
        } else if (r.type === ResultType.Tx) {
            return () => <div>Tx</div>;
        } else {
            throw new Error(`Unknown resultType "${r.type}"`);
        }
    }
}
