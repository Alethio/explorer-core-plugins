import { IModuleDef } from "plugin-api/IModuleDef";
import { CmPayload, ICmPayloadProps } from "./CmPayload";
import { ICmContext } from "../../../context/ICmContext";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";
import { cmContextType } from "app/shared/context/cmContextType";

export const cmPayloadModule: IModuleDef<ICmPayloadProps, ICmContext> = {
    contextType: cmContextType,

    dataAdapters: [{
        ref: "adapter://aleth.io/cm/details"
    }],

    getContentComponent: async () => CmPayload,

    getContentProps(data) {
        let { translation, asyncData, context } = data;

        let cmDetails = asyncData.get("adapter://aleth.io/cm/details")!.data as ICmDetails;

        let props: ICmPayloadProps = {
            txHash: context.txHash,
            txValidationIndex: context.validationIndex,
            translation,
            cmDetails
        };
        return props;
    },

    getHelpComponent: () => ({ translation }) => translation.get("cmView.content.decodedPayload.help") as any
};
