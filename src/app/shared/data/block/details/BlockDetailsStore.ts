import { ICache } from "app/util/cache/ICache";
import { IBlockDetails } from "./IBlockDetails";
import { BlockDetailsApi } from "./BlockDetailsApi";
import { KeyValueStore } from "app/shared/data/KeyValueStore";

export class BlockDetailsStore extends KeyValueStore<number, IBlockDetails> {
    constructor(cache: ICache<number, IBlockDetails>, api: BlockDetailsApi) {
        super(cache, api);
    }

    fetch(blockId: number) {
        return super.fetch(blockId);
    }
}
