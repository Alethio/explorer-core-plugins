import { Deepstream } from "app/util/network/Deepstream";
import { TxPendingCountsStore } from "app/eth-extended/data/account/pendingTxsCount/TxPendingCountsStore";
import { TxPendingCountsApi } from "app/eth-extended/data/account/pendingTxsCount/TxPendingCountsApi";
import { TxPendingCountsReader } from "app/eth-extended/data/account/pendingTxsCount/TxPendingCountsReader";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";

export class TxPendingCountsStoreFactory {
    create(deepstream: Deepstream) {
        return new TxPendingCountsStore(
            new TxPendingCountsApi(
                new DsRpcApi(deepstream),
                new TxPendingCountsReader()
            )
        );
    }
}
