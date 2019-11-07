// tslint:disable:no-string-literal
import { TxStatus } from "app/shared/data/tx/TxStatus";
import { BigNumber } from "app/util/BigNumber";
import { ITxDetailsMemento } from "app/eth-memento/data/tx/details/ITxDetailsMemento";

export class TxDetailsMementoReader {
    read(data: any) {
        let tx: ITxDetailsMemento = {
            status: TxStatus.Memento,
            hash: data["txHash"],
            from: data["from"],
            to: data["to"],
            value: new BigNumber(data["value"]),
            nonce: Number(data["txNonce"]),
            gasLimit: new BigNumber(data["msgGasLimit"]),
            gasUsed: new BigNumber(data["txGasUsed"]),
            gasPrice: new BigNumber(data["txGasPrice"]),
            cumulativeGasUsed: new BigNumber(data["cumulativeGasUsed"]),
            msgStatus: data["msgStatus"],
            error: Boolean(data["msgError"]) ? data["msgErrorString"] : void 0,
            payload: data["msgPayload"] || void 0,
            block: {
                id: Number(data["includedInBlock"]),
                creationTime: Number(data["blockCreationTime"])
            },
            txIndex: Number(data["txIndex"]),
            logEventsCount: Number(data["logEntriesTriggered"])
        };

        return tx;
    }
}
