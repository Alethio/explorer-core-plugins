import { BigNumber } from "app/util/BigNumber";

export interface ITokenInfo {
    name?: string;
    symbol?: string;
    /** Assumed to be 0 if missing */
    decimals: number;
    /** integer including decimals */
    totalSupply?: BigNumber;
}
