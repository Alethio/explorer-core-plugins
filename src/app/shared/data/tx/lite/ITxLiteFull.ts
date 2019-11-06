import { TxType } from "app/shared/data/tx/TxType";
import { ITxLiteBase } from "app/shared/data/tx/lite/ITxLiteBase";

export interface ITxLiteFull extends ITxLiteBase {
    contractMsgCount: number;
    contractCreationCount: number;
    type: TxType;
}
