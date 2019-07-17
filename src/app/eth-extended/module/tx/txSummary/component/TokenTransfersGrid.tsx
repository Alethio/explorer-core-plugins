import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { ITokenTransfer } from "app/eth-extended/data/token/transfer/ITokenTransfer";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { TokenTransfersGridFields } from "./TokenTransfersGridFields";
import { Grid } from "app/shared/component/Grid";

export interface ITokenTransfersGridProps {
    items: ITokenTransfer[];
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
}

export class TokenTransfersGrid extends React.Component<ITokenTransfersGridProps> {
    private gridFields: GridFields<ITokenTransfer>;
    private gridSortingOptions: GridSortingOptions;
    constructor(props: ITokenTransfersGridProps) {
        super(props);
        this.gridFields = new TokenTransfersGridFields(props.translation, props.locale, props.ethSymbol);
        this.gridSortingOptions = new GridSortingOptions();
    }
    render() {
        const rows = this.props.items.map((cm, idx) => {
            return {
                key: idx,
                data: cm
            };
        });

        return (
            <Grid<ITokenTransfer>
                rows={rows}
                fields={this.gridFields}
                sortingOptions={this.gridSortingOptions}
                translation={this.props.translation}
            />
        );
    }
}
