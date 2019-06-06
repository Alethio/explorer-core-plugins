import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IDataAdapter } from "plugin-api/IDataAdapter";
import { NotFoundError } from "app/eth-extended/data/NotFoundError";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { TxDataWatcher } from "./TxDataWatcher";
import { ITxContext } from "../../../shared/context/ITxContext";
import { txContextType } from "app/shared/context/txContextType";

export class TxDetailsAdapter implements IDataAdapter<ITxContext, ITxDetails> {
    contextType = txContextType;

    constructor(private dataSource: AlethioDataSource) {

    }

    async load(context: ITxContext) {
        try {
            return await this.dataSource.stores.txDetailsStore.fetch(context.txHash);
        } catch (e) {
            if (e instanceof NotFoundError) {
                return void 0;
            }
            throw e;
        }
    }

    createWatcher(context: ITxContext, lastData: ITxDetails) {
        return new TxDataWatcher(this.dataSource.stores.blockStateStore, this.dataSource.pendingTxWatcher, lastData);
    }
}
