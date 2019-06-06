import { IAccountDetails } from "app/eth-extended/data/account/details/IAccountDetails";
import { IProtocolAccountMeta } from "app/eth-extended/data/account/details/IProtocolAccountMeta";

interface IProtocolAccountDetails extends IAccountDetails {
    meta: IProtocolAccountMeta;
}

export function isProtocolAccountDetails(accountDetails: IAccountDetails): accountDetails is IProtocolAccountDetails {
    return !!(accountDetails.meta && accountDetails.meta.protocol);
}
