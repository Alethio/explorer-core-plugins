// tslint:disable:no-string-literal
import { IBlockDetails } from "./IBlockDetails";
import { ITxLite } from "app/eth-extended/data/tx/ITxLite";
import { readTxType } from "app/eth-extended/data/tx/readTxType";
import { TxType } from "app/eth-extended/data/tx/TxType";
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
            beneficiaryReward: new BigNumber(data["blockBeneficiaryReward"]),
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
                    let type = readTxType(txData["type"]);
                    let tx: ITxLite = {
                        index: Number(txData["txIndex"]),
                        value: new BigNumber(txData["value"]),
                        hash: txHash,
                        from: txData["from"],
                        to: txData["to"],
                        contractCreationCount: Number(txData["createContractMsgsTriggered"]) + (
                            // If this is a CreateTX, we should also consider itself as a source of contract creations
                            type === TxType.Create ? 1 : 0
                        ),
                        contractMsgCount: Number(txData["totalContractMsgsTriggered"]),
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
