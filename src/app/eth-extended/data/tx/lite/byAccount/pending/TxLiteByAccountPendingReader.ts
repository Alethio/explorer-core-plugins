// tslint:disable:no-string-literal
import { ITxLiteByAccountPending } from "./ITxLiteByAccountPending";
import { BigNumber } from "app/util/BigNumber";

export class TxLiteByAccountPendingReader {
    read(data: any) {
        let tx: ITxLiteByAccountPending = {
            hash: data["txHash"],
            from: data["from"],
            to: data["to"],
            value: new BigNumber(data["value"]),
            gasPrice: new BigNumber(data["txGasPrice"]),
            firstSeenAt: Number(data["firstSeenAt"])
            // We should also have these fields available:
            // msgGasLimit, msgPayload, txNonce, accountPublicKey, txR, txS, txV
        };

        return tx;
    }
}
