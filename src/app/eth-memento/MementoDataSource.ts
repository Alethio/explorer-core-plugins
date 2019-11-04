import {BlockDetailsStore} from "app/eth-memento/data/block/details/BlockDetailsStore";
import {IDataSource} from "plugin-api";
import {BlockValueStore} from "app/shared/data/block/value/BlockValueStore";

interface IMementoDataStores {
    blockDetailsStore: BlockDetailsStore;
    blockValueStore: BlockValueStore;
}

export class MementoDataSource implements IDataSource {
    constructor(
        public stores: IMementoDataStores
    ) {

    }

    async init() {

    }
}
