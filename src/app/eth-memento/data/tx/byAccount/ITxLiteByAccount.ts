import { ITxLiteByAccountBase } from "app/shared/data/tx/byAccount/ITxLiteByAccountBase";
import { BigNumber } from "app/util/BigNumber";

export interface ITxLiteByAccount extends ITxLiteByAccountBase {
    gasUsed: BigNumber;
    block: {
        id: number;
        creationTime: number;
    };
    success: boolean | undefined;
    txIndex: number;
}
