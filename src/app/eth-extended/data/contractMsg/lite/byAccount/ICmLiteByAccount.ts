import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";

export interface ICmLiteByAccount extends ICmLite {
    blockMsgValidationIndex: number;
}
