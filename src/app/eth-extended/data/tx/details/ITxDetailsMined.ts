import { TxType } from "app/shared/data/tx/TxType";
import { TxStatus } from "app/shared/data/tx/TxStatus";
import { ITxDetailsBase } from "app/shared/data/tx/details/ITxDetailsBase";

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
    firstSeenAt: number;
}
