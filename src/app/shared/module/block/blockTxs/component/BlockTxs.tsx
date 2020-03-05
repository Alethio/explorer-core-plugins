import React from "react";
import { observer } from "mobx-react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { Spacer } from "@alethio/ui/lib/layout/Spacer";
import { TxCountBox } from "@alethio/explorer-ui/lib/box/block/TxCountBox";
import { ITranslation } from "plugin-api/ITranslation";
import { TxHighlightSelector } from "app/shared/module/block/blockTxs/txHighlight/TxHighlightSelector";
import { ViewSelectorBox } from "@alethio/explorer-ui/lib/blockTxs/ViewSelectorBox";
import {
    BlockTxsStateFactory as ExtendedBlockTxsStateFactory
} from "app/eth-extended/module/block/blockTxs/BlockTxsStateFactory";
import {
    BlockTxsStateFactory as MementoBlockTxsStateFactory
} from "app/eth-memento/module/block/blockTxs/BlockTxsStateFactory";
import { BlockTxsState } from "app/eth-extended/module/block/blockTxs/BlockTxsState";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { TxTooltipContent } from "./TxTooltipContent";
import { TxsHeatMap } from "@alethio/explorer-ui/lib/blockTxs/txHeatMap/TxsHeatMap";
import { TxsGrid } from "app/shared/module/block/blockTxs/TxsGrid";
import { minMaxLogScale } from "app/helper/minMaxLogScale";
import { isFullTxLite } from "app/shared/data/tx/lite/isFullTxLite";

const HIGHLIGHT_THRESHOLD = 80;

interface IGlobalState {
    blockTxsState?: BlockTxsState;
}

export interface IBlockTxsProps {
    txs: ITxLite[];
    latestEthPrice: number | undefined;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    uiStateContainer: IGlobalState;
}

@observer
export class BlockTxs extends React.Component<IBlockTxsProps> {
    constructor(props: IBlockTxsProps) {
        super(props);

        // TODO: encapsulation per module type
        let blockTxsState = this.props.uiStateContainer.blockTxsState;
        if (!blockTxsState) {
            if (this.props.txs.length && isFullTxLite(this.props.txs[0])) {
                blockTxsState = new ExtendedBlockTxsStateFactory().create();
            } else {
                blockTxsState = new MementoBlockTxsStateFactory().create();
            }
            this.props.uiStateContainer.blockTxsState = blockTxsState;
        }
    }

    render() {
        let { translation: tr, txs, locale, uiStateContainer, ethSymbol } = this.props;
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
                    <Label>{tr.get("blockView.content.transactionsStyle.label")}</Label>
                    <ViewSelectorBox txsViewMode={txsViewMode} />
                    <Label>{tr.get("blockView.content.transactionsViewTip.label")}</Label>
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
                    ethSymbol={ethSymbol}
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
            translation={this.props.translation}
            locale={this.props.locale}
            ethSymbol={this.props.ethSymbol}
        />;
    }
}
