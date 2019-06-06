import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { TxsViewMode } from "@alethio/explorer-ui/lib/blockTxs/TxsViewMode";
import { HighlightFields } from "@alethio/explorer-ui/lib/blockTxs/txHighlight/HighlightFields";
import { HighlightFieldKey } from "./txHighlight/HighlightFieldKey";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";

export class BlockTxsState {
    constructor(
        public txsViewMode: TxsViewMode,
        public txsHighlightFields: HighlightFields<ITxDetails, HighlightFieldKey>,
        public txsGridSortingOptions: GridSortingOptions
    ) {

    }
}
