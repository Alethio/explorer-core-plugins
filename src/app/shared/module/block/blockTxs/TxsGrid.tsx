import * as React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { Grid } from "app/shared/component/Grid";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { ITranslation } from "plugin-api/ITranslation";
import { minMaxLogScale } from "app/helper/minMaxLogScale";
import { BigNumber } from "app/util/BigNumber";
import { TxGridFields as FullTxGridFields } from "app/eth-extended/module/block/blockTxs/txsGrid/TxGridFields";
import { TxGridFields as MementoTxGridFields } from "app/eth-memento/module/block/blockTxs/txsGrid/TxGridFields";
import { isFullTxLite } from "app/shared/data/tx/lite/isFullTxLite";

const TxsGridRoot = styled.div`
    margin-top: 16px;
`;

export interface IHighlightFn {
    (f: ITxLite): boolean;
}

interface ITxGridProps {
    transactions: ITxLite[];
    locale: string;
    translation: ITranslation;
    ethSymbol: string;
    gridSortingOptions: GridSortingOptions;
    highlightThreshold: number;
    highlightDataSelector(t: ITxLite): number | BigNumber;
}

@observer
export class TxsGrid extends React.Component<ITxGridProps> {
    @observable.ref
    private gridFields: GridFields<ITxLite>;
    private gridSortingOptions: GridSortingOptions;
    private scaledHighlightValues: Map<ITxLite, number>;

    constructor(props: ITxGridProps) {
        super(props);
        if (this.props.transactions.length && isFullTxLite(this.props.transactions[0])) {
            this.gridFields = new FullTxGridFields(props.translation, props.locale, props.ethSymbol, this.highlight);
        } else {
            this.gridFields = new MementoTxGridFields(props.translation, props.locale, props.ethSymbol, this.highlight);
        }
        this.gridSortingOptions = this.props.gridSortingOptions;
    }

    @action
    componentDidUpdate(prevProps: ITxGridProps) {
        if (this.props.translation !== prevProps.translation) {
            if (this.props.transactions.length && isFullTxLite(this.props.transactions[0])) {
                this.gridFields = new FullTxGridFields(this.props.translation, this.props.locale, this.props.ethSymbol,
                    this.highlight);
            } else {
                this.gridFields = new MementoTxGridFields(this.props.translation, this.props.locale,
                    this.props.ethSymbol, this.highlight);
            }
        }
    }

    render() {
        let highlightValues = this.props.transactions.map(tx => this.props.highlightDataSelector(tx));
        this.scaledHighlightValues = this.computeScaledHighlightValues(highlightValues);

        const rows = this.props.transactions.map(tx => {
            return {
                key: tx.hash,
                data: tx
            };
        });
        return (
            <TxsGridRoot>
                <Grid<ITxLite>
                    rows={rows}
                    fields={this.gridFields}
                    sortingOptions={this.gridSortingOptions}
                    translation={this.props.translation}
                />
            </TxsGridRoot>
        );
    }

    private computeScaledHighlightValues(values: (number | BigNumber)[]) {
        // Creates a map of tx data objects to scaled values. We do this because the link between the data item and
        // original array index is lost in rendering
        let scaledHighlightValues = new Map<ITxLite, number>();

        minMaxLogScale(values).forEach((v, i) => {
            scaledHighlightValues.set(this.props.transactions[i], v);
        });

        return scaledHighlightValues;
    }

    private highlight = (data: ITxLite) => {
        let percentLog = this.scaledHighlightValues.get(data);
        if (percentLog === void 0) {
            throw new Error(`Missing scaledHighlightValues for txHash "${data.hash}"`);
        }
        return percentLog > this.props.highlightThreshold;
    }
}
