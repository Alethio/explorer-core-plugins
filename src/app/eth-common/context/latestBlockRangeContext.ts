import { IContextDef } from "plugin-api/IContextDef";
import { ILatestBlockRangeContext } from "../../shared/context/ILatestBlockRangeContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { blockRangeContextType } from "app/shared/context/blockRangeContextType";

export const latestBlockRangeContext: IContextDef<void, ILatestBlockRangeContext> = {
    parentContextType: {},
    contextType: blockRangeContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.LatestBlockNumber
    }],

    create(parentCtx, parentData) {
        let latestBlock = parentData.get(AlethioAdapterType.LatestBlockNumber)!.data as number;
        let maxBlocksShown = 50;
        let childCtx: ILatestBlockRangeContext = {
            rangeStart: Math.max(0, latestBlock - (maxBlocksShown - 1)),
            rangeEnd: latestBlock
        };
        return childCtx;
    }
};
