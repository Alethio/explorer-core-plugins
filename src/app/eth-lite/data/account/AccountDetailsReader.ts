// tslint:disable:no-string-literal
import { IAccountDetails } from "./IAccountDetails";
import { AccountType } from "app/shared/data/account/AccountType";

export class AccountDetailsReader {
    read(address: string, code: string) {
        let account: IAccountDetails = {
            address,
            type: code && code !== "0x" ? AccountType.Contract : AccountType.External,
            accountCode: code && code !== "0x" ? code.replace(/^0x/, "") : void 0
        };
        return account;
    }
}
