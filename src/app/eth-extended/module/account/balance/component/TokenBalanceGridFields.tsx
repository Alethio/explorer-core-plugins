import * as React from "react";
import { GridFields, IGridField } from "@alethio/ui/lib/control/grid/state/GridFields";
import { ITranslation } from "plugin-api/ITranslation";
import { IAccountBalanceData } from "app/eth-extended/data/account/balance/IAccountBalanceDataSet";
import { FractionRenderer } from "./grid/FractionRenderer";
import { BalanceChartRenderer } from "./grid/BalanceChartRenderer";
import { UsdRenderer } from "@alethio/ui/lib/data/gridRenderer/UsdRenderer";
import { TokenBalanceRenderer } from "./grid/TokenBalanceRenderer";
import { GridLink } from "@alethio/explorer-ui/lib/grid/GridLink";
import { GridSortingOrder } from "@alethio/ui/lib/control/grid/state/GridSortingOrder";

enum ITokenBalanceGridFieldKeys {
    Name = "name",
    Balance = "balance",
    BalanceUsd = "balanceUsd",
    Chart = "chart",
    PercentFraction = "percentFraction"
}

export class TokenBalanceGridFields extends GridFields<IAccountBalanceData> {
    constructor(t: ITranslation, locale: string, private usdPricesEnabled: boolean, totalTokenBalanceUsd: number) {
        super();
        this.fields = [{
            label: t.get("accountView.content.balanceGrid.header.name"),
            fieldKey: ITokenBalanceGridFieldKeys.Name,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.currency.name,
            renderer: (f) => <GridLink to={`page://aleth.io/account?accountHash=${f.currency.address}`} >
                {f.currency.name}
            </GridLink>
        }, {
            label: t.get("accountView.content.balanceGrid.header.balance"),
            fieldKey: ITokenBalanceGridFieldKeys.Balance,
            type: "number",
            isSortable: true,
            defaultSortOrder: GridSortingOrder.Descending,
            selected: true,
            getFieldValue: f => f.chart[0].balance.shiftedBy(-f.currency.decimals),
            renderer: new TokenBalanceRenderer(
                locale,
                f => f.chart[0].balance.shiftedBy(-f.currency.decimals),
                f => f.currency.symbol
            )
        }, ...usdPricesEnabled ? [{
            label: t.get("accountView.content.balanceGrid.header.balanceUsd"),
            fieldKey: ITokenBalanceGridFieldKeys.BalanceUsd,
            type: "number",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.chart[0].balanceUsd,
            renderer: new UsdRenderer(locale, f => f.chart[0].balanceUsd)
        }, {
            label: t.get("accountView.content.balanceGrid.header.percent"),
            fieldKey: ITokenBalanceGridFieldKeys.PercentFraction,
            type: "number",
            isSortable: true,
            defaultSortOrder: GridSortingOrder.Descending,
            selected: true,
            getFieldValue: f => totalTokenBalanceUsd ? f.chart[0].balanceUsd / totalTokenBalanceUsd : 0,
            renderer: new FractionRenderer(locale, totalTokenBalanceUsd)
        }, {
            label: t.get("accountView.content.balanceGrid.header.chart"),
            fieldKey: ITokenBalanceGridFieldKeys.Chart,
            type: "array",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.chart[0].balanceUsd,
            renderer: new BalanceChartRenderer()
        }] as IGridField<IAccountBalanceData>[] : []];
    }

    public get defaultSortedField() {
        return this.fields.find(f => this.usdPricesEnabled ?
            f.fieldKey === ITokenBalanceGridFieldKeys.PercentFraction :
            f.fieldKey === ITokenBalanceGridFieldKeys.Balance);
    }
}
