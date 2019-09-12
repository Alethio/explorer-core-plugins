import { LazyRecord } from "app/util/network/LazyRecord";

export class PendingPoolStore {
    statsPerSec: LazyRecord<{ erc20: number; eth: number; }>;
    poolSize: LazyRecord<number>;
}
