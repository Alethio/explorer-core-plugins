import { IModuleDef } from "plugin-api/IModuleDef";
import { IUncleDetailsProps, UncleDetails } from "./UncleDetails";
import { IUncleDetails as IUncleDetailsExtended } from "app/eth-extended/data/uncle/IUncleDetails";
import { IUncleByHashContext } from "app/eth-extended/context/IUncleByHashContext";
import { IUncleByBlockContext } from "app/eth-lite/context/IUncleByBlockContext";
import { IUncleDetails as IUncleDetailsLite } from "app/eth-lite/data/uncle/IUncleDetails";

type ModuleType = IModuleDef<IUncleDetailsProps, IUncleByHashContext | IUncleByBlockContext>;

export const uncleDetailsModule: (uncleDetailsAdapterUri: string, contextType: ModuleType["contextType"]) =>
ModuleType = (uncleDetailsAdapterUri, contextType) => ({
    contextType,
    dataAdapters: [{
        ref: uncleDetailsAdapterUri
    }],
    getContentComponent: async () => UncleDetails,
    getContentProps(data) {
        let { translation, locale, asyncData } = data;

        let uncleDetails = asyncData.get(uncleDetailsAdapterUri)!.data as (
            IUncleDetailsExtended | IUncleDetailsLite);

        let props: IUncleDetailsProps = {
            uncleDetails,
            locale,
            translation
        };
        return props;
    }
});
