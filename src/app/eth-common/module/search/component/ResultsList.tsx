import * as React from "react";
import { IResult } from "app/shared/data/search/IResult";

export interface IResultsListProps {
    results: IResult[];
    onActivateResult(r: IResult): void;
}

export class ResultsList extends React.Component<IResultsListProps> {
    render() {
        return (
            <div>{
                this.props.results.map((r, i) => <div key={i} onClick={
                    () => this.props.onActivateResult(r)}>{r.type} {JSON.stringify(r.data)}</div>)
            }</div>
        );
    }
}
