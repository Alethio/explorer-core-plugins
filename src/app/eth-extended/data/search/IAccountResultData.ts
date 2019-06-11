import { IAccountResultData as IAccountResultDataBase } from "app/shared/data/search/result/IAccountResultData";

export interface IAccountResultData extends IAccountResultDataBase {
    label: string;
    symbol: string;
    types: string[];
}
