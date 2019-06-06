import { BlockRangeStore } from "app/shared/data/block/value/BlockRangeStore";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";

export class BlockValueStore {
    constructor(
        private blockValueApiStore: BlockRangeStore<IBlockTxCount>
    ) {

    }

    /** Fetch data in range [start, end) */
    async fetch(start: number, end: number) {
        return await this.blockValueApiStore.fetch(start, end);
    }
}
