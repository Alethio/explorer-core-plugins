import { IModuleDef } from "plugin-api/IModuleDef";
import { IConfirmationsBoxProps, ConfirmationsBox } from "app/eth-common/module/block/ConfirmationsBox";
import { AlethioAdapterType } from "../../../shared/adapter/AlethioAdapterType";
import { IBlockConfirmations } from "app/shared/adapter/block/BlockConfirmationsAdapter";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

export const blockConfirmationsModule: IModuleDef<IConfirmationsBoxProps, IBlockContext> = {
    contextType: blockContextType,

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockConfirmations
        }
    ],

    getContentComponent() {
        return Promise.resolve(ConfirmationsBox);
    },

    getContentProps(data) {
        let { asyncData, translation: tr, locale } = data;

        let confirmations = asyncData.get(AlethioAdapterType.BlockConfirmations)!.data as IBlockConfirmations;

        return {
            translation: tr,
            locale,
            confirmations: confirmations.count,
            isConfirmed: confirmations.confirmed
        };
    }
};
