import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { SearchApi } from "app/eth-memento/data/search/SearchApi";
import { HttpApi } from "app/shared/data/HttpApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { SearchReader } from "app/eth-memento/data/search/SearchReader";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";
import { Search } from "app/eth-memento/data/search/Search";

export class SearchFactory {
    constructor(private appConfig: EthMementoPluginConfig) {

    }

    create(blockStateStore: BlockStateStore) {
        return new Search(
            blockStateStore,
            new SearchApi(
                new HttpApi(new HttpRequest()),
                new SearchReader(),
                this.appConfig.getSearchApiUrlMask()
            )
        );
    }
}
