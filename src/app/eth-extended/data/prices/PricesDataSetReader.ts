// tslint:disable:no-string-literal
import { IPrices } from "./IPrices";
import { IPricesDataSet } from "./IPricesDataSet";
import { ICurrencyMeta } from "./ICurrencyMeta";

export class PricesDataSetReader {
    read(data: any) {
        let rawCurrencyData = data["currency"];
        let rawPrices = data["prices"];
        let meta: ICurrencyMeta = {
            id: rawCurrencyData["id"],
            name: rawCurrencyData["name"],
            symbol: rawCurrencyData["symbol"],
            address: (rawCurrencyData["address"] as string).replace(/^0x/, ""),
            decimals: Number(rawCurrencyData["decimals"])
        };
        let dataSet: IPricesDataSet = {
            meta,
            prices: Object.keys(rawPrices).reduce((map, blockNo) => {
                let prices: IPrices = {
                    usd: Number(rawPrices[blockNo]["price_usd"]),
                    btc: Number(rawPrices[blockNo]["price_btc"])
                };
                map.set(Number(blockNo), prices);
                return map;
            }, new Map<number, IPrices>())
        };

        return dataSet;
    }
}
