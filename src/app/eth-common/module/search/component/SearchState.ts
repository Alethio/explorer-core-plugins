import { observable, action, runInAction } from "mobx";
import { ISearch } from "app/shared/data/search/ISearch";
import { ResultType } from "app/shared/data/search/ResultType";
import { IAccountResultData } from "app/shared/data/search/result/IAccountResultData";
import { IBlockResultData } from "app/shared/data/search/result/IBlockResultData";
import { IInternalNav } from "plugin-api/withInternalNav";
import { IResult } from "app/shared/data/search/IResult";

export class SearchState {
    @observable
    results: IResult[] = [];
    @observable
    inProgress = false;
    // Last/current query
    private query: string;

    constructor(
        private search: ISearch,
        private internalNav: IInternalNav,
        private onResults?: () => void,
        private onNoResults?: () => void
    ) {

    }

    @action
    async submit(query: string) {
        if (this.inProgress) {
            return;
        }

        this.results = [];
        this.inProgress = true;

        query = query.trim().toLowerCase();
        let results = await this.search.search(query);

        // Filter out unknown results
        results = results.filter(result => {
            let uri = this.buildResultUri(result, query);
            return uri ? this.internalNav.resolve(uri) : false;
        });
        this.query = query;

        runInAction(() => {
            this.inProgress = false;
            this.results = results;
        });

        if (results.length) {
            if (this.onResults) {
                this.onResults();
            }
        } else {
            if (this.onNoResults) {
                this.onNoResults();
            }
        }
    }

    activateResult(result: IResult) {
        let uri = this.buildResultUri(result, this.query);
        if (!uri) {
            throw new Error(`Unknown resultType "${result.type}"`);
        }
        this.internalNav.goTo(uri);
    }

    /**
     * TODO: include tx/uncle hash in result so we don't have to pass query
     */
    private buildResultUri(result: IResult, query: string) {
        let uri: string;

        if (result.type === ResultType.Account) {
            uri = `page://aleth.io/account?accountHash=${(result.data as IAccountResultData).address}`;
        } else if (result.type === ResultType.Block) {
            uri = `page://aleth.io/block?blockNumber=${(result.data as IBlockResultData).blockNumber}`;
        } else if (result.type === ResultType.Tx) {
            uri = `page://aleth.io/tx?txHash=${query}`;
        } else if (result.type === ResultType.Uncle) {
            uri = `page://aleth.io/uncle?uncleHash=${query}`;
        } else {
            return void 0;
        }

        return uri;
    }

    @action
    reset() {
        this.results = [];
        this.inProgress = false;
    }
}
