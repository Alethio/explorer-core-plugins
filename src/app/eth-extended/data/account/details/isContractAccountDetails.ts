import { IAccountDetails } from "app/eth-extended/data/account/details/IAccountDetails";
import { IContractAccountDetails } from "app/eth-extended/data/account/details/IContractAccountDetails";
import { AccountType } from "app/shared/data/account/AccountType";

export function isContractAccountDetails(accountDetails: IAccountDetails): accountDetails is IContractAccountDetails {
    return accountDetails.type === AccountType.Contract;
}
