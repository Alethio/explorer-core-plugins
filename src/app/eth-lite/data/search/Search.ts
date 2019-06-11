import { isBetween } from "@puzzl/core/lib/math/number";
import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { IResult } from "app/shared/data/search/IResult";
import { ResultType } from "app/shared/data/search/ResultType";
import { ISearch } from "app/shared/data/search/ISearch";
import { IBlockResultData } from "app/shared/data/search/result/IBlockResultData";
import { IAccountResultData } from "app/shared/data/search/result/IAccountResultData";
import { ITxResultData } from "app/shared/data/search/result/ITxResultData";

export class Search implements ISearch {
    constructor(
        private web3EthApi: Web3EthApi,
        private blockStateStore: BlockStateStore
    ) {

    }

    async search(query: string) {
        // If it's a block number, return immediately
        if (query.match(/^[0-9]+$/)) {
            let blockNo = parseInt(query, 10);
            let latestBlockNo = this.blockStateStore.getLatest();
            if (!latestBlockNo) {
                throw new Error(`Latest block should be set by now`);
            }
            let result: IResult<IBlockResultData> = {
                type: ResultType.Block,
                data: {
                    blockNumber: blockNo
                }
            };
            return isBetween(blockNo, 0, latestBlockNo) ? [result] : [];
        }

        // If it looks like an account address, return immediately
        let accountMatch = query.match(/^(0x)?([0-9a-f]{40})$/i);
        if (accountMatch) {
            let result: IResult<IAccountResultData> = {
                type: ResultType.Account,
                data: {
                    address: "0x" + accountMatch[1]
                }
            };
            return [result];
        }

        // If it looks like a regular tx / block
        let hashMatch = query.match(/^(0x)?([0-9a-f]{64})$/i);
        if (hashMatch) {
            let txHash = `0x${hashMatch[2].replace(/^0x/, "")}`;
            let txResult = await this.web3EthApi.getTransaction(txHash);

            if (txResult) {
                let result: IResult<ITxResultData> = {
                    type: ResultType.Tx,
                    data: {
                        hash: txHash
                    }
                };
                return [result];
            } else {
                let blockResult = await this.web3EthApi.getBlockByHash(`0x${hashMatch[2].replace(/^0x/, "")}`);
                if (blockResult) {
                    let result: IResult<IBlockResultData> = {
                        type: ResultType.Block,
                        data: {
                            blockNumber: blockResult.number
                        }
                    };
                    return [result];
                }
            }
        }
        // Otherwise, no results
        return [];
    }
}
