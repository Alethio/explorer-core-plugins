import { ResultType } from "./ResultType";

export interface IResult<T = unknown> {
    type: ResultType;
    data?: T;
}
