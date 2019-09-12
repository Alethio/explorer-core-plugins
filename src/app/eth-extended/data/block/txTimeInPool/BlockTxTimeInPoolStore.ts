import { IBlockTxTimeInPool } from "./IBlockTxTimeInPool";
import { LazyRecord } from "app/util/network/LazyRecord";

export class BlockTxTimeInPoolStore {
    latestValues: LazyRecord<IBlockTxTimeInPool[]>;
}
