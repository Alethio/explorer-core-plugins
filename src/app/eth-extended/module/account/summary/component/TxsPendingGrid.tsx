import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { OffsetPaginatedView } from "app/eth-extended/module/account/summary/pagination/OffsetPaginatedView";
import { PaginatedGrid } from "app/eth-extended/module/account/summary/component/PaginatedGrid";
import { TxsPendingGridFields } from "./TxsPendingGridFields";
import { ILogger } from "plugin-api/ILogger";
import { ITxLiteByAccountPending } from "app/eth-extended/data/tx/lite/byAccount/pending/ITxLiteByAccountPending";

export interface ITxsPendingGridProps {
    accountAddress: string;
    paginatedView: OffsetPaginatedView<ITxLiteByAccountPending>;
    itemCount: number;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    logger: ILogger;
}

export class TxsPendingGrid extends React.Component<ITxsPendingGridProps> {
    private gridFields: GridFields<ITxLiteByAccountPending>;
    private gridSortingOptions: GridSortingOptions;
    constructor(props: ITxsPendingGridProps) {
        super(props);
        this.gridFields = new TxsPendingGridFields(
            props.translation, props.locale, props.ethSymbol, props.accountAddress);
        this.gridSortingOptions = new GridSortingOptions();
    }
    render() {
        return (
            <PaginatedGrid<ITxLiteByAccountPending>
                paginatedView={this.props.paginatedView}
                itemCount={this.props.itemCount}
                fields={this.gridFields}
                sortingOptions={this.gridSortingOptions}
                translation={this.props.translation}
                locale={this.props.locale}
                onPageError={e => this.props.logger.error(e)}
            />
        );
    }
}
