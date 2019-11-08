import { IDataAdapter } from "plugin-api/IDataAdapter";
import { isAddress } from "web3-utils";
import { LatestBlockWatcher } from "app/shared/adapter/block/LatestBlockWatcher";
import { accountContextType } from "app/shared/context/accountContextType";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { IAccountDetails } from "app/eth-lite/data/account/IAccountDetails";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";
import { MementoDataSource } from "app/eth-memento/MementoDataSource";

export class AccountDetailsAdapter implements IDataAdapter<IAccountContext, IAccountDetails> {
    contextType = accountContextType;

    constructor(private dataSource: Web3DataSource | MementoDataSource) {

    }

    async load({ accountHash }: IAccountContext) {
        if (accountHash.length !== 40) {
            // Invalid account address
            return void 0;
        }

        if (!isAddress(accountHash)) {
            return void 0;
        }

        return await this.dataSource.stores.accountDetailsApi.fetch(accountHash);
    }

    createWatcher() {
        return new LatestBlockWatcher(this.dataSource.stores.blockStateStore, 60 * 5);
    }
}
