import { AccountType } from "app/shared/data/account/AccountType";

export interface IAccountDetails {
    address: string;
    type: AccountType;
    accountCode?: string;
}
