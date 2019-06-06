import { IBlockDetails } from "app/eth-lite/data/block/details/IBlockDetails";
import { IModuleDef } from "plugin-api/IModuleDef";
import { IBlockDetailsProps } from "./BlockDetails";
import { BlockDetailsSlotType } from "./BlockDetailsSlotType";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { blockContextType } from "app/shared/context/blockContextType";

export const blockDetailsModule: IModuleDef<IBlockDetailsProps, IBlockContext, BlockDetailsSlotType> = {
    contextType: blockContextType,
    slotNames: Object.values(BlockDetailsSlotType),

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockDetailsLite
        }
    ],

    getContentComponent() {
        return import("./BlockDetails").then(({ BlockDetails }) => BlockDetails);
    },

    getContentProps(data) {
        let { asyncData, locale, translation, slots } = data;

        let blockDetails = asyncData.get(AlethioAdapterType.BlockDetailsLite)!.data as IBlockDetails;

        return {
            blockDetails,
            translation,
            locale,
            slots: slots as Record<BlockDetailsSlotType, JSX.Element[]>
        };
    }
};
