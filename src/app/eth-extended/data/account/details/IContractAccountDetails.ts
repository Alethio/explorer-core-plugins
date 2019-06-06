import { IAccountDetails } from "./IAccountDetails";
import { IContractDataSource } from "../../contract/dataSource/ContractDataSource";
import { IContractVerifications } from "./contractVerifications/IContractVerifications";

export interface IContractAccountDetails extends IAccountDetails {
    contractId: number;
    optimizerRuns?: number;
    optimizerEnabled?: boolean;
    compilerVersion?: string;
    constructorArgs: string[];
    swarmSource?: string;
    contractDataSource: IContractDataSource;
    contractPotentialIssues?: number;
    verifications?: IContractVerifications;
}
