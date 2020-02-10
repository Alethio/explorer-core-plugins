import { TxType } from "app/shared/data/tx/TxType";
import { ITxLiteBase } from "app/shared/data/tx/lite/ITxLiteBase";

export interface ITxLiteFull extends ITxLiteBase {
    /** Not available for Memento */
    contractMsgCount?: number;
    /** Not available for Memento */
    contractCreationCount?: number;
    type: TxType;
}
