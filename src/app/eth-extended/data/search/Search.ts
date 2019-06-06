import { SearchHttpApi } from "app/eth-extended/data/search/SearchHttpApi";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { isBetween } from "@puzzl/core/lib/math/number";
import { IResult } from "app/shared/data/search/IResult";
import { ResultType } from "app/shared/data/search/ResultType";
import { SearchDsRpcApi } from "app/eth-extended/data/search/SearchDsRpcApi";
import { ILogger } from "plugin-api/ILogger";

export class Search {
    constructor(
        private searchHttpApi: SearchHttpApi,
        private searchDsRpcApi: SearchDsRpcApi,
        private blockStateStore: BlockStateStore,
        private logger: ILogger
    ) {

    }

    async search(query: string) {
        // If it's a block number, return immediately
        if (query.match(/^[0-9]+$/)) {
            let blockNo = parseInt(query, 10);
            let latestBlockNo = this.blockStateStore.getLatest();
            let result: IResult = {
                type: ResultType.Block,
                blockNumber: blockNo
            };
            return isBetween(blockNo, 0, latestBlockNo) ? result : void 0;
        }

        // If it looks like an account address, return immediately
        let accountMatch = query.match(/^(0x)?([0-9a-f]{40})$/i);
        if (accountMatch) {
            let result: IResult = {
                type: ResultType.Account
            };
            return result;
        }

        // If it looks like a regular tx / block / uncle hash, call the backend
        let hashMatch = query.match(/^(0x)?([0-9a-f]{64})$/i);
        if (hashMatch) {
            let searchPromises = [
                this.searchHttpApi.search(hashMatch[2]),
                this.searchDsRpcApi.search(hashMatch[2])
            ];

            let [result1, result2] = await Promise.all(searchPromises.map((p, idx) => p.catch(e => {
                this.logger.error("Search source failed", e, { sourceIdx: idx });
                return void 0;
            })));

            return result1 || result2;
        }

        // Otherwise, no results
        return void 0;
    }
}
