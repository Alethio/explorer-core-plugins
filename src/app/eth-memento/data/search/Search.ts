import { isBetween } from "@puzzl/core/lib/math/number";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { IResult } from "app/shared/data/search/IResult";
import { ResultType } from "app/shared/data/search/ResultType";
import { ISearch } from "app/shared/data/search/ISearch";
import { IBlockResultData } from "app/shared/data/search/result/IBlockResultData";
import { IAccountResultData } from "app/shared/data/search/result/IAccountResultData";
import { ITxResultData } from "app/shared/data/search/result/ITxResultData";
import { SearchApi } from "app/eth-memento/data/search/SearchApi";
import { SearchEntity } from "app/eth-memento/data/search/ISearchResult";
import { IUncleResultData } from "app/shared/data/search/result/IUncleResultData";

export class Search implements ISearch {
    constructor(
        private blockStateStore: BlockStateStore,
        private api: SearchApi
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
                    address: "0x" + accountMatch[2]
                }
            };
            return [result];
        }

        // If it looks like a regular tx / block
        let hashMatch = query.match(/^(0x)?([0-9a-f]{64})$/i);
        if (hashMatch) {
            let hash = `0x${hashMatch[2].replace(/^0x/, "")}`;
            let searchResult = await this.api.fetch(hash);

            if (!searchResult) {
                return [];
            }

            switch (searchResult.entity) {
                case SearchEntity.Block:
                    if (!searchResult.data) {
                        return [];
                    }

                    let resultBlock: IResult<IBlockResultData> = {
                        type: ResultType.Block,
                        data: {
                            blockNumber: searchResult.data.number
                        }
                    };
                    return [resultBlock];
                case SearchEntity.Tx:
                    let resultTx: IResult<ITxResultData> = {
                        type: ResultType.Tx,
                        data: {
                            hash
                        }
                    };
                    return [resultTx];
                case SearchEntity.Uncle:
                    let resultUncle: IResult<IUncleResultData> = {
                        type: ResultType.Uncle,
                        data: {
                            hash
                        }
                    };
                    return [resultUncle];
            }
        }
        // Otherwise, no results
        return [];
    }
}
