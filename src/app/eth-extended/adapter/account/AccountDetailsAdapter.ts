import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IDataAdapter } from "plugin-api/IDataAdapter";
import { IAccountDetails } from "app/eth-extended/data/account/details/IAccountDetails";
import { NotFoundError } from "app/eth-extended/data/NotFoundError";
import { AccountType } from "app/shared/data/account/AccountType";
import { LatestBlockWatcher } from "app/shared/adapter/block/LatestBlockWatcher";
import { accountContextType } from "app/shared/context/accountContextType";
import { IAccountContext } from "../../../shared/context/IAccountContext";

export class AccountDetailsAdapter implements IDataAdapter<IAccountContext, IAccountDetails> {
    contextType = accountContextType;

    constructor(private dataSource: AlethioDataSource) {

    }

    async load({ accountHash }: IAccountContext) {
        if (accountHash.length !== 40) {
            // Invalid account address
            return void 0;
        }

        let isValidAddress = (await this.dataSource.web3Factory.create()).utils.isAddress(accountHash);
        if (!isValidAddress) {
            return void 0;
        }

        let accountDetails: IAccountDetails;
        try {
            accountDetails = await this.dataSource.stores.accountDetailsStore.fetch(accountHash);
        } catch (e) {
            if (e instanceof NotFoundError) {
                // No data from server and valid hash means it's a fresh account
                accountDetails = {
                    address: accountHash,
                    countMinedBlocks: 0,
                    countTxOut: 0,
                    countTxIn: 0,
                    type: AccountType.Unknown,
                    countMinedUncles: 0,
                    countContractMsgIn: 0,
                    countContractMsgOut: 0,
                    countCreateContractMsgs: 0,
                    countsBlockNumber: 0,
                    hasContractAbi: false,
                    hasContractAccountCode: false,
                    hasContractSourceCode: false,
                    isFresh: true
                };
            } else {
                throw e;
            }
        }

        return accountDetails;
    }

    createWatcher() {
        return new LatestBlockWatcher(this.dataSource.stores.blockStateStore, 60 * 5);
    }
}
