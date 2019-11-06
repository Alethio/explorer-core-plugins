import { FifoCache } from "app/util/cache/FifoCache";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { BlockValueApi } from "app/shared/data/block/value/BlockValueApi";
import { BlockValueReader } from "app/shared/data/block/value/BlockValueReader";
import { BlockValueStore } from "app/shared/data/block/value/BlockValueStore";
import { BlockRangeStore } from "app/shared/data/block/value/BlockRangeStore";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";

/** Number of cached pages */
const CACHE_SIZE = 10;
/** Block value items per page */
const PAGE_SIZE = 50;

export class BlockValueStoreFactory {
    constructor(private appConfig: EthExtendedPluginConfig | EthMementoPluginConfig) {

    }

    create() {
        return new BlockValueStore(
            new BlockRangeStore<IBlockTxCount>(
                new FifoCache<number, IBlockTxCount[]>(CACHE_SIZE),
                PAGE_SIZE,
                new BlockValueApi(
                    new HttpApi(new HttpRequest()),
                    new BlockValueReader(),
                    this.appConfig.getBlockValueApiUrlMask()
                )
            )
        );
    }
}
