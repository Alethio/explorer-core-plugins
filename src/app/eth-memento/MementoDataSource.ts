import { BlockDetailsStore } from "app/shared/data/block/details/BlockDetailsStore";
import { IDataSource } from "plugin-api";
import { TxLiteByAccountStore } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStore";
import { BlockValueStore } from "app/shared/data/block/value/BlockValueStore";
import { TxDetailsStore } from "app/eth-memento/data/tx/details/TxDetailsStore";
import { LogEventsStore } from "app/eth-memento/data/logEvents/LogEventsStore";
import { UncleDetailsStore } from "app/shared/data/uncle/UncleDetailsStore";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { Search } from "app/eth-memento/data/search/Search";
import { LastBlockWatcher } from "app/shared/data/watcher/LastBlockWatcher";

interface IMementoDataStores {
    blockStateStore: BlockStateStore;
    blockDetailsStore: BlockDetailsStore;
    blockValueStore: BlockValueStore;
    txDetailsStore: TxDetailsStore;
    txByAccountStore: TxLiteByAccountStore;
    logEventsStore: LogEventsStore;
    uncleDetailsStore: UncleDetailsStore;
    search: Search;
}

export class MementoDataSource implements IDataSource {
    constructor(
        private lastBlockWatcher: LastBlockWatcher,
        public stores: IMementoDataStores
    ) {

    }

    async init() {
        this.lastBlockWatcher.watch();
    }
}
