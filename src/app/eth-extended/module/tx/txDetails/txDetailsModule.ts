import { IModuleDef } from "plugin-api/IModuleDef";
import { ITxDetailsProps, TxDetails } from "./component/TxDetails";
import { ITxContext } from "app/shared/context/ITxContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { txContextType } from "app/shared/context/txContextType";

enum SlotType {
    BlockConfirmations = "blockConfirmations"
}

export const txDetailsModule: (ethSymbol: string) => IModuleDef<ITxDetailsProps, ITxContext, SlotType> =
(ethSymbol) => ({
    contextType: txContextType,
    slotNames: Object.values(SlotType),

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsExtended
    }, {
        ref: AlethioAdapterType.EthPrices,
        optional: true
    }],

    getContentComponent: async () => TxDetails,

    getContentProps(data) {
        let { asyncData, context, translation, locale, slots } = data;

        let txDetails = asyncData.get(AlethioAdapterType.TxDetailsExtended)!.data as ITxDetails;
        let latestEthPrice = asyncData.get(AlethioAdapterType.EthPrices) &&
            asyncData.get(AlethioAdapterType.EthPrices)!.data as number | undefined;

        let props: ITxDetailsProps = {
            txHash: context.txHash,
            txDetails,
            latestEthPrice,
            locale,
            ethSymbol,
            translation,
            blockConfirmationsSlot: slots && slots[SlotType.BlockConfirmations]
        };
        return props;
    }
});
