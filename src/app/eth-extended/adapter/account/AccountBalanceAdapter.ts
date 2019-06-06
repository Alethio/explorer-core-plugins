import { IAccountContext } from "app/shared/context/IAccountContext";
import { AccountBalance } from "app/eth-extended/data/account/balance/AccountBalance";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IDataAdapter } from "plugin-api/IDataAdapter";
import { LatestBlockWatcher } from "app/shared/adapter/block/LatestBlockWatcher";
import { accountContextType } from "app/shared/context/accountContextType";

export class AccountBalanceAdapter implements IDataAdapter<IAccountContext, AccountBalance> {
    contextType = accountContextType;

    constructor(private dataSource: AlethioDataSource, private historical: boolean) {

    }

    async load({ accountHash }: IAccountContext) {
        let latestBlockNo = this.dataSource.stores.blockStateStore.getLatest();
        if (this.historical) {
            return await this.dataSource.stores.accountBalanceStore.fetchHistorical(accountHash, latestBlockNo);
        } else {
            return await this.dataSource.stores.accountBalanceStore.fetchLatest(accountHash, latestBlockNo);
        }
    }

    createWatcher() {
        return new LatestBlockWatcher(this.dataSource.stores.blockStateStore, 60 * 5);
    }
}
