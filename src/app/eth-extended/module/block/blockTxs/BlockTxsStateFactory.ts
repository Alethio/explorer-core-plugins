import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { BlockTxsState } from "./BlockTxsState";
import { TxsViewMode } from "@alethio/explorer-ui/lib/blockTxs/TxsViewMode";
import { HighlightFieldsFull } from "app/eth-extended/module/block/blockTxs/txHighlight/HighlightFieldsFull";

export class BlockTxsStateFactory {
    create() {
        return new BlockTxsState(
            new TxsViewMode(),
            new HighlightFieldsFull(),
            new GridSortingOptions()
        );
    }
}
