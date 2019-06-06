import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "../../../../shared/adapter/AlethioAdapterType";
import { IBlockListAsideProps, BlockListAside } from "./component/BlockListAside";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";
import { IBlockListContext } from "app/shared/context/IBlockListContext";
import { blockListContextType } from "app/shared/context/blockListContextType";

export const blockListModule: IModuleDef<IBlockListAsideProps, IBlockListContext> = {
    contextType: blockListContextType,

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockList
        }
    ],

    getContentComponent() {
        return Promise.resolve(BlockListAside);
    },

    getContentProps(data) {
        let { translation, context, asyncData } = data;

        let blockValues = asyncData.get(AlethioAdapterType.BlockList)!.data as (IBlockTxCount | undefined)[];

        return {
            blockValues,
            context,
            translation
        };
    }
};
