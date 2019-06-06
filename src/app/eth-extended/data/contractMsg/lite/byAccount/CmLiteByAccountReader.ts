// tslint:disable:no-string-literal
import { CmLiteReader } from "app/eth-extended/data/contractMsg/lite/CmLiteReader";
import { ICmLiteByAccount } from "app/eth-extended/data/contractMsg/lite/byAccount/ICmLiteByAccount";

export class CmLiteByAccountReader {
    constructor(private cmLiteReader: CmLiteReader) {

    }

    read(data: any) {
        let contractMsg: ICmLiteByAccount = {
            ...(this.cmLiteReader.read(data)),
            blockMsgValidationIndex: Number(data["blockMsgValidationIndex"])
        };
        return contractMsg;
    }
}
