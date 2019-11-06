// tslint:disable:no-string-literal
import { ITxLiteByAccountMined } from "app/eth-extended/data/tx/lite/byAccount/mined/ITxLiteByAccountMined";
import { readTxType } from "app/shared/data/tx/readTxType";
import { BigNumber } from "app/util/BigNumber";

export class TxLiteByAccountMinedReader {
    read(data: any) {
        let tx: ITxLiteByAccountMined = {
            hash: data["txHash"],
            type: readTxType(data["type"]),
            from: data["from"],
            to: data["to"],
            value: new BigNumber(data["value"]),
            gasUsed: new BigNumber(data["txGasUsed"]),
            gasPrice: new BigNumber(data["txGasPrice"]),
            error: data["msgErrorString"] !== "" ? data["msgErrorString"] : void 0,
            block: {
                id: Number(data["includedInBlock"]),
                creationTime: Number(data["blockCreationTime"])
            },
            blockMsgValidationIndex: Number(data["blockMsgValidationIndex"])
        };

        return tx;
    }
}
