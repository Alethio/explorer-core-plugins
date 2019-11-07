import { IDataAdapter } from "plugin-api/IDataAdapter";
import { NotFoundError } from "app/shared/data/NotFoundError";
import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { ITxContext } from "app/shared/context/ITxContext";
import { txContextType } from "app/shared/context/txContextType";
import { MementoDataSource } from "app/eth-memento/MementoDataSource";

export class TxDetailsAdapter implements IDataAdapter<ITxContext, ITxDetails> {
    contextType = txContextType;

    constructor(private dataSource: MementoDataSource) {

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
}
