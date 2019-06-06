import { BigNumber } from "app/util/BigNumber";

/**
 * Common properties found in all ITxDetails* types, regardless of data source
 */
export interface ITxDetailsBase {
    hash: string;
    from: string;
    to: string;
    value: BigNumber;
    nonce: number;
    gasLimit: BigNumber;
    gasPrice: BigNumber;
    payload: string | undefined;
}
