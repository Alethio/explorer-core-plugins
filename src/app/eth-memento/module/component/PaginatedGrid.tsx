import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { observer } from "mobx-react";
import { observable, runInAction } from "mobx";
import { CursorInfinitePagination } from "@alethio/ui/lib/control/pagination/CursorInfinitePagination";
import { LoadStatus } from "@alethio/ui/lib/control/pagination/LoadStatus";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { IGridSortingOptions } from "@alethio/ui/lib/control/grid/state/IGridSortingOptions";
import { Grid } from "app/shared/component/Grid";
import { ICursor } from "app/eth-memento/data/tx/byAccount/ICursor";
import { CursorInfinitePaginatedView } from "app/eth-memento/module/pagination/CursorInfinitePaginatedView";

export interface IPaginatedGridProps<TItem> {
    fields: GridFields<TItem>;
    sortingOptions: IGridSortingOptions;
    paginatedView: CursorInfinitePaginatedView<TItem, ICursor | undefined>;
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
        let { translation: tr, locale } = this.props;

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
            { this.hasMorePages() || this.rangeStart > 1 ?
            <CursorInfinitePagination
                rangeStart={this.rangeStart}
                rangeEnd={rangeEnd}
                isLastPage={!this.hasMorePages()}
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

    private hasMorePages() {
        return this.props.paginatedView.hasMorePages();
    }
}
