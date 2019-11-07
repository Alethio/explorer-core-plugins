import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { ITxDetailsMemento } from "app/eth-memento/data/tx/details/ITxDetailsMemento";
import { TxStatus } from "app/shared/data/tx/TxStatus";

export function isMementoTxDetails(txDetails: ITxDetails): txDetails is ITxDetailsMemento {
    return txDetails.status === TxStatus.Memento;
}
