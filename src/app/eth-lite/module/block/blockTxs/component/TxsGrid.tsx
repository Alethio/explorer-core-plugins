import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { Grid } from "app/shared/component/Grid";
import { ITranslation } from "plugin-api/ITranslation";
import { TxGridFields } from "./TxGridFields";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";

const TxsGridRoot = styled.div`
    margin-top: 16px;
`;

export enum ITxGridFieldKeys {
    Type = "type",
    Hash = "hash",
    From = "from",
    To = "to",
    Value = "value"
}

interface ITxGridProps {
    transactions: ITxDetails[];
    locale: string;
    translation: ITranslation;
    ethSymbol: string;
    gridSortingOptions: GridSortingOptions;
}

@observer
export class TxsGrid extends React.Component<ITxGridProps> {
    @observable.ref
    private gridFields: GridFields<ITxDetails>;
    private gridSortingOptions: GridSortingOptions;

    constructor(props: ITxGridProps) {
        super(props);
        this.gridFields = new TxGridFields(props.translation, props.locale, props.ethSymbol);
        this.gridSortingOptions = this.props.gridSortingOptions;
    }

    @action
    componentDidUpdate(prevProps: ITxGridProps) {
        if (this.props.translation !== prevProps.translation) {
            this.gridFields = new TxGridFields(this.props.translation, this.props.locale, this.props.ethSymbol);
        }
    }

    render() {
        const rows = this.props.transactions.map(tx => {
            return {
                key: tx.hash,
                data: tx
            };
        });
        return (
            <TxsGridRoot>
                <Grid<ITxDetails>
                    rows={rows}
                    fields={this.gridFields}
                    sortingOptions={this.gridSortingOptions}
                    translation={this.props.translation}
                />
            </TxsGridRoot>
        );
    }
}
