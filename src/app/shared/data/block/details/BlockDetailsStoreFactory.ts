import { BlockDetailsStore } from "./BlockDetailsStore";
import { FifoCache } from "app/util/cache/FifoCache";
import { IBlockDetails } from "./IBlockDetails";
import { BlockDetailsReader } from "./BlockDetailsReader";
import { BlockDetailsApi } from "./BlockDetailsApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";
import {EthMementoPluginConfig} from "app/eth-memento/EthMementoPluginConfig";

const CACHE_SIZE = 100;

export class BlockDetailsStoreFactory {
    constructor(private appConfig: EthExtendedPluginConfig | EthMementoPluginConfig) {

    }

    create() {
        return new BlockDetailsStore(
            new FifoCache<number, IBlockDetails>(CACHE_SIZE),
            new BlockDetailsApi(
                new HttpApi(new HttpRequest()),
                new BlockDetailsReader(),
                this.appConfig.getBlockApiUrlMask()
            )
        );
    }
}
