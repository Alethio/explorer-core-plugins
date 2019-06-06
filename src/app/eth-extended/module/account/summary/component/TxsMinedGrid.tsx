import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { ITxLiteByAccountMined } from "app/eth-extended/data/tx/lite/byAccount/mined/ITxLiteByAccountMined";
import { TxsMinedGridFields } from "app/eth-extended/module/account/summary/component/TxsMinedGridFields";
import { ICursor } from "app/eth-extended/data/contractMsg/lite/byAccount/ICursor";
import { CursorPaginatedView } from "app/eth-extended/module/account/summary/pagination/CursorPaginatedView";
import { PaginatedGrid } from "app/eth-extended/module/account/summary/component/PaginatedGrid";
import { ILogger } from "plugin-api/ILogger";

export interface ITxsMinedGridProps {
    paginatedView: CursorPaginatedView<ITxLiteByAccountMined, ICursor | undefined>;
    accountAddress: string;
    itemCount: number;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
}

export class TxsMinedGrid extends React.Component<ITxsMinedGridProps> {
    private gridFields: GridFields<ITxLiteByAccountMined>;
    private gridSortingOptions: GridSortingOptions;
    constructor(props: ITxsMinedGridProps) {
        super(props);
        this.gridFields = new TxsMinedGridFields(props.translation, props.locale, props.accountAddress);
        this.gridSortingOptions = new GridSortingOptions();
    }
    render() {
        return (
            <PaginatedGrid<ITxLiteByAccountMined>
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
