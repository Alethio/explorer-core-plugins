import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { TxStatus } from "app/eth-extended/data/tx/TxStatus";
import { ITxDetailsFull } from "app/eth-extended/data/tx/details/ITxDetailsFull";

export function isFullTxDetails(txDetails: ITxDetails): txDetails is ITxDetailsFull {
    return txDetails.status === TxStatus.Consolidated;
}
