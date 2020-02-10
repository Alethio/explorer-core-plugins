// tslint:disable:no-string-literal
import { IBlockDetails } from "./IBlockDetails";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { readTxType } from "app/shared/data/tx/readTxType";
import { TxType } from "app/shared/data/tx/TxType";
import { BigNumber } from "app/util/BigNumber";
import { LinkedError } from "app/util/LinkedError";

export class BlockDetailsReader {
    read(data: any) {
        let blockNumber = Number(data["number"]);
        let block: IBlockDetails = {
            id: blockNumber,
            creationTime: Number(data["blockCreationTime"]) || void 0,
            hash: data["blockHash"],
            parentHash: data["parentBlockHash"] || void 0,
            parentId: blockNumber > 0 ? blockNumber - 1 : void 0,
            nonce: data["blockNonce"],
            byteSize: Number(data["blockSize"]),
            contractMsgCount: Number(data["numberOfContractMsgs"]),
            txTrie: data["hasTxTrie"],
            sha3uncles: data["sha3Uncles"],
            beneficiaryAddress: data["hasBeneficiary"],
            beneficiaryName: data["hasBeneficiaryAlias"] || void 0,
            beneficiaryReward: data["blockBeneficiaryReward"] !== void 0 ?
                new BigNumber(data["blockBeneficiaryReward"]) : void 0,
            mineTime: Number(data["blockTime"]) || void 0,
            gasLimit: new BigNumber(data["blockGasLimit"]),
            gasUsed: new BigNumber(data["blockGasUsed"]),
            difficulty: new BigNumber(data["blockDifficulty"]),
            extraData: String(data["blockExtraData"]),
            logsBloom: data["blockLogsBloom"],
            mixHash: String(data["blockMixHash"]),
            receiptsTrie: data["hasReceiptsTrie"],
            uncles: (data["includesUncle"] || []) as string[],
            transactions: ((data["txs"] || []) as any[]).map(txData => {
                let txHash = txData["txHash"];
                try {
                    let type = txData["type"] && readTxType(txData["type"]) || void 0;
                    let tx: ITxLite = {
                        index: Number(txData["txIndex"]),
                        value: new BigNumber(txData["value"]),
                        hash: txHash,
                        from: txData["from"],
                        to: txData["to"],
                        contractCreationCount: txData["createContractMsgsTriggered"] !== void 0 ?
                            Number(txData["createContractMsgsTriggered"]) + (
                            // If this is a CreateTX, we should also consider itself as a source of contract creations
                            type === TxType.Create ? 1 : 0
                        ) : void 0,
                        contractMsgCount: txData["totalContractMsgsTriggered"] !== void 0 ?
                            Number(txData["totalContractMsgsTriggered"]) : void 0,
                        gasLimit: new BigNumber(txData["msgGasLimit"]),
                        gasPrice: new BigNumber(txData["txGasPrice"]),
                        gasUsed: new BigNumber(txData["txGasUsed"]),
                        type
                    };
                    return tx;
                } catch (e) {
                    throw new LinkedError(`Invalid data for block #${blockNumber}.` +
                        `Transaction with hash "${txHash}" has errors.`, e);
                }
            }).sort((a, b) => a.index - b.index),
            inconsistentWarning: data["alethioComment"] && data["alethioComment"]["inconsistent"] || void 0
        };

        return block;
    }
}
