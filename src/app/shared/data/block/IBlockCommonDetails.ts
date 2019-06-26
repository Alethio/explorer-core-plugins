import { BigNumber } from "app/util/BigNumber";

export interface IBlockCommonDetails {
    /** Block number */
    id: number;
    /** Unix timestamp */
    creationTime?: number;
    hash: string;
    parentHash?: string;
    /** Parent block number (always id - 1) */
    parentId?: number;
    nonce?: string;
    byteSize: number;
    sha3uncles: string;
    beneficiaryAddress?: string;
    gasUsed: BigNumber;
    gasLimit: BigNumber;
    difficulty: BigNumber;
    extraData: string;
    logsBloom: string;
    mixHash?: string;
    /** Hashes of uncles */
    uncles: string[];
}
