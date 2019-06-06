import { ICurrencyMeta } from "app/eth-extended/data/prices/ICurrencyMeta";
import { ITokenBalance } from "./ITokenBalance";

export interface IAccountBalanceDataSet extends Array<IAccountBalanceData> {

}

export interface IAccountBalanceData {
    currency: ICurrencyMeta;
    chart: ITokenBalance[];
}
