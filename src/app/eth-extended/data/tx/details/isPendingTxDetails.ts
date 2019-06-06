import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { ITxDetailsPending } from "app/eth-extended/data/tx/details/ITxDetailsPending";
import { TxStatus } from "app/eth-extended/data/tx/TxStatus";

export function isPendingTxDetails(txDetails: ITxDetails): txDetails is ITxDetailsPending {
    return txDetails.status === TxStatus.Pending;
}
