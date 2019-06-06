import { IDataAdapter } from "plugin-api/IDataAdapter";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { IBlockDetails } from "app/eth-lite/data/block/details/IBlockDetails";
import { blockContextType } from "app/shared/context/blockContextType";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";

export class BlockDetailsAdapter implements IDataAdapter<IBlockContext, IBlockDetails> {
    contextType = blockContextType;

    constructor(private dataSource: Web3DataSource) {

    }

    async load(context: IBlockContext) {
        return await this.dataSource.stores.blockDetailsStore.fetch(context.blockNumber);
    }
}
