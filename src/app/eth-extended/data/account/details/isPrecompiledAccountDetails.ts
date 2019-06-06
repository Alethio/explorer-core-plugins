import { IAccountDetails } from "app/eth-extended/data/account/details/IAccountDetails";
import { IPrecompiledAccountMeta } from "app/eth-extended/data/account/details/IPrecompiledAccountMeta";

interface IPrecompiledAccountDetails extends IAccountDetails {
    meta: IPrecompiledAccountMeta;
}

export function isPrecompiledAccountDetails(
    accountDetails: IAccountDetails): accountDetails is IPrecompiledAccountDetails {
    return !!(accountDetails.meta && accountDetails.meta.precompiled);
}
