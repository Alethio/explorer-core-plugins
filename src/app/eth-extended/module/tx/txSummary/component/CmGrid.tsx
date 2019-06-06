import * as React from "react";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { ITranslation } from "plugin-api/ITranslation";
import { Grid } from "app/shared/component/Grid";
import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { CmGridFields } from "./CmGridFields";

export interface ICmGridProps {
    items: ICmLite[];
    translation: ITranslation;
    locale: string;
}

export class CmGrid extends React.Component<ICmGridProps> {
    private gridFields: GridFields<ICmLite>;
    private gridSortingOptions: GridSortingOptions;
    constructor(props: ICmGridProps) {
        super(props);
        this.gridFields = new CmGridFields(props.translation, props.locale);
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
            <Grid<ICmLite>
                rows={rows}
                fields={this.gridFields}
                sortingOptions={this.gridSortingOptions}
                translation={this.props.translation}
            />
        );
    }
}
