import { IPaginatedView } from "app/shared/data/pagination/IPaginatedView";
import { CursorPaginatedView } from "app/shared/data/pagination/CursorPaginatedView";

/**
 * Loads data using a cursor-based pagination and keeps all records in memory to be able to navigate backwards without
 * having another server call with a "reverse" cursor.
 */
export class CursorInfinitePaginatedView<TItem, TCursor> implements IPaginatedView<TItem> {
    private _hasMorePages = true;

    constructor(
        private baseCursorPaginatedView: CursorPaginatedView<TItem, TCursor>
    ) {
    }

    async loadFirstPage() {
        await this.baseCursorPaginatedView.loadFirstPage();
        try {
            await this.baseCursorPaginatedView.loadNextPage();
        } catch (e) {
            this._hasMorePages = false;
        }
    }

    async goToNextPage() {
        await this.baseCursorPaginatedView.goToNextPage();
        try {
            await this.baseCursorPaginatedView.loadNextPage();
        } catch (e) {
            this._hasMorePages = false;
        }
    }

    async goToPreviousPage() {
        await this.baseCursorPaginatedView.goToPreviousPage();
        this._hasMorePages = true;
    }

    getItems() {
        return this.baseCursorPaginatedView.getItems();
    }

    getPageSize() {
        return this.baseCursorPaginatedView.getPageSize();
    }

    hasMorePages() {
        return this._hasMorePages;
    }
}
