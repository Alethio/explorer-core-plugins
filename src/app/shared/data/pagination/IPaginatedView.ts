export interface IPaginatedView<TItem> {
    goToNextPage(): Promise<void>;
    goToPreviousPage(): Promise<void>;
    getItems(): TItem[];
    getPageSize(): number;
}
