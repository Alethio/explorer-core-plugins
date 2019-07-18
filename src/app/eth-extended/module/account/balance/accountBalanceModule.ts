import { IModuleDef } from "plugin-api/IModuleDef";
import { IBalanceProps } from "app/eth-extended/module/account/balance/component/Balance";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { AccountBalance } from "app/eth-extended/data/account/balance/AccountBalance";
import { IAccountDetails } from "app/eth-extended/data/account/details/IAccountDetails";
import { IAsyncData } from "plugin-api/IAsyncData";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { accountContextType } from "app/shared/context/accountContextType";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

export const accountBalanceModule: (
    config: EthExtendedPluginConfig
) => IModuleDef<IBalanceProps, IAccountContext> = (config) => ({
    contextType: accountContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.AccountDetailsExtended
    }, {
        ref: AlethioAdapterType.AccountBalanceExtendedHist,
        optional: true
    }],

    getContentComponent: () => import("./component/Balance").then(({ Balance }) => Balance),
    getContentProps(data) {
        let { asyncData, translation, locale } = data;

        let accountDetails = asyncData.get(AlethioAdapterType.AccountDetailsExtended)!.data as IAccountDetails;
        let historicalBalance = asyncData.get(AlethioAdapterType.AccountBalanceExtendedHist) as (
            IAsyncData<AccountBalance>);
        const totalBalance = historicalBalance.isLoaded() ? historicalBalance.data.computeTotalBalance()[0] : void 0;

        let props: IBalanceProps = {
            historicalBalance,
            isFreshAccount: !!accountDetails.isFresh,
            totalBalance,
            translation,
            locale,
            ethSymbol: config.getEthSymbol(),
            usdPricesEnabled: config.isUsdPricesEnabled()
        };
        return props;
    }
});
