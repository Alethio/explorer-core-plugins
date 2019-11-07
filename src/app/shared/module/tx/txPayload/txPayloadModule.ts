import { IModuleDef } from "plugin-api/IModuleDef";
import { ITxPayloadProps, TxPayload } from "./component/TxPayload";
import { ITxContext } from "app/shared/context/ITxContext";
import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { txContextType } from "app/shared/context/txContextType";

export const txPayloadModule: (options: {
    txDetailsAdapterUri: string;
}) => IModuleDef<ITxPayloadProps, ITxContext> = ({txDetailsAdapterUri}) => ({
    contextType: txContextType,

    dataAdapters: [{
        ref: txDetailsAdapterUri
    }],

    getContentComponent: async () => TxPayload,

    getContentProps(data) {
        let { translation, asyncData } = data;

        let txDetails = asyncData.get(txDetailsAdapterUri)!.data as ITxDetails;

        let props: ITxPayloadProps = {
            translation,
            txDetails
        };
        return props;
    },

    getHelpComponent: () => ({ translation }) => translation.get("txView.content.decodedPayload.help") as any
});
