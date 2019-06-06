import { BigNumber } from "app/util/BigNumber";

export interface ITxReceipt {
    blockHash: string;
    contractAddress?: string;
    cumulativeGasUsed: BigNumber;
    gasUsed: BigNumber;
    logsBloom: string;
    status: boolean;
}
