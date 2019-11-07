// tslint:disable:no-string-literal
import { ITxDetailsFull } from "app/eth-extended/data/tx/details/ITxDetailsFull";
import { readTxType } from "app/shared/data/tx/readTxType";
import { TxStatus } from "app/shared/data/tx/TxStatus";
import { Decoder } from "app/shared/data/payload/Decoder";
import { BigNumber } from "app/util/BigNumber";

export class TxDetailsFullReader {
    constructor(private payloadDecoder: Decoder) {

    }

    read(data: any) {
        let tx: ITxDetailsFull = {
            status: TxStatus.Consolidated,
            hash: data["txHash"],
            type: readTxType(data["type"]),
            from: data["from"],
            to: data["to"],
            value: new BigNumber(data["value"]),
            nonce: Number(data["txNonce"]),
            gasLimit: new BigNumber(data["msgGasLimit"]),
            gasUsed: new BigNumber(data["txGasUsed"]),
            gasPrice: new BigNumber(data["txGasPrice"]),
            cumulativeGasUsed: new BigNumber(data["cumulativeGasUsed"]),
            error: Boolean(data["msgError"]) ? data["msgErrorString"] : void 0,
            payload: data["msgPayload"] || void 0,
            decodedPayload: this.payloadDecoder.decode(
                data["msgPayload"] || void 0,
                data["msgPayloadDecoded"] || void 0
            ),
            block: {
                id: Number(data["includedInBlock"]),
                creationTime: Number(data["blockCreationTime"])
            },
            txIndex: Number(data["txIndex"]),
            firstSeenAt: data["firstSeenAt"] ? Number(data["firstSeenAt"]) : void 0,
            contractMsgCount: Number(data["totalContractMsgsTriggered"]),
            tokenTransferCount: Number(data["tokenTransfersTriggered"]),
            logEventsCount: Number(data["logEntriesTriggered"])
        };

        return tx;
    }
}
