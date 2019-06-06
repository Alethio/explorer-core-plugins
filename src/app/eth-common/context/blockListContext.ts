import { IContextDef } from "plugin-api/IContextDef";
import { clamp } from "@puzzl/core/lib/math/number";
import { AlethioAdapterType } from "../../shared/adapter/AlethioAdapterType";
import { blockContextType } from "app/shared/context/blockContextType";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { IBlockListContext } from "app/shared/context/IBlockListContext";
import { blockListContextType } from "app/shared/context/blockListContextType";

export const blockListContext: IContextDef<IBlockContext, IBlockListContext> = {
    parentContextType: blockContextType,
    contextType: blockListContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.LatestBlockNumber
    }],

    create(parentCtx, parentData) {
        let latestBlock = parentData.get(AlethioAdapterType.LatestBlockNumber)!.data as number;
        let maxBlocksShown = 100;
        let rangeStart = clamp(
            parentCtx.blockNumber - Math.floor(maxBlocksShown / 2),
            0,
            (latestBlock || Infinity) - (maxBlocksShown - 1)
        );
        let childCtx: IBlockListContext = {
            blockNumber: parentCtx.blockNumber,
            rangeStart,
            rangeEnd: rangeStart + maxBlocksShown - 1
        };
        return childCtx;
    }
};
