import {BlockDetailsStore} from "app/shared/data/block/details/BlockDetailsStore";
import {IDataSource} from "plugin-api";
import {TxLiteByAccountStore} from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStore";
import {BlockStateStore} from "app/shared/data/BlockStateStore";
import {PricesStore} from "app/eth-extended/data/prices/PricesStore";
import {BlockValueStore} from "app/shared/data/block/value/BlockValueStore";

interface IMementoDataStores {
    blockStateStore: BlockStateStore;
    blockDetailsStore: BlockDetailsStore;
    blockValueStore: BlockValueStore;
    txByAccountStore: TxLiteByAccountStore;
    pricesStore?: PricesStore;
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
