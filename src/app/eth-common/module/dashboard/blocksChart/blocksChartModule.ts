import { IModuleDef } from "plugin-api/IModuleDef";
import { IBlocksChartWrapperProps, BlocksChartWrapper } from "./component/BlocksChartWrapper";
import { ILatestBlockRangeContext } from "../../../../shared/context/ILatestBlockRangeContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";
import { blockRangeContextType } from "app/shared/context/blockRangeContextType";

enum BlocksChartSlotType {
    Children = "children"
}

export const blocksChartModule: IModuleDef<IBlocksChartWrapperProps, ILatestBlockRangeContext, BlocksChartSlotType> = {
    contextType: blockRangeContextType,
    slotNames: Object.values(BlocksChartSlotType),

    dataAdapters: [{
        ref: AlethioAdapterType.BlockList
    }],

    getContentComponent() {
        return Promise.resolve(BlocksChartWrapper);
    },

    getContentProps(data) {
        let { translation, context, asyncData, slots } = data;

        let blockValues = asyncData.get(AlethioAdapterType.BlockList)!.data as (IBlockTxCount | undefined)[];

        let props: IBlocksChartWrapperProps = {
            blockValues,
            context,
            translation,
            modules: slots ? slots[BlocksChartSlotType.Children] : void 0
        };
        return props;
    }
};
