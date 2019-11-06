import { IDataAdapter } from "plugin-api/IDataAdapter";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IBlockListContext } from "app/shared/context/IBlockListContext";
import { blockListContextType } from "app/shared/context/blockListContextType";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";
import {MementoDataSource} from "app/eth-memento/MementoDataSource";

export class BlockListAdapter implements IDataAdapter<IBlockListContext, (IBlockTxCount | undefined)[]> {
    contextType = blockListContextType;

    constructor(private dataSource: AlethioDataSource | Web3DataSource | MementoDataSource) {

    }

    async load(context: IBlockListContext) {
        return await this.dataSource.stores.blockValueStore
            .fetch(context.rangeStart, context.rangeEnd + 1);
    }
}
