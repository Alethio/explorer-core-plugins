import { BigNumber } from "app/util/BigNumber";

export interface ITotalBalance {
    wei: BigNumber;
    usd: number;
    timestamp: number;
}
