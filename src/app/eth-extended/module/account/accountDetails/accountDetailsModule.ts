import { IModuleDef } from "plugin-api/IModuleDef";
import { AccountDetails, IAccountDetailsProps } from "./component/AccountDetails";
import { IAccountDetails } from "../../../data/account/details/IAccountDetails";
import { AccountBalance } from "app/eth-extended/data/account/balance/AccountBalance";
import { IAccountContext } from "../../../../shared/context/IAccountContext";
import { IAsyncData } from "plugin-api/IAsyncData";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { accountContextType } from "app/shared/context/accountContextType";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

export const accountDetailsModule: (
    config: EthExtendedPluginConfig
) => IModuleDef<IAccountDetailsProps, IAccountContext> =
(config) => ({
    contextType: accountContextType,
    dataAdapters: [{
        ref: AlethioAdapterType.AccountDetailsExtended
    }, {
        ref: AlethioAdapterType.AccountBalanceExtendedLatest,
        optional: true
    }, {
        ref: AlethioAdapterType.AccountBalanceExtendedHist,
        optional: true
    }],

    getContentComponent: async () => AccountDetails,
    getContentProps(data) {
        let { asyncData, context, locale, translation, logger } = data;

        let accountDetails = asyncData.get(AlethioAdapterType.AccountDetailsExtended)!.data as IAccountDetails;
        let latestBalance = asyncData.get(AlethioAdapterType.AccountBalanceExtendedLatest) as (
            IAsyncData<AccountBalance>);
        let historicalBalance = asyncData.get(AlethioAdapterType.AccountBalanceExtendedHist) as (
            IAsyncData<AccountBalance>);

        const totalBalance = latestBalance.isLoaded() ?
            latestBalance.data.computeTotalBalance()[0] :
            historicalBalance.isLoaded() ?
                historicalBalance.data.computeTotalBalance()[0] :
                void 0;

        let props: IAccountDetailsProps = {
            accountHash: context.accountHash,
            accountDetails,
            latestBalance,
            totalBalance,
            locale,
            ethSymbol: config.getEthSymbol(),
            usdPricesEnabled: config.isUsdPricesEnabled(),
            logger,
            translation
        };
        return props;
    }
});
