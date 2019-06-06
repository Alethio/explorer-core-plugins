import { IDataAdapter } from "plugin-api/IDataAdapter";
import { LatestBlockWatcher } from "app/shared/adapter/block/LatestBlockWatcher";
import { blockContextType } from "app/shared/context/blockContextType";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { IBlockContext } from "app/shared/context/IBlockContext";

export interface IBlockConfirmations {
    count: number;
    confirmed: boolean;
}

export class BlockConfirmationsAdapter implements IDataAdapter<IBlockContext, IBlockConfirmations> {
    contextType = blockContextType;

    constructor(private blockStateStore: BlockStateStore) {

    }

    async load(context: IBlockContext) {
        let count = this.blockStateStore.getConfirmations(context.blockNumber);
        let confirmed = this.blockStateStore.isConfirmed(context.blockNumber);
        let confirmations: IBlockConfirmations = {
            count,
            confirmed
        };
        return confirmations;
    }

    createWatcher(context: IBlockContext) {
        return new LatestBlockWatcher(this.blockStateStore);
    }
}
