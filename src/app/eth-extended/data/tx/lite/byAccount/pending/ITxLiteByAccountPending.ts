import { ITxLiteByAccountBase } from "app/shared/data/tx/byAccount/ITxLiteByAccountBase";

/**
 * Data for pending txs, coming from deepstream
 */
export interface ITxLiteByAccountPending extends ITxLiteByAccountBase {
    firstSeenAt: number;
}
