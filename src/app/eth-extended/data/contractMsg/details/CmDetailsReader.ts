// tslint:disable:no-string-literal
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";
import { readCmType } from "app/eth-extended/data/contractMsg/readCmType";
import { Decoder } from "app/eth-extended/data/payload/Decoder";
import { BigNumber } from "app/util/BigNumber";

export class CmDetailsReader {
    constructor(private payloadDecoder: Decoder) {

    }

    read(data: any) {
        let contractMsg: ICmDetails = {
            type: readCmType(data["type"]),
            gasLimit: new BigNumber(data["msgGasLimit"]),
            gasUsed: new BigNumber(data["msgGasUsed"]),
            gasPrice: new BigNumber(data["txGasPrice"]),
            from: data["from"],
            to: data["to"],
            value: new BigNumber(data["value"]),
            refundBalance: data["msgRefundBalance"] !== void 0 ? new BigNumber(data["msgRefundBalance"]) : void 0,
            block: {
                id: Number(data["includedInBlock"]),
                creationTime: Number(data["blockCreationTime"])
            },
            payload: data["msgPayload"] || void 0,
            decodedPayload: this.payloadDecoder.decode(
                data["msgPayload"] || void 0,
                data["msgPayloadDecoded"] || void 0
            ),
            output: data["msgOutput"] || void 0,
            error: Boolean(data["msgError"]) ? data["msgErrorString"] : void 0,
            msgsTriggered: Number(data["contractMsgsTriggered"]),
            tokenTransferCount: data["tokenTransfersTriggered"],
            logEventsCount: Number(data["logEntriesTriggered"]),
            totalMsgsTriggered: Number(data["totalContractMsgsTriggered"]),
            depth: Number(data["msgCallDepth"]),
            traceAddr: (JSON.parse(data["traceAddress"]) as any[]).map(s => Number(s)),
            blockValidationIdx: Number(data["blockMsgValidationIndex"]),
            txValidationIndex: Number(data["txMsgValidationIndex"]),
            txHash: String(data["txHash"]),
            parentTxValidationIndex: Number(data["parentTxMsgValidationIndex"])
        };
        return contractMsg;
    }
}
