import { SearchHttpApi } from "app/eth-extended/data/search/SearchHttpApi";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { isBetween } from "@puzzl/core/lib/math/number";
import { IResult } from "app/shared/data/search/IResult";
import { ResultType } from "app/shared/data/search/ResultType";
import { SearchDsRpcApi } from "app/eth-extended/data/search/SearchDsRpcApi";
import { ILogger } from "plugin-api/ILogger";
import { ISearch } from "app/shared/data/search/ISearch";
import { IBlockResultData } from "app/shared/data/search/result/IBlockResultData";

export class Search implements ISearch {
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
            let result: IResult<IBlockResultData> = {
                type: ResultType.Block,
                data: {
                    blockNumber: blockNo
                }
            };
            return isBetween(blockNo, 0, latestBlockNo) ? [result] : [];
        }

        // If it looks like a regular tx / block / uncle hash, search also in Deepstream
        let hashMatch = query.match(/^(0x)?([0-9a-f]{64})$/i);

        let searchPromises = [
            this.searchHttpApi.search(query),
            hashMatch ? this.searchDsRpcApi.search(hashMatch[2]) : Promise.resolve([])
        ];

        let [apiResults, dsResults] = await Promise.all<IResult[]>(searchPromises.map((p, idx) => p.catch(e => {
            this.logger.error("Search source failed", e, { sourceIdx: idx });
            return [];
        })));

        return [...apiResults, ...dsResults];
    }
}
