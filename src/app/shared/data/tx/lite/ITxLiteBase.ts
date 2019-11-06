import {BigNumber} from "app/util/BigNumber";

export interface ITxLiteBase {
    index: number;
    value: BigNumber;
    hash: string;
    from: string;
    to: string;
    gasUsed: BigNumber;
    gasPrice: BigNumber;
    gasLimit: BigNumber;
}
