import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { ITxSidebarProps, TxSidebar } from "./component/TxSidebar";
import { IBlockBasicInfo } from "app/shared/data/block/IBlockBasicInfo";
import { ITxContext } from "app/shared/context/ITxContext";
import { txContextType } from "app/shared/context/txContextType";

export const txListModule: IModuleDef<ITxSidebarProps, ITxContext> = {
    contextType: txContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.BlockBasicInfo,
        optional: true
    }],

    getContentComponent: async () => TxSidebar,

    getContentProps(data) {
        let { context, asyncData, translation, sidebarVisible } = data;

        let block = asyncData.get(AlethioAdapterType.BlockBasicInfo)!.data as IBlockBasicInfo | undefined;
        let txs = block ? block.transactions : void 0;

        let props: ITxSidebarProps = {
            txHash: context.txHash,
            txs,
            translation,
            mobileVisible: sidebarVisible
        };
        return props;
    }
};
