import { ICurrencyMeta } from "app/eth-extended/data/prices/ICurrencyMeta";
import { IAccountBalanceDataSet, IAccountBalanceData } from "./IAccountBalanceDataSet";
import { ITokenBalance } from "./ITokenBalance";
import { BigNumber } from "app/util/BigNumber";

// tslint:disable:no-string-literal
export class AccountBalanceDataSetReader {
    read(data: any): IAccountBalanceDataSet {
        return Object.keys(data).map(token => this.readTokenData(data[token]));
    }

    private readTokenData(data: any) {
        let rawCurrencyData = data["currency"];
        let meta: ICurrencyMeta = {
            id: rawCurrencyData["id"],
            name: rawCurrencyData["name"],
            symbol: rawCurrencyData["symbol"],
            address: (rawCurrencyData["address"] as string).replace(/^0x/, ""),
            decimals: Number(rawCurrencyData["decimals"])
        };
        let rawChartData = data["chart"];
        let chart = rawChartData.map((d: any) => {
            let chartDataItem: ITokenBalance = {
                timestamp: Number(d["timestamp"]) || 0,
                balance: new BigNumber(d["balance"]),
                priceUsd: Number(d["price_USD"]),
                balanceUsd: Number(d["balance_USD"]),
                blockNumber: Number(d["block"])
            };
            return chartDataItem;
        });

        let balanceData: IAccountBalanceData = {
            currency: meta,
            chart
        };
        return balanceData;
    }
}
