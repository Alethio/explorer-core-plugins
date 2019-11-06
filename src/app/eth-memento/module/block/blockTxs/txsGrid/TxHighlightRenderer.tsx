import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { TxHighlight } from "./TxHighlight";
import {ITxLiteBase} from "app/shared/data/tx/lite/ITxLiteBase";
import {Hash} from "@alethio/ui/lib/data/Hash";
import {GridLink} from "@alethio/explorer-ui/src/grid/GridLink";

export class TxHighlightRenderer implements IGridFieldRenderer<ITxLiteBase> {
    constructor(
        private highlight: (f: ITxLite) => boolean
    ) {
    }

    render(f: ITxLiteBase) {
        return (
            <TxHighlight highlight={this.highlight(f)}>
                <GridLink to={`page://aleth.io/tx?txHash=${f.hash}`} >
                    <Hash>{ f.hash }</Hash>
                </GridLink>
            </TxHighlight>
        );
    }
}
