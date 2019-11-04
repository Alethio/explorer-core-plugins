import { IBlockDetails } from "app/eth-memento/data/block/details/IBlockDetails";
import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { IBlockBasicProps } from "app/eth-memento/module/block/blockBasic/BlockBasic";
import { BlockBasicSlotType } from "./BlockBasicSlotType";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

export const blockBasicModule: IModuleDef<IBlockBasicProps, IBlockContext, BlockBasicSlotType> = {
    contextType: blockContextType,
    slotNames: Object.values(BlockBasicSlotType),

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockDetailsMemento
        }
    ],

    getContentComponent() {
        return import("app/eth-memento/module/block/blockBasic/BlockBasic").then(({ BlockBasic }) => BlockBasic);
    },

    getContentProps(data) {
        let { asyncData, locale, translation, slots } = data;

        let blockDetails = asyncData.get(AlethioAdapterType.BlockDetailsMemento)!.data as IBlockDetails;

        return {
            blockDetails,
            translation,
            locale,
            slots: slots as Record<BlockBasicSlotType, JSX.Element[]>
        };
    },

    getHelpComponent: () => ({ translation }) => translation.get("blockView.content.basic.help") as any
};
