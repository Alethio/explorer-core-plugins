import { BigNumber } from "app/util/BigNumber";

/**
 * Lightweight transaction data in context of a selected block.
 * Full data from consolidated block api.
 */
export interface ITxLite {
    index: number;
    value: BigNumber;
    hash: string;
    from: string;
    to: string;
    gasUsed: BigNumber;
    gasPrice: BigNumber;
    gasLimit: BigNumber;
}
