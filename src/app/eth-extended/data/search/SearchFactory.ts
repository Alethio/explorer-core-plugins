import { Search } from "app/eth-extended/data/search/Search";
import { SearchHttpApi } from "app/eth-extended/data/search/SearchHttpApi";
import { HttpApi } from "app/shared/data/HttpApi";
import { ResultReader } from "app/eth-extended/data/search/ResultReader";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { SearchDsRpcApi } from "app/eth-extended/data/search/SearchDsRpcApi";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";
import { Deepstream } from "app/util/network/Deepstream";
import { ILogger } from "plugin-api/ILogger";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

export class SearchFactory {
    constructor(private appConfig: EthExtendedPluginConfig, private logger: ILogger) {

    }

    create(blockStateStore: BlockStateStore, deepstream: Deepstream) {
        return new Search(
            new SearchHttpApi(
                new HttpApi(new HttpRequest()),
                this.appConfig.getSearchApiUrlMask(),
                new ResultReader()
            ),
            new SearchDsRpcApi(
                new DsRpcApi(deepstream),
                new ResultReader()
            ),
            blockStateStore,
            this.logger
        );
    }
}
