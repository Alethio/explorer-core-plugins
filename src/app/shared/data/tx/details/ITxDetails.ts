import { ITxDetailsFull } from "app/eth-extended/data/tx/details/ITxDetailsFull";
import { ITxDetailsMined } from "app/eth-extended/data/tx/details/ITxDetailsMined";
import { ITxDetailsPending } from "app/eth-extended/data/tx/details/ITxDetailsPending";
import { ITxDetailsMemento } from "app/eth-memento/data/tx/details/ITxDetailsMemento";

export type ITxDetails = ITxDetailsFull | ITxDetailsMined | ITxDetailsPending | ITxDetailsMemento;
