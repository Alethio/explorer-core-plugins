import { IBlockDetails } from "app/eth-extended/data/block/details/IBlockDetails";
import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { IBlockDetailsProps } from "./component/BlockDetails";
import { BlockDetailsSlotType } from "./BlockDetailsSlotType";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

export const blockDetailsModule: IModuleDef<IBlockDetailsProps, IBlockContext, BlockDetailsSlotType> = {
    contextType: blockContextType,
    slotNames: Object.values(BlockDetailsSlotType),

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockDetailsExtended
        }
    ],

    getContentComponent() {
        return import("./component/BlockDetails").then(({ BlockDetails }) => BlockDetails);
    },

    getContentProps(data) {
        let { asyncData, locale, translation, slots } = data;

        let blockDetails = asyncData.get(AlethioAdapterType.BlockDetailsExtended)!.data as IBlockDetails;

        return {
            blockDetails,
            translation,
            locale,
            slots: slots as Record<BlockDetailsSlotType, JSX.Element[]>
        };
    }
};
