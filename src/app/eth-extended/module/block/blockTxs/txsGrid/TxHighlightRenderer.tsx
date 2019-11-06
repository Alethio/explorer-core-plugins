import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { TxType } from "app/shared/data/tx/TxType";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { TxHighlight } from "app/shared/module/block/blockTxs/txsGrid/TxHighlight";
import { ITxLiteFull } from "app/shared/data/tx/lite/ITxLiteFull";

export class TxHighlightRenderer implements IGridFieldRenderer<ITxLiteFull> {
    constructor(
        private translation: ITranslation,
        private highlight: (f: ITxLite) => boolean
    ) {
    }

    render(f: ITxLiteFull) {
        return (
            <TxHighlight highlight={this.highlight(f)}>
                { this.translation.get("general.tx.type." + TxType[f.type]) }
            </TxHighlight>
        );
    }
}
