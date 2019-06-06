import { CmType } from "app/eth-extended/data/contractMsg/CmType";
import { IDecodedPayload } from "app/eth-extended/data/payload/IDecodedPayload";
import { BigNumber } from "app/util/BigNumber";

export interface ICmDetails {
    txHash: string;
    txValidationIndex: number;
    parentTxValidationIndex: number;
    type: CmType;
    gasLimit: BigNumber;
    gasUsed: BigNumber;
    gasPrice: BigNumber;
    from: string;
    to: string;
    value: BigNumber;
    refundBalance?: BigNumber;
    block: {
        id: number;
        creationTime: number;
    };
    payload?: string;
    decodedPayload: IDecodedPayload | undefined;
    output?: string;
    error: string | undefined;
    totalMsgsTriggered: number;
    msgsTriggered: number;
    tokenTransferCount: number;
    logEventsCount: number;
    depth: number;
    traceAddr: number[];
    blockValidationIdx: number;
}
