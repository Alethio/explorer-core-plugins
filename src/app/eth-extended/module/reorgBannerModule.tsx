import { IModuleDef } from "plugin-api/IModuleDef";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";
import { ReorgedBlocksStore } from "app/eth-extended/data/block/ReorgedBlocksStore";
import { IReorgBannerProps, ReorgBanner } from "app/eth-extended/module/ReorgBanner";

export const reorgBannerModule: (reorgBlocksStore: ReorgedBlocksStore) =>
    IModuleDef<IReorgBannerProps, IBlockContext, void> = (reorgBlocksStore) =>
({
    contextType: blockContextType,
    dataAdapters: [],

    getContentComponent: async () => ReorgBanner,

    getContentProps({ translation, context }) {
        let isReorged = reorgBlocksStore.isReorged(context.blockNumber);

        let props: IReorgBannerProps = {
            translation,
            isReorged
        };
        return props;
    }
});
