import { IBlockDetails } from "app/shared/data/block/details/IBlockDetails";
import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { IBlockAdvancedProps } from "./BlockAdvanced";
import { BlockAdvancedSlotType } from "./BlockAdvancedSlotType";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

export const blockAdvancedModule: (ethSymbol: string) =>
IModuleDef<IBlockAdvancedProps, IBlockContext, BlockAdvancedSlotType> = (ethSymbol) => ({
    contextType: blockContextType,
    slotNames: Object.values(BlockAdvancedSlotType),

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockDetailsExtended
        }
    ],

    getContentComponent() {
        return import("./BlockAdvanced").then(({ BlockAdvanced }) => BlockAdvanced);
    },

    getContentProps(data) {
        let { asyncData, locale, translation, slots } = data;

        let blockDetails = asyncData.get(AlethioAdapterType.BlockDetailsExtended)!.data as IBlockDetails;

        return {
            blockDetails,
            translation,
            locale,
            ethSymbol,
            slots: slots as Record<BlockAdvancedSlotType, JSX.Element[]>
        };
    },

    getHelpComponent: () => ({ translation }) => translation.get("blockView.content.advanced.help") as any
});
