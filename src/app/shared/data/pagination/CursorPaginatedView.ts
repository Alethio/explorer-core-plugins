import { IPaginatedView } from "./IPaginatedView";

interface IStore<TItem, TCursor> {
    fetch(cursor: TCursor, limit: number): Promise<TItem[]>;
}

/**
 * Loads data using a cursor-based pagination and keeps all records in memory to be able to navigate backwards without
 * having another server call with a "reverse" cursor.
 */
export class CursorPaginatedView<TItem, TCursor> implements IPaginatedView<TItem> {
    /**
     * Items indexed by page number.
     *
     * We use page numbers so that we can navigate backwards without having a "previous" cursor.
     */
    private storage: TItem[][] = [];
    private currentPage: number | undefined;

    constructor(
        private store: IStore<TItem, TCursor>,
        private initialCursor: TCursor,
        private pageSize: number,
        private getCursor: (item: TItem) => TCursor
    ) {
    }

    async loadFirstPage() {
        this.currentPage = 0;
        await this.loadItems(this.initialCursor, this.currentPage);
    }

    async goToNextPage() {
        if (this.currentPage === void 0) {
            throw new Error(`Not initialized`);
        }
        await this.loadNextPage();
        this.currentPage++;
    }

    async loadNextPage() {
        if (this.currentPage === void 0) {
            throw new Error(`Not initialized`);
        }
        let currentItems = this.getItems();
        if (!currentItems) {
            throw new Error(`Page ${this.currentPage + 1} can't be loaded because the previous page is not loaded`);
        }
        // We have no "next URL" in server response, so we only know it's the last page when there are fewer items
        if (currentItems.length < this.pageSize) {
            throw new RangeError(`We are already on the last page`);
        }
        let lastItem = currentItems[currentItems.length - 1];
        let newCursor = this.getCursor(lastItem);
        await this.loadItems(newCursor, this.currentPage + 1);
    }

    async goToPreviousPage() {
        if (this.currentPage === void 0) {
            throw new Error(`Not initialized`);
        }
        if (this.currentPage === 0) {
            throw new RangeError(`We are already on the first page`);
        }
        this.currentPage--;
    }

    private async loadItems(atCursor: TCursor, page: number) {
        let items = this.storage[page];
        if (!items) {
            items = await this.store.fetch(atCursor, this.pageSize);
            this.storage[page] = items;
        }
    }

    getItems() {
        if (this.currentPage === void 0) {
            throw new Error(`Not initialized`);
        }
        return this.storage[this.currentPage];
    }

    getPageSize() {
        return this.pageSize;
    }
}
