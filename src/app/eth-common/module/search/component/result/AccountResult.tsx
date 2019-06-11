import * as React from "react";
import { IResult } from "app/shared/data/search/IResult";
import { IAccountResultData as IAccountResultDataExtended } from "app/eth-extended/data/search/IAccountResultData";
import { IAccountResultData as IAccountResultDataBasic } from "app/shared/data/search/result/IAccountResultData";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ResultDescription } from "./ResultDescription";
import { ResultTypes } from "./ResultTypes";

export interface IAccountResultProps {
    result: IResult<IAccountResultDataExtended | IAccountResultDataBasic>;
}

export class AccountResult extends React.Component<IAccountResultProps> {
    render() {
        let { result } = this.props;

        return (
            <>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    { (result.data! as IAccountResultDataExtended).label ?
                    <ValueBox>{(result.data! as IAccountResultDataExtended).label}</ValueBox>
                    : null }
                    { (result.data! as IAccountResultDataExtended).symbol ?
                    <ValueBox colors="secondaryInvert">{(result.data! as IAccountResultDataExtended).symbol}</ValueBox>
                    : null }
                </div>
                <ResultDescription>{result.data!.address}</ResultDescription>
                { (result.data! as IAccountResultDataExtended).types ?
                <ResultTypes>{(result.data! as IAccountResultDataExtended).types.join(", ")}</ResultTypes>
                : null }
            </>
        );
    }
}
