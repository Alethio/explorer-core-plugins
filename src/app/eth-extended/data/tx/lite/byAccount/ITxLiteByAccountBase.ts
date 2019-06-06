import { BigNumber } from "app/util/BigNumber";

export interface ITxLiteByAccountBase {
    hash: string;
    from: string;
    to: string;
    value: BigNumber;
    gasPrice: BigNumber;
}
