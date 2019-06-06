import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";
import { IDataAdapter } from "plugin-api/IDataAdapter";
import { blockContextType } from "app/shared/context/blockContextType";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { IBlockBasicInfo } from "app/shared/data/block/IBlockBasicInfo";
import { ITxBasicInfo } from "app/shared/data/tx/ITxBasicInfo";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";
import { ITxLite } from "app/eth-extended/data/tx/ITxLite";

export class BlockBasicInfoAdapter implements IDataAdapter<IBlockContext, IBlockBasicInfo> {
    contextType = blockContextType;

    constructor(private dataSource: AlethioDataSource | Web3DataSource) {

    }

    async load(context: IBlockContext) {
        // TODO remove this once we refactor the TxSidebar component to be decoupled from its children
        // HACK for tx sidebar which has an optional blockNumber context
        if (context.blockNumber === void 0) {
            return void 0;
        }
        let blockDetails = await this.dataSource.stores.blockDetailsStore.fetch(context.blockNumber);
        let blockBasicInfo: IBlockBasicInfo = {
            id: blockDetails.id,
            creationTime: blockDetails.creationTime,
            transactions: (blockDetails.transactions as (ITxLite | ITxDetails)[]).map(tx => ({
                hash: tx.hash,
                value: tx.value
            } as ITxBasicInfo)),
            uncleCount: blockDetails.uncles.length
        };
        return blockBasicInfo;
    }
}
