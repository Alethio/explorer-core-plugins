import { IContextDef } from "plugin-api/IContextDef";
import { AlethioAdapterType } from "../../shared/adapter/AlethioAdapterType";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

export const latestBlockContext: IContextDef<void, IBlockContext> = {
    parentContextType: {},
    contextType: blockContextType,

    dataAdapters: [
        {
            ref: AlethioAdapterType.LatestBlockNumber
        }
    ],

    create(parentContext, parentData) {
        let latestBlockNo = parentData.get(AlethioAdapterType.LatestBlockNumber)!.data as number;
        return {
            blockNumber: latestBlockNo
        };
    }
};
