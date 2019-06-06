import { IDataAdapter } from "plugin-api/IDataAdapter";
import { ITxContext } from "app/shared/context/ITxContext";
import { txContextType } from "app/shared/context/txContextType";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";

export class TxDetailsAdapter implements IDataAdapter<ITxContext, ITxDetails> {
    contextType = txContextType;

    constructor(private dataSource: Web3DataSource) {

    }

    async load(context: ITxContext) {
        return await this.dataSource.stores.txDetailsStore.fetch(context.txHash);
    }
}
