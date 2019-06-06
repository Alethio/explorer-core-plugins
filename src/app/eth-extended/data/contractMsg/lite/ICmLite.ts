import { CmType } from "app/eth-extended/data/contractMsg/CmType";
import { BigNumber } from "app/util/BigNumber";

/** CM returned byTx or byCm */
export interface ICmLite {
    type: CmType;
    gasLimit: BigNumber;
    gasUsed: BigNumber;
    gasPrice: BigNumber;
    from: string;
    to: string;
    value: BigNumber;
    block: {
        id: number;
        creationTime: number;
    };
    originatorTxHash: string;
    depth: number;
    error: string | undefined;
    txValidationIndex: number;
    parentTxValidationIndex: number;
}
