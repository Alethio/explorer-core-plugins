import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { TxType } from "app/eth-extended/data/tx/TxType";
import { ITxLite } from "app/eth-extended/data/tx/ITxLite";
import { TxHighlight } from "./TxHighlight";

export class TxHighlightRenderer implements IGridFieldRenderer<ITxLite> {
    constructor(
        private translation: ITranslation,
        private highlight: (f: ITxLite) => boolean
    ) {
    }

    render(f: ITxLite) {
        return (
            <TxHighlight highlight={this.highlight(f)}>
                { this.translation.get("general.tx.type." + TxType[f.type]) }
            </TxHighlight>
        );
    }
}
