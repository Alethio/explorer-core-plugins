import { IModuleDef } from "plugin-api/IModuleDef";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { IAccountDetails } from "app/eth-lite/data/account/IAccountDetails";
import { Contract, IContractProps } from "app/shared/module/account/lite/component/Contract";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { accountContextType } from "app/shared/context/accountContextType";

export const accountContractModule: IModuleDef<IContractProps, IAccountContext> = {
    contextType: accountContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.AccountDetailsLite
    }],

    getContentComponent: async () => Contract,
    getContentProps(data) {
        let { translation, logger, locale, asyncData } = data;

        let accountDetails = asyncData.get(AlethioAdapterType.AccountDetailsLite)!.data as IAccountDetails;

        let props: IContractProps = {
            accountDetails,
            locale,
            logger,
            translation
        };
        return props;
    }
};
