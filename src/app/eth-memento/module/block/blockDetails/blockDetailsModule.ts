import { IBlockDetails } from "app/eth-memento/data/block/details/IBlockDetails";
import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { IBlockDetailsProps } from "./component/BlockDetails";
import { BlockDetailsSlotType } from "./BlockDetailsSlotType";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

/** @deprecated */
export const blockDetailsModule: (ethSymbol: string) =>
IModuleDef<IBlockDetailsProps, IBlockContext, BlockDetailsSlotType> = (ethSymbol) => ({
    contextType: blockContextType,
    slotNames: Object.values(BlockDetailsSlotType),

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockDetailsMemento
        }
    ],

    getContentComponent() {
        return import("./component/BlockDetails").then(({ BlockDetails }) => BlockDetails);
    },

    getContentProps(data) {
        let { asyncData, locale, translation, slots } = data;

        let blockDetails = asyncData.get(AlethioAdapterType.BlockDetailsMemento)!.data as IBlockDetails;

        return {
            blockDetails,
            translation,
            locale,
            ethSymbol,
            slots: slots as Record<BlockDetailsSlotType, JSX.Element[]>
        };
    }
});
