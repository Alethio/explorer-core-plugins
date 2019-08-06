import React from "react";
import { IBlockDetails } from "app/eth-extended/data/block/details/IBlockDetails";
import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { IBlockLogsBloomProps } from "./BlockLogsBloom";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

export const blockLogsBloomModule: IModuleDef<IBlockLogsBloomProps, IBlockContext> = {
    contextType: blockContextType,

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockDetailsExtended
        }
    ],

    getContentComponent() {
        return import("./BlockLogsBloom").then(({ BlockLogsBloom }) => BlockLogsBloom);
    },

    getContentProps(data) {
        let { asyncData, locale, translation } = data;

        let blockDetails = asyncData.get(AlethioAdapterType.BlockDetailsExtended)!.data as IBlockDetails;

        return {
            blockDetails,
            translation,
            locale
        };
    },

    getHelpComponent: () => ({ translation }) => <div dangerouslySetInnerHTML={{
        __html: translation.get("blockView.content.logsBloom.help")
    }}></div>
};
