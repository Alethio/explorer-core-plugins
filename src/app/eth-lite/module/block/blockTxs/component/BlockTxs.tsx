import React from "react";
import { observer } from "mobx-react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { Spacer } from "@alethio/ui/lib/layout/Spacer";
import { TxCountBox } from "@alethio/explorer-ui/lib/box/block/TxCountBox";
import { ITranslation } from "plugin-api/ITranslation";
import { TxHighlightSelector } from "@alethio/explorer-ui/lib/blockTxs/txHighlight/TxHighlightSelector";
import { ViewSelectorBox } from "@alethio/explorer-ui/lib/blockTxs/ViewSelectorBox";
import { BlockTxsStateFactory } from "../BlockTxsStateFactory";
import { BlockTxsState } from "../BlockTxsState";
import { TxTooltipContent } from "./TxTooltipContent";
import { TxsHeatMap } from "@alethio/explorer-ui/lib/blockTxs/txHeatMap/TxsHeatMap";
import { TxsGrid } from "./TxsGrid";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";
import { minMaxLogScale } from "app/helper/minMaxLogScale";

const HIGHLIGHT_THRESHOLD = 80;

interface IGlobalState {
    blockTxsLiteState?: BlockTxsState;
}

export interface IBlockTxsProps {
    txs: ITxDetails[];
    translation: ITranslation;
    locale: string;
    uiStateContainer: IGlobalState;
}

@observer
export class BlockTxs extends React.Component<IBlockTxsProps> {
    constructor(props: IBlockTxsProps) {
        super(props);

        // TODO: encapsulation per module type
        let blockTxsState = this.props.uiStateContainer.blockTxsLiteState;
        if (!blockTxsState) {
            blockTxsState = new BlockTxsStateFactory().create();
            this.props.uiStateContainer.blockTxsLiteState = blockTxsState;
        }
    }

    render() {
        let { translation: tr, txs, locale, uiStateContainer } = this.props;
        let {
            txsGridSortingOptions, txsHighlightFields, txsViewMode
        } = uiStateContainer.blockTxsLiteState as BlockTxsState;

        return <>
            <LayoutRow minWidth={610}>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.transactions.label")}</Label>
                    <TxCountBox>{txs.length}</TxCountBox>
                </LayoutRowItem>
                { txs.length ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.transactionsHighlight.label")}</Label>
                    <TxHighlightSelector fields={txsHighlightFields} translation={tr}
                        disabled={txsViewMode.isTableList} />
                    <ViewSelectorBox txsViewMode={txsViewMode} />
                </LayoutRowItem>
                : null }
            </LayoutRow>
            { txs.length ?
            <>
                { txsViewMode.isHeatMapGrid ?
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <div />
                        <div style={{ maxWidth: 600 }}>
                            <TxsHeatMap
                                transactions={txs}
                                highlightThreshold={HIGHLIGHT_THRESHOLD}
                                highlightDataSelector={txsHighlightFields.getSelectedField().getData}
                                scaleValuesFn={minMaxLogScale}
                                txTooltipThunk={this.renderHeatMapTooltip}
                            />
                        </div>
                    </LayoutRowItem>
                </LayoutRow>
                :
                <TxsGrid
                    transactions={txs}
                    gridSortingOptions={txsGridSortingOptions}
                    locale={locale}
                    translation={tr}
                />
                }
                <Spacer height="64px" />
            </>
            : null }
        </>;
    }

    private renderHeatMapTooltip = (tx: ITxDetails) => {
        return <TxTooltipContent
            tx={tx}
            translation={this.props.translation} locale={this.props.locale}
        />;
    }
}
