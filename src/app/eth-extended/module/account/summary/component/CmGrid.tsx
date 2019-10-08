import * as React from "react";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { ITranslation } from "plugin-api/ITranslation";
import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { CmGridFields } from "app/eth-extended/module/account/summary/component/CmGridFields";
import { PaginatedGrid } from "app/eth-extended/module/account/summary/component/PaginatedGrid";
import { ICursor } from "app/eth-extended/data/contractMsg/lite/byAccount/ICursor";
import { CursorPaginatedView } from "app/shared/data/pagination/CursorPaginatedView";
import { ILogger } from "plugin-api/ILogger";

export interface ICmGridProps {
    paginatedView: CursorPaginatedView<ICmLite, ICursor>;
    accountAddress: string;
    itemCount: number;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    logger: ILogger;
}

export class CmGrid extends React.Component<ICmGridProps> {
    private gridFields: GridFields<ICmLite>;
    private gridSortingOptions: GridSortingOptions;
    constructor(props: ICmGridProps) {
        super(props);
        this.gridFields = new CmGridFields(props.translation, props.locale, props.ethSymbol, props.accountAddress);
        this.gridSortingOptions = new GridSortingOptions();
    }
    render() {
        return (
            <PaginatedGrid<ICmLite>
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
