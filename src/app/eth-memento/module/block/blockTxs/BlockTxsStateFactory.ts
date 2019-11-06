import { GridSortingOptions } from "@alethio/ui/lib/control/grid/state/GridSortingOptions";
import { BlockTxsState } from "./BlockTxsState";
import { TxsViewMode } from "@alethio/explorer-ui/lib/blockTxs/TxsViewMode";
import {HighlightFieldsMemento} from "app/eth-memento/module/block/blockTxs/txHighlight/HighlightFieldsMemento";

export class BlockTxsStateFactory {
    create() {
        return new BlockTxsState(
            new TxsViewMode(),
            new HighlightFieldsMemento(),
            new GridSortingOptions()
        );
    }
}
