import { IResult } from "./IResult";

export interface ISearch {
    search(query: string): Promise<IResult | undefined>;
}
