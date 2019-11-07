import { ITxDetailsBase } from "app/shared/data/tx/details/ITxDetailsBase";
import { TxStatus } from "app/shared/data/tx/TxStatus";
import { TxType } from "app/shared/data/tx/TxType";

/**
 * Data for pending txs, coming from deepstream
 */
export interface ITxDetailsPending extends ITxDetailsBase {
    status: TxStatus.Pending;
    type: TxType.Unknown;
    firstSeenAt: number;
}
