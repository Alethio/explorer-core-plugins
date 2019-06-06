import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { ITxLite } from "app/eth-extended/data/tx/ITxLite";
import { TxsViewMode } from "@alethio/explorer-ui/lib/blockTxs/TxsViewMode";
import { HighlightFields } from "@alethio/explorer-ui/lib/blockTxs/txHighlight/HighlightFields";
import { HighlightFieldKey } from "./txHighlight/HighlightFieldKey";

export class BlockTxsState {
    constructor(
        public txsViewMode: TxsViewMode,
        public txsHighlightFields: HighlightFields<ITxLite, HighlightFieldKey>,
        public txsGridSortingOptions: GridSortingOptions
    ) {

    }
}
