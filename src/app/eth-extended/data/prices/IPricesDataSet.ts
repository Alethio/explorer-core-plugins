import { ICurrencyMeta } from "./ICurrencyMeta";
import { IPrices } from "./IPrices";

/** Data set containing all the data returned from the server in one request */
export interface IPricesDataSet {
    meta: ICurrencyMeta;
    /** Prices per block number */
    prices: Map<number, IPrices>;
}
