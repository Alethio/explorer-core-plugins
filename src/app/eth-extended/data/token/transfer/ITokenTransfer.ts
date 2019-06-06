import { BigNumber } from "app/util/BigNumber";

export interface ITokenTransfer {
    address: string;
    name?: string;
    symbol?: string;
    from: string;
    to: string;
    value: BigNumber;
    gasUsed: BigNumber;
    gasPrice: BigNumber;
    decimals: number;
}
