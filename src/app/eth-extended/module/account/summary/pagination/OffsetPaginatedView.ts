import { IPaginatedView } from "app/eth-extended/module/account/summary/pagination/IPaginatedView";

interface IStore<TItem> {
    fetch(offset: number, limit: number): Promise<TItem[]>;
}

/**
 * Loads data using an offset-based pagination. Always fetches fresh data on page change
 */
export class OffsetPaginatedView<TItem> implements IPaginatedView<TItem> {
    private storage: TItem[] = [];
    private currentPage: number | undefined;

    constructor(
        private store: IStore<TItem>,
        private initialOffset: number,
        private pageSize: number
    ) {
    }

    async loadFirstPage() {
        this.currentPage = 0;
        await this.loadItems(this.initialOffset);
    }

    async loadNextPage() {
        if (this.currentPage === void 0) {
            throw new Error(`Not initialized`);
        }
        let currentItems = this.getItems();
        // We have no "next URL" in server response, so we only know it's the last page when there are fewer items
        if (currentItems.length < this.pageSize) {
            throw new RangeError(`We are already on the last page`);
        }
        this.currentPage++;
        let newOffset = this.pageSize * this.currentPage;
        await this.loadItems(newOffset);
    }

    async loadPreviousPage() {
        if (this.currentPage === void 0) {
            throw new Error(`Not initialized`);
        }
        if (this.currentPage === 0) {
            throw new RangeError(`We are already on the first page`);
        }
        this.currentPage--;
        let newOffset = this.pageSize * this.currentPage;
        await this.loadItems(newOffset);
    }

    private async loadItems(offset: number) {
        let items = await this.store.fetch(offset, this.pageSize);
        this.storage = items;
    }

    getItems() {
        if (this.currentPage === void 0) {
            throw new Error(`Not initialized`);
        }
        return this.storage;
    }

    getPageSize() {
        return this.pageSize;
    }
}
