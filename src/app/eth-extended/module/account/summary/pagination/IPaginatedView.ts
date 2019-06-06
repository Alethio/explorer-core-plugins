export interface IPaginatedView<TItem> {
    loadNextPage(): Promise<void>;
    loadPreviousPage(): Promise<void>;
    getItems(): TItem[];
    getPageSize(): number;
}
