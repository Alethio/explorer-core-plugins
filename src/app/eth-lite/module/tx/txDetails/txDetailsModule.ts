import { IModuleDef } from "plugin-api/IModuleDef";
import { ITxDetailsProps, TxDetails } from "./TxDetails";
import { ITxContext } from "app/shared/context/ITxContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { ITxReceipt } from "app/eth-lite/data/tx/receipt/ITxReceipt";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";
import { IBlockBasicInfo } from "app/shared/data/block/IBlockBasicInfo";
import { txContextType } from "app/shared/context/txContextType";

enum SlotType {
    BlockConfirmations = "blockConfirmations"
}

export const txDetailsModule: (ethSymbol: string) => IModuleDef<ITxDetailsProps, ITxContext, SlotType> =
(ethSymbol) => ({
    contextType: txContextType,
    slotNames: Object.values(SlotType),

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsLite
    }, {
        ref: "adapter://aleth.io/lite/tx/receipt",
        optional: true
    }, {
        ref: AlethioAdapterType.BlockBasicInfo
    }],

    getContentComponent: async () => TxDetails,

    getContentProps(data) {
        let { asyncData, context, translation, locale, slots } = data;

        let txDetails = asyncData.get(AlethioAdapterType.TxDetailsLite)!.data as ITxDetails;
        let txReceipt = asyncData.get("adapter://aleth.io/lite/tx/receipt") &&
            asyncData.get("adapter://aleth.io/lite/tx/receipt")!.data as ITxReceipt | undefined;
        let blockBasicInfo = asyncData.get(AlethioAdapterType.BlockBasicInfo)!.data as IBlockBasicInfo;

        let props: ITxDetailsProps = {
            txHash: context.txHash,
            txDetails,
            txReceipt,
            blockBasicInfo,
            locale,
            ethSymbol,
            translation,
            blockConfirmationsSlot: slots && slots[SlotType.BlockConfirmations]
        };
        return props;
    }
});
