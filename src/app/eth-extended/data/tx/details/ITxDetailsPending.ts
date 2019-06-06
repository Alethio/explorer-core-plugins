import { ITxDetailsBase } from "app/eth-extended/data/tx/details/ITxDetailsBase";
import { TxStatus } from "app/eth-extended/data/tx/TxStatus";
import { TxType } from "app/eth-extended/data/tx/TxType";

/**
 * Data for pending txs, coming from deepstream
 */
export interface ITxDetailsPending extends ITxDetailsBase {
    status: TxStatus.Pending;
    type: TxType.Unknown;
    firstSeenAt: number;
}
