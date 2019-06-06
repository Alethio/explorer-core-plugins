// tslint:disable:no-string-literal
import { IAccountDetails } from "./IAccountDetails";
import { readAccountType } from "app/eth-extended/data/account/readAccountType";
import { AccountType } from "app/shared/data/account/AccountType";
import { IContractAccountDetails } from "app/eth-extended/data/account/details/IContractAccountDetails";
import { TokenInfoReader } from "app/eth-extended/data/token/TokenInfoReader";
import { readAccountMeta } from "app/eth-extended/data/account/details/readAccountMeta";
import { readContractDataSource } from "../../contract/dataSource/readContractDataSource";
import { readContractVerifications } from "./contractVerifications/readContractVerifications";

export class AccountDetailsReader {
    read(address: string, data: any) {
        let type = readAccountType(data["type"]);
        let account: IAccountDetails = {
            address,
            nonce: data["nonce"],
            type,
            logEntriesCount: Number(data["logEntries"]) || void 0,

            countMinedBlocks: Number(data["minedBlocks"]),
            countMinedUncles: Number(data["minedUncles"]),

            countContractMsgIn: Number(data["contractMsgsIn"]),
            countContractMsgOut: Number(data["contractMsgsOut"]),
            countCreateContractMsgs: Number(data["contractMsgsCreate"]),

            countTxOut: Number(data["txsOut"]),
            countTxIn: Number(data["txsIn"]),

            countsBlockNumber: Number(data["countsBlockNumber"]),

            alias: data["alias"],

            hasContractAbi: Boolean(data["hasContractAbi"]),
            hasContractAccountCode: Boolean(data["hasContractAccountCode"]),
            hasContractSourceCode: Boolean(data["hasContractSourceCode"]),

            createdAtBlock: data["createdAtBlock"] !== null ? Number(data["createdAtBlock"]) : void 0,
            createdAtTimestamp: data["createdAtTimestamp"] !== null ? Number(data["createdAtTimestamp"]) : void 0,
            createdByAccount: data["createdByAccount"] || void 0,
            createdInMsg: data["createdInMsg"] && (data["createdInMsg"] as string).match(/^ContractMsg_/) ?
                {
                    txHash: (data["createdInMsg"] as string).split("_")[1].replace(/^0x/, ""),
                    txValidationIndex: Number((data["createdInMsg"] as string).split("_")[2])
                } : void 0,
            createdInTx: data["createdInMsg"] && (data["createdInMsg"] as string).match(/^Tx_/) ?
                (data["createdInMsg"] as string).split("_")[1].replace(/^0x/, "") :
                void 0,

            tokenMeta: data["tokenMeta"] ? new TokenInfoReader().read(data["tokenMeta"]) : void 0,
            tokenTypes: data["tokenTypes"] && data["tokenTypes"].length ? data["tokenTypes"] : void 0,

            meta: readAccountMeta(data["accountMeta"])
        };

        if (type === AccountType.Contract) {
            let contractDetails: IContractAccountDetails = {
                ...account,
                contractId: Number(data["contractId"]),
                optimizerRuns: data["optimizerRuns"] !== null ? Number(data["optimizerRuns"]) : void 0,
                optimizerEnabled: data["optimizationEnabled"] !== null ?
                    Boolean(data["optimizationEnabled"]) :
                    void 0,
                compilerVersion: data["compilerVersion"] || void 0,
                constructorArgs: data["constructorArgs"] || [],
                swarmSource: data["swarmSource"] || void 0,
                contractDataSource: readContractDataSource(data["alethioComment"]),
                contractPotentialIssues: (data["alethioComment"]
                    && data["alethioComment"]["contractPotentialIssues"] !== undefined) ?
                    Number(data["alethioComment"]["contractPotentialIssues"]) : void 0,
                verifications: data["verifications"] ? readContractVerifications(data["verifications"]) : void 0
            };
            return contractDetails;
        }

        return account;
    }
}
