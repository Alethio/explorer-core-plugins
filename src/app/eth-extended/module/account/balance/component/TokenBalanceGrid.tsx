import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { Grid } from "app/shared/component/Grid";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { TokenBalanceGridFields } from "./TokenBalanceGridFields";
import { IAccountBalanceData } from "app/eth-extended/data/account/balance/IAccountBalanceDataSet";
import { IGridDataRow } from "@alethio/ui/lib/control/grid/Grid";

interface ITokenBalanceGridProps {
    tokenBalances: IAccountBalanceData[];
    translation: ITranslation;
    locale: string;
    usdPricesEnabled: boolean;
}

export class TokenBalanceGrid extends React.PureComponent<ITokenBalanceGridProps> {
    private gridFields: GridFields<IAccountBalanceData>;
    private gridSortingOptions: GridSortingOptions;

    constructor(props: ITokenBalanceGridProps) {
        super(props);
        let totalTokenBalanceUsd = props.tokenBalances.reduce((acc, item) => {
            return acc + item.chart[0].balanceUsd;
        }, 0);
        this.gridFields = new TokenBalanceGridFields(props.translation, props.locale,
            props.usdPricesEnabled, totalTokenBalanceUsd);
        this.gridSortingOptions = new GridSortingOptions(this.gridFields.defaultSortedField);
    }

    componentDidUpdate(prevProps: ITokenBalanceGridProps) {
        if (this.props.locale !== prevProps.locale) {
            let totalTokenBalanceUsd = this.props.tokenBalances.reduce((acc, item) => {
                return acc + item.chart[0].balanceUsd;
            }, 0);
            let { translation, locale } = this.props;
            this.gridFields = new TokenBalanceGridFields(translation, locale,
                this.props.usdPricesEnabled, totalTokenBalanceUsd);
        }
    }

    render() {
        const rows = this.props.tokenBalances.map<IGridDataRow<IAccountBalanceData>>(tk => {
            return {
                key: tk.currency.address,
                data: tk
            };
        });
        return (
            <Grid<IAccountBalanceData>
                rows={rows}
                fields={this.gridFields}
                sortingOptions={this.gridSortingOptions}
                translation={this.props.translation}
            />
        );
    }

}
