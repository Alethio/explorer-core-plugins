import { observable, action, runInAction } from "mobx";
import { ISearch } from "app/shared/data/search/ISearch";
import { ResultType } from "app/shared/data/search/ResultType";
import { IAccountResultData } from "app/shared/data/search/result/IAccountResultData";
import { IBlockResultData } from "app/shared/data/search/result/IBlockResultData";
import { IInternalNav } from "plugin-api/withInternalNav";
import { IResult } from "app/shared/data/search/IResult";
import { SearchStatus } from "app/eth-common/module/search/component/SearchStatus";
import { Task } from "@puzzl/core/lib/async/Task";
import { sleep } from "@puzzl/core/lib/async/sleep";
import { ILogger } from "plugin-api/ILogger";
import { OperationCanceledError, CancellationToken } from "@puzzl/core/lib/async/cancellation";

export class SearchState {
    @observable
    results: IResult[] = [];
    @observable
    status = SearchStatus.Initial;
    @observable
    isActive = false;
    /** Last/current query */
    private query: string;
    private blurTimeout: number | undefined;
    private searchTask: Task<void>;

    constructor(
        private search: ISearch,
        private internalNav: IInternalNav,
        private logger: ILogger,
        private debounceMillis = 400,
        private onResults?: () => void,
        private onNoResults?: () => void
    ) {
    }

    @action
    private async submit(query: string, cancelToken: CancellationToken) {
        query = query.trim().toLowerCase();

        if (!query) {
            this.reset();
            return;
        }

        // If we haven't changed the query and we haven't overwritten the previous results
        if (query === this.query && this.status !== SearchStatus.InProgress) {
            return;
        }

        this.results = [];
        this.status = SearchStatus.InProgress;

        let results = await this.search.search(query);
        cancelToken.throwIfCancelled();
        this.query = query;

        // Filter out unknown results
        results = results.filter(result => {
            let uri = this.buildResultUri(result, query);
            return uri ? this.internalNav.resolve(uri) : false;
        });

        runInAction(() => {
            this.status = SearchStatus.Finished;
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
        this.deactivate();
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
        this.status = SearchStatus.Initial;
        this.query = "";
    }

    deactivate() {
        this.isActive = false;
        if (this.searchTask) {
            this.searchTask.cancel();
        }
    }

    handleFocus = () => {
        this.isActive = true;
        clearTimeout(this.blurTimeout);
    }

    handleBlur = (e: any) => {
        // setTimeout to prevent the results layer from disappearing when clicking on a result
        this.blurTimeout = setTimeout(() => {
            this.deactivate();
        }, 100);
    }

    handleKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        let value = (ev.target as HTMLInputElement).value;
        this.triggerSearch(value);
    }

    triggerSearch(value: string, debounce = true) {
        if (this.searchTask) {
            this.searchTask.cancel();
        }
        this.searchTask = new Task(async (cancelToken) => {
            if (debounce) {
                await sleep(this.debounceMillis, cancelToken);
            }
            await this.submit(value, cancelToken);
        });
        this.searchTask.start().catch(err => {
            if (!(err instanceof OperationCanceledError)) {
                this.logger.error(err);
            }
        });
    }
}
