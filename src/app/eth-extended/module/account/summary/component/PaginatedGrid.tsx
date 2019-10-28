import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { observer } from "mobx-react";
import { observable, runInAction } from "mobx";
import { CursorPagination } from "@alethio/ui/lib/control/pagination/CursorPagination";
import { LoadStatus } from "@alethio/ui/lib/control/pagination/LoadStatus";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { IGridSortingOptions } from "@alethio/ui/lib/control/grid/state/IGridSortingOptions";
import { Grid } from "app/shared/component/Grid";
import { IPaginatedView } from "app/shared/data/pagination/IPaginatedView";

export interface IPaginatedGridProps<TItem> {
    fields: GridFields<TItem>;
    sortingOptions: IGridSortingOptions;
    itemCount: number;
    paginatedView: IPaginatedView<TItem>;
    translation: ITranslation;
    locale: string;
    onPageError(e: any): void;
}

@observer
export class PaginatedGrid<TItem> extends React.Component<IPaginatedGridProps<TItem>> {
    private gridContainer: HTMLElement;
    @observable
    private rangeStart = 1;
    @observable
    private loadStatus = LoadStatus.Loaded;
    private items: TItem[];

    constructor(props: IPaginatedGridProps<TItem>) {
        super(props);

        this.items = this.props.paginatedView.getItems();
    }

    componentDidUpdate(prevProps: IPaginatedGridProps<TItem>) {
        if (this.props.paginatedView !== prevProps.paginatedView) {
            this.items = this.props.paginatedView.getItems();
        }
    }

    render() {
        let { itemCount, translation: tr, locale } = this.props;

        let rangeEnd = this.rangeStart + this.items.length - 1;

        let rows = this.items.map((item, idx) => ({
            key: idx,
            data: item
        }));

        return <>
            <div ref={ref => this.gridContainer = ref!}>
                <Grid<TItem>
                    rows={rows}
                    limitRows={false}
                    fields={this.props.fields}
                    sortingOptions={this.props.sortingOptions}
                    translation={tr}
                />
            </div>
            { rangeEnd < itemCount || this.rangeStart > 1 ?
            <CursorPagination
                rangeStart={this.rangeStart}
                rangeEnd={rangeEnd}
                totalItems={itemCount}
                loadStatus={this.loadStatus}
                onPrevPage={this.handlePrevPage}
                onNextPage={this.handleNextPage}
                errorText={tr.get("general.error")}
                locale={locale}
            />
            : null }
        </>;
    }

    private handleNextPage = async () => {
        this.loadStatus = LoadStatus.NotLoaded;
        try {
            await this.props.paginatedView.goToNextPage();
        } catch (e) {
            this.props.onPageError(e);
            this.loadStatus = LoadStatus.Error;
            return;
        }
        runInAction(() => {
            this.items = this.props.paginatedView.getItems();
            this.loadStatus = LoadStatus.Loaded;
            this.rangeStart += this.props.paginatedView.getPageSize();
        });
        this.scrollToGridTop();
    }

    private handlePrevPage = async () => {
        this.loadStatus = LoadStatus.NotLoaded;
        try {
            await this.props.paginatedView.goToPreviousPage();
        } catch (e) {
            this.props.onPageError(e);
            this.loadStatus = LoadStatus.Error;
            return;
        }
        runInAction(() => {
            this.items = this.props.paginatedView.getItems();
            this.loadStatus = LoadStatus.Loaded;
            this.rangeStart -= this.props.paginatedView.getPageSize();
        });
        this.scrollToGridTop();
    }

    private scrollToGridTop = () => {
        this.gridContainer.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }
}
