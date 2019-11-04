import { ITxLite } from "app/eth-memento/data/tx/ITxLite";
import { BigNumber } from "app/util/BigNumber";
import { IBlockCommonDetails } from "app/shared/data/block/IBlockCommonDetails";

/**
 * Block data with full block details coming from backend API
 */
export interface IBlockDetails extends IBlockCommonDetails {
    /** Block number */
    id: number;
    /** Unix timestamp */
    creationTime?: number;
    hash: string;
    parentHash?: string;
    parentId: number | undefined;
    nonce: string;
    byteSize: number;
    sha3uncles: string;
    beneficiaryAddress?: string;
    gasUsed: BigNumber;
    gasLimit: BigNumber;
    difficulty: BigNumber;
    extraData: string;
    logsBloom: string;
    /** mixHash - not present for genesis block */
    mixHash?: string;
    /** Hashes of uncles */
    uncles: string[];

    transactions: ITxLite[];

    inconsistentWarning?: string;

    /** Number of contract messages */
    contractMsgCount: number;

    /** txTrie - not present for genesis block */
    txTrie?: string;
    /** receiptsTree - not present for genesis block */
    receiptsTrie?: string;

    beneficiaryName?: string;
    /** Miner reward (in wei) */
    beneficiaryReward: BigNumber;
    /** How much time it took to mine the block (in seconds) */
    mineTime?: number;
}
