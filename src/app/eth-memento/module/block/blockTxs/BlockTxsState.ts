import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { TxsViewMode } from "@alethio/explorer-ui/lib/blockTxs/TxsViewMode";
import { HighlightFields } from "app/shared/module/block/blockTxs/txHighlight/HighlightFields";
import { HighlightFieldKey } from "./txHighlight/HighlightFieldKey";

export class BlockTxsState {
    constructor(
        public txsViewMode: TxsViewMode,
        public txsHighlightFields: HighlightFields<ITxLite, HighlightFieldKey>,
        public txsGridSortingOptions: GridSortingOptions
    ) {

    }
}
