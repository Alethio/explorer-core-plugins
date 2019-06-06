import { IModuleDef } from "plugin-api/IModuleDef";
import { ITxPayloadProps, TxPayload } from "./component/TxPayload";
import { ITxContext } from "app/shared/context/ITxContext";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { txContextType } from "app/shared/context/txContextType";

export const txPayloadModule: IModuleDef<ITxPayloadProps, ITxContext> = {
    contextType: txContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsExtended
    }],

    getContentComponent: async () => TxPayload,

    getContentProps(data) {
        let { translation, asyncData } = data;

        let txDetails = asyncData.get(AlethioAdapterType.TxDetailsExtended)!.data as ITxDetails;

        let props: ITxPayloadProps = {
            translation,
            txDetails
        };
        return props;
    }
};
