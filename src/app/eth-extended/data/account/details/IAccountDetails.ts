import { AccountType } from "../../../../shared/data/account/AccountType";
import { ITokenInfo } from "app/eth-extended/data/token/ITokenInfo";
import { IPrecompiledAccountMeta } from "./IPrecompiledAccountMeta";
import { IProtocolAccountMeta } from "./IProtocolAccountMeta";

export interface IAccountDetails {
    address: string;
    nonce?: number;
    type: AccountType;
    logEntriesCount?: number;

    countMinedBlocks: number;
    countMinedUncles: number;
    countContractMsgIn: number;
    countContractMsgOut: number;
    countCreateContractMsgs: number;
    countTxOut: number;
    countTxIn: number;

    /** Block number used as initial cursor for paginated txs or contractMsgs */
    countsBlockNumber: number;

    hasContractAbi: boolean;
    hasContractAccountCode: boolean;
    hasContractSourceCode: boolean;

    createdAtBlock?: number;
    createdAtTimestamp?: number;
    createdByAccount?: string;
    createdInMsg?: {
        txHash: string;
        txValidationIndex: number;
    };
    createdInTx?: string;

    tokenMeta?: ITokenInfo;
    tokenTypes?: string[];

    alias?: string;
    meta?: IPrecompiledAccountMeta | IProtocolAccountMeta;

    /** If there is no data in the db, but the account hash is valid */
    isFresh?: boolean;
}
