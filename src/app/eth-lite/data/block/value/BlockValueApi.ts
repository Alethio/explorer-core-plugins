import { IBlockRangeApi } from "app/shared/data/block/value/IBlockRangeApi";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";
import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { BlockValueReader } from "app/eth-lite/data/block/value/BlockValueReader";

export class BlockValueApi implements IBlockRangeApi<IBlockTxCount> {
    constructor(
        private web3EthApi: Web3EthApi,
        private blockValueReader: BlockValueReader
    ) {

    }

    /** Fetch data in range [start, end) */
    async fetch(rangeStart: number, rangeEnd: number) {
        let data = await this.web3EthApi.getBlockRangeTransactionCount(rangeStart, rangeEnd);

        return (data || [])
            .map(raw => this.blockValueReader.read(raw))
            // We shouldn't really need to sort these, but we do it just in case the API doesn't
            .sort((a, b) => a.id - b.id);
    }
}
