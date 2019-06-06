import { HttpApi } from "app/eth-extended/data/HttpApi";
import { BlockValueReader } from "app/eth-extended/data/block/value/BlockValueReader";
import { IBlockRangeApi } from "app/shared/data/block/value/IBlockRangeApi";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";

export class BlockValueApi implements IBlockRangeApi<IBlockTxCount> {
    constructor(
        private httpApi: HttpApi,
        private blockValueReader: BlockValueReader,
        private endpointUrlMask: string
    ) {

    }

    /** Fetch data in range [start, end) */
    async fetch(rangeStart: number, rangeEnd: number) {
        let data = await this.httpApi.fetch<any[]>(
            this.endpointUrlMask.replace(/%d/, "" + rangeStart).replace(/%d/, "" + (rangeEnd - 1))
        );

        return (data || [])
            .map(raw => this.blockValueReader.read(raw))
            // We shouldn't really need to sort these, but we do it just in case the API doesn't
            .sort((a, b) => a.id - b.id);
    }
}
