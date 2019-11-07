import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { ITxDetailsMemento } from "app/eth-memento/data/tx/details/ITxDetailsMemento";

export function isMementoTxDetails(txDetails: ITxDetails): txDetails is ITxDetailsMemento {
    return (txDetails as ITxDetailsMemento).status !== undefined;
}
