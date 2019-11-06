// tslint:disable:no-string-literal
import { ITxDetailsBase } from "app/eth-extended/data/tx/details/ITxDetailsBase";
import { TxStatus } from "app/eth-extended/data/tx/TxStatus";
import { ITxDetailsMined } from "app/eth-extended/data/tx/details/ITxDetailsMined";
import { TxType } from "app/shared/data/tx/TxType";
import { ITxDetailsPending } from "app/eth-extended/data/tx/details/ITxDetailsPending";
import { BigNumber } from "app/util/BigNumber";

export class TxDetailsPartialReader {
    read(data: any) {
        let tx: ITxDetailsBase = {
            hash: data["txHash"],
            from: data["from"],
            to: data["to"],
            value: new BigNumber(data["value"]),
            nonce: Number(data["txNonce"]),
            gasLimit: new BigNumber(data["msgGasLimit"]),
            gasPrice: new BigNumber(data["txGasPrice"]),
            payload: data["msgPayload"] || void 0
        };

        // Make sure we can determine if this is a Mined or Pending Tx, and we're not missing critical fields
        if (data["includedInBlock"] === void 0 && data["firstSeenAt"] === void 0) {
            throw new Error(`Invalid tx details (txHash = ${tx.hash})`);
        }

        if (data["includedInBlock"]) {
            let minedTx: ITxDetailsMined = {
                ...tx,
                status: TxStatus.Mined,
                type: TxType.Unknown,
                block: {
                    id: Number(data["includedInBlock"]),
                    creationTime: Number(data["blockCreationTime"])
                },
                txIndex: Number(data["txIndex"]),
                firstSeenAt: Number(data["firstSeenAt"])
            };
            return minedTx;
        } else {
            let pendingTx: ITxDetailsPending = {
                ...tx,
                status: TxStatus.Pending,
                type: TxType.Unknown,
                firstSeenAt: Number(data["firstSeenAt"])
            };
            return pendingTx;
        }
    }
}
