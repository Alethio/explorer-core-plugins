import { IModuleDef } from "plugin-api/IModuleDef";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { AlethioAdapterType } from "../../../../shared/adapter/AlethioAdapterType";
import { LatestBlockInfo, ILatestBlockInfoProps } from "./component/LatestBlockInfo";
import { IBlockBasicInfo } from "app/shared/data/block/IBlockBasicInfo";
import { blockContextType } from "app/shared/context/blockContextType";

export const latestBlockInfoModule: IModuleDef<ILatestBlockInfoProps, IBlockContext> = {
    contextType: blockContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.BlockBasicInfo
    }],

    getContentComponent() {
        return Promise.resolve(LatestBlockInfo);
    },

    getContentProps(data) {
        let { translation, locale, asyncData } = data;

        let blockInfo = asyncData.get(AlethioAdapterType.BlockBasicInfo)!.data as IBlockBasicInfo;

        let props: ILatestBlockInfoProps = {
            translation,
            locale,
            lastBlock: blockInfo
        };
        return props;
    },
    getHelpComponent: () => ({ translation }) => translation.get("dashboardView.help.latestBlockInfo") as any
};
