import { IModuleDef } from "plugin-api/IModuleDef";
import { AccountDetails, IAccountDetailsProps } from "./AccountDetails";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { IAsyncData } from "plugin-api/IAsyncData";
import { IAccountDetails } from "app/eth-lite/data/account/IAccountDetails";
import { BigNumber } from "app/util/BigNumber";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { accountContextType } from "app/shared/context/accountContextType";

export const accountDetailsModule: (ethSymbol: string) => IModuleDef<IAccountDetailsProps, IAccountContext> =
(ethSymbol) => ({
    contextType: accountContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.AccountDetailsLite
    }, {
        ref: "adapter://aleth.io/lite/account/balance",
        optional: true
    }],

    getContentComponent: async () => AccountDetails,
    getContentProps(data) {
        let { asyncData, context, locale, translation, logger } = data;

        let accountDetails = asyncData.get(AlethioAdapterType.AccountDetailsLite)!.data as IAccountDetails;
        let accountBalance = asyncData.get("adapter://aleth.io/lite/account/balance") as IAsyncData<BigNumber>;

        let props: IAccountDetailsProps = {
            accountHash: context.accountHash,
            accountDetails,
            accountBalance,
            locale,
            ethSymbol,
            logger,
            translation
        };
        return props;
    }
});
