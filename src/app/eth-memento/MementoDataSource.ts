import { BlockDetailsStore } from "app/shared/data/block/details/BlockDetailsStore";
import { IDataSource } from "plugin-api";
import { TxLiteByAccountStore } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStore";
import { BlockValueStore } from "app/shared/data/block/value/BlockValueStore";
import { TxDetailsStore } from "app/eth-memento/data/tx/details/TxDetailsStore";
import { LogEventsStore } from "app/eth-memento/data/logEvents/LogEventsStore";

interface IMementoDataStores {
    blockDetailsStore: BlockDetailsStore;
    blockValueStore: BlockValueStore;
    txDetailsStore: TxDetailsStore;
    txByAccountStore: TxLiteByAccountStore;
    logEventsStore: LogEventsStore;
}

export class MementoDataSource implements IDataSource {
    constructor(
        public stores: IMementoDataStores
    ) {

    }

    async init() {
        // nothing to be done here
    }
}
