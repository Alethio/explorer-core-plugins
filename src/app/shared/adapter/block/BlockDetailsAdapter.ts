import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IDataAdapter } from "plugin-api/IDataAdapter";
import { IBlockDetails } from "app/shared/data/block/details/IBlockDetails";
import { NotFoundError } from "app/shared/data/NotFoundError";
import { blockContextType } from "app/shared/context/blockContextType";
import { IBlockContext } from "../../context/IBlockContext";
import { MementoDataSource } from "app/eth-memento/MementoDataSource";

export class BlockDetailsAdapter implements IDataAdapter<IBlockContext, IBlockDetails> {
    contextType = blockContextType;

    constructor(private dataSource: AlethioDataSource | MementoDataSource) {

    }

    async load(context: IBlockContext) {
        // TODO remove this once we refactor the TxSidebar component to be decoupled from its children
        // HACK for tx sidebar which has an optional blockNumber context
        if (context.blockNumber === void 0) {
            return void 0;
        }
        try {
            return await this.dataSource.stores.blockDetailsStore.fetch(context.blockNumber);
        } catch (e) {
            if (e instanceof NotFoundError) {
                return void 0;
            }
            throw e;
        }
    }
}
