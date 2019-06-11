import { observable, action, runInAction } from "mobx";
import { ISearch } from "app/shared/data/search/ISearch";
import { ResultType } from "app/shared/data/search/ResultType";
import { IAccountResultData } from "app/shared/data/search/result/IAccountResultData";
import { IBlockResultData } from "app/shared/data/search/result/IBlockResultData";
import { IInternalNav } from "plugin-api/withInternalNav";

export class SearchState {
    @observable
    noResults = false;
    @observable
    inProgress = false;

    constructor(
        private search: ISearch,
        private internalNav: IInternalNav,
        private onResults: () => void,
        private onNoResults: () => void
    ) {

    }

    @action
    async submit(query: string) {
        if (this.inProgress) {
            return;
        }

        this.noResults = false;
        this.inProgress = true;

        query = query.trim().toLowerCase();
        let result = (await this.search.search(query))[0];
        if (result) {
            let url: string;

            if (result.type === ResultType.Account) {
                url = `page://aleth.io/account?accountHash=${(result.data as IAccountResultData).address}`;
            } else if (result.type === ResultType.Block) {
                url = `page://aleth.io/block?blockNumber=${(result.data as IBlockResultData).blockNumber}`;
            } else if (result.type === ResultType.Tx) {
                url = `page://aleth.io/tx?txHash=${query}`;
            } else if (result.type === ResultType.Uncle) {
                url = `page://aleth.io/uncle?uncleHash=${query}`;
            } else {
                throw new Error(`Unhandled result type "${result.type}"`);
            }

            runInAction(() => {
                this.inProgress = false;
            });
            if (!this.internalNav.goTo(url)) {
                this.handleNoResults();
                return;
            }
            this.onResults();
        } else {
            this.handleNoResults();
        }
    }

    private handleNoResults() {
        runInAction(() => {
            this.noResults = true;
            this.inProgress = false;
        });
        this.onNoResults();
    }

    @action
    reset() {
        this.noResults = false;
        this.inProgress = false;
    }
}
