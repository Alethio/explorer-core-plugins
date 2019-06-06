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
import { ITxLite } from "app/eth-extended/data/tx/ITxLite";
import { TxTooltipContent } from "./TxTooltipContent";
import { TxsHeatMap } from "@alethio/explorer-ui/lib/blockTxs/txHeatMap/TxsHeatMap";
import { TxsGrid } from "./TxsGrid";
import { minMaxLogScale } from "app/helper/minMaxLogScale";

const HIGHLIGHT_THRESHOLD = 80;

interface IGlobalState {
    blockTxsState?: BlockTxsState;
}

export interface IBlockTxsProps {
    txs: ITxLite[];
    latestEthPrice: number | undefined;
    translation: ITranslation;
    locale: string;
    uiStateContainer: IGlobalState;
}

@observer
export class BlockTxs extends React.Component<IBlockTxsProps> {
    constructor(props: IBlockTxsProps) {
        super(props);

        // TODO: encapsulation per module type
        let blockTxsState = this.props.uiStateContainer.blockTxsState;
        if (!blockTxsState) {
            blockTxsState = new BlockTxsStateFactory().create();
            this.props.uiStateContainer.blockTxsState = blockTxsState;
        }
    }

    render() {
        let { translation: tr, txs, locale, uiStateContainer } = this.props;
        let {
            txsGridSortingOptions, txsHighlightFields, txsViewMode
        } = uiStateContainer.blockTxsState as BlockTxsState;

        return <>
            <LayoutRow minWidth={610}>
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.transactions.label")}</Label>
                    <TxCountBox>{txs.length}</TxCountBox>
                </LayoutRowItem>
                { txs.length ?
                <LayoutRowItem>
                    <Label>{tr.get("blockView.content.transactionsHighlight.label")}</Label>
                    <TxHighlightSelector fields={txsHighlightFields} translation={tr} />
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
                    highlightThreshold={HIGHLIGHT_THRESHOLD}
                    highlightDataSelector={txsHighlightFields.getSelectedField().getData}
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

    private renderHeatMapTooltip = (tx: ITxLite) => {
        return <TxTooltipContent
            tx={tx}
            latestEthPrice={this.props.latestEthPrice}
            translation={this.props.translation} locale={this.props.locale}
        />;
    }
}
