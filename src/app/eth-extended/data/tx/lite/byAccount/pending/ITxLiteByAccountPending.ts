import { ITxLiteByAccountBase } from "app/eth-extended/data/tx/lite/byAccount/ITxLiteByAccountBase";

/**
 * Data for pending txs, coming from deepstream
 */
export interface ITxLiteByAccountPending extends ITxLiteByAccountBase {
    firstSeenAt: number;
}
