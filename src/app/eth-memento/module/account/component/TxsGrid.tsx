import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { ITxLiteByAccount } from "app/eth-memento/data/tx/byAccount/ITxLiteByAccount";
import { TxsGridFields } from "app/eth-memento/module/account/component/TxsGridFields";
import { ICursor } from "app/eth-memento/data/tx/byAccount/ICursor";
import { CursorInfinitePaginatedView } from "../pagination/CursorInfinitePaginatedView";
import { PaginatedGrid } from "./PaginatedGrid";
import { ILogger } from "plugin-api/ILogger";

export interface ITxsGridProps {
    paginatedView: CursorInfinitePaginatedView<ITxLiteByAccount, ICursor | undefined>;
    accountAddress: string;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    logger: ILogger;
}

export class TxsGrid extends React.Component<ITxsGridProps> {
    private gridFields: GridFields<ITxLiteByAccount>;
    private gridSortingOptions: GridSortingOptions;
    constructor(props: ITxsGridProps) {
        super(props);
        this.gridFields = new TxsGridFields(
            props.translation, props.locale, props.ethSymbol, props.accountAddress);
        this.gridSortingOptions = new GridSortingOptions();
    }
    render() {
        return (
            <PaginatedGrid<ITxLiteByAccount>
                paginatedView={this.props.paginatedView}
                fields={this.gridFields}
                sortingOptions={this.gridSortingOptions}
                translation={this.props.translation}
                locale={this.props.locale}
                onPageError={e => this.props.logger.error(e)}
            />
        );
    }
}
