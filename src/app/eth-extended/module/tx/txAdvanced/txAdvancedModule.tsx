import { IModuleDef } from "plugin-api/IModuleDef";
import { ITxAdvancedProps, TxAdvanced } from "./TxAdvanced";
import { ITxContext } from "app/shared/context/ITxContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { txContextType } from "app/shared/context/txContextType";

export const txAdvancedModule: (ethSymbol: string) => IModuleDef<ITxAdvancedProps, ITxContext> = (ethSymbol) => ({
    contextType: txContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsExtended
    }, {
        ref: AlethioAdapterType.EthPrices,
        optional: true
    }],

    getContentComponent: async () => TxAdvanced,

    getContentProps(data) {
        let { asyncData, context, translation, locale } = data;

        let txDetails = asyncData.get(AlethioAdapterType.TxDetailsExtended)!.data as ITxDetails;
        let latestEthPrice = asyncData.get(AlethioAdapterType.EthPrices)!.data as number | undefined;

        let props: ITxAdvancedProps = {
            txHash: context.txHash,
            txDetails,
            latestEthPrice,
            locale,
            ethSymbol,
            translation
        };
        return props;
    },

    getHelpComponent: () => ({ translation }) => translation.get("txView.content.advanced.help") as any
});
