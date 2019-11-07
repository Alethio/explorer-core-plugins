import { ITxDetailsBase } from "app/shared/data/tx/details/ITxDetailsBase";
import { TxStatus } from "app/shared/data/tx/TxStatus";
import { BigNumber } from "app/util/BigNumber";

/**
 * Data for consolidated txs, coming from db / api
 */
export interface ITxDetailsMemento extends ITxDetailsBase {
    status: TxStatus.Memento;
    gasUsed: BigNumber;
    cumulativeGasUsed: BigNumber;

    error: string | undefined;
    msgStatus: string;

    block: {
        id: number;
        creationTime: number;
    };
    txIndex: number;

    logEventsCount: number;
}
