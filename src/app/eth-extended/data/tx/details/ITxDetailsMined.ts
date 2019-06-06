import { TxType } from "app/eth-extended/data/tx/TxType";
import { TxStatus } from "app/eth-extended/data/tx/TxStatus";
import { ITxDetailsBase } from "app/eth-extended/data/tx/details/ITxDetailsBase";
import { BigNumber } from "app/util/BigNumber";

/**
 * Data for mined txs, coming from deepstream
 */
export interface ITxDetailsMined extends ITxDetailsBase {
    status: TxStatus.Mined;
    type: TxType.Unknown;
    block: {
        id: number;
        creationTime: number;
    };
    txIndex: number;
    gasUsed: BigNumber;
    cumulativeGasUsed: BigNumber;
    firstSeenAt: number;
    error: boolean;
}
