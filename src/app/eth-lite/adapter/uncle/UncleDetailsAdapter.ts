import { IDataAdapter } from "plugin-api/IDataAdapter";
import { IUncleByBlockContext } from "app/eth-lite/context/IUncleByBlockContext";
import { IUncleDetails } from "app/eth-lite/data/uncle/IUncleDetails";
import { uncleByIndexContextType } from "app/eth-lite/context/uncleByIndexContextType";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";

export class UncleDetailsAdapter implements IDataAdapter<IUncleByBlockContext, IUncleDetails> {
    contextType = uncleByIndexContextType;

    constructor(private dataSource: Web3DataSource) {

    }

    async load(context: IUncleByBlockContext) {
        return await this.dataSource.stores.uncleDetailsStore.fetch(context.blockNumber, context.uncleIndex);
    }
}
