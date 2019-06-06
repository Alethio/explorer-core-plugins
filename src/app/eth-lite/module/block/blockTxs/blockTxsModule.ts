import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { IBlockTxsProps } from "./component/BlockTxs";
import { IBlockDetails } from "app/eth-lite/data/block/details/IBlockDetails";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

export const blockTxsModule: IModuleDef<IBlockTxsProps, IBlockContext, void> = {
    contextType: blockContextType,

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockDetailsLite
        }
    ],

    getContentComponent() {
        return import("./component/BlockTxs").then(({ BlockTxs }) => BlockTxs);
    },

    getContentProps(data) {
        let { asyncData, locale, translation, uiStateContainer } = data;

        let blockDetails = asyncData.get(AlethioAdapterType.BlockDetailsLite)!.data as IBlockDetails;

        let props: IBlockTxsProps = {
            txs: blockDetails.transactions,
            translation,
            locale,
            uiStateContainer
        };
        return props;
    }
};
