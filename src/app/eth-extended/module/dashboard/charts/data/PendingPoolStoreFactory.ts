import { PendingPoolStore } from "app/eth-extended/module/dashboard/charts/data/PendingPoolStore";
import { LazyRecord } from "app/util/network/LazyRecord";
import { Deepstream } from "app/util/network/Deepstream";

export class PendingPoolStoreFactory {
    constructor(private deepstream: Deepstream) {

    }

    create() {
        let pendingPoolStore = new PendingPoolStore();
        pendingPoolStore.statsPerSec = new LazyRecord(
            "pending/v3/stats/perSecond",
            this.deepstream,
            rawData => ({
                eth: Number(rawData.eth),
                erc20: Number(rawData.erc20)
            })
        );
        pendingPoolStore.poolSize = new LazyRecord(
            "pending/v3/stats/pool",
            this.deepstream,
            rawData => Number(rawData.size)
        );
        return pendingPoolStore;
    }
}
