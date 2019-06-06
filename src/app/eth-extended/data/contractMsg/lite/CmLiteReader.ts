// tslint:disable:no-string-literal
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { readCmType } from "app/eth-extended/data/contractMsg/readCmType";
import { BigNumber } from "app/util/BigNumber";

export class CmLiteReader {
    read(data: any) {
        let contractMsg: ICmLite = {
            type: readCmType(data["type"]),
            gasLimit: new BigNumber(data["msgGasLimit"]),
            gasUsed: new BigNumber(data["msgGasUsed"]),
            gasPrice: new BigNumber(data["txGasPrice"]),
            from: data["from"],
            to: data["to"],
            value: new BigNumber(data["value"]),
            block: {
                id: Number(data["includedInBlock"]),
                creationTime: Number(data["blockCreationTime"])
            },
            originatorTxHash: data["txHash"],
            depth: Number(data["msgCallDepth"]),
            error: Boolean(data["msgError"]) ? data["msgErrorString"] : void 0,
            txValidationIndex: Number(data["txMsgValidationIndex"]),
            parentTxValidationIndex: Number(data["parentTxMsgValidationIndex"])
        };
        return contractMsg;
    }
}
