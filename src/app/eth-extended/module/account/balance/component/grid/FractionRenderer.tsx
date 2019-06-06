import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { IAccountBalanceData } from "app/eth-extended/data/account/balance/IAccountBalanceDataSet";

export class FractionRenderer implements IGridFieldRenderer<IAccountBalanceData> {
    constructor(
        private locale: string,
        private totalBalanceUsd: number
    ) {
    }

    render(f: IAccountBalanceData) {
        let percentFraction = this.totalBalanceUsd ?
            f.chart[0].balanceUsd / this.totalBalanceUsd :
            0;
        return (
            percentFraction.toLocaleString(this.locale, {
                style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 2
            })
        );
    }
}
