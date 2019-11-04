import { ITxLite } from "app/eth-memento/data/tx/ITxLite";
import { HighlightFields } from "@alethio/explorer-ui/lib/blockTxs/txHighlight/HighlightFields";
import { HighlightFieldKey } from "./HighlightFieldKey";

export class HighlightFieldsFull extends HighlightFields<ITxLite, HighlightFieldKey> {
    constructor() {
        super();
        this.fields = [{
            key: HighlightFieldKey.Value,
            getLabel: t => t.get("blockView.content.transactionsHighlight.value.label"),
            getData: tx => tx.value
        }, {
            key: HighlightFieldKey.GasUsed,
            getLabel: t => t.get("general.gasUsed"),
            getData: tx => tx.gasUsed
        }, {
            key: HighlightFieldKey.GasPrice,
            getLabel: t => t.get("general.gasPrice"),
            getData: tx => tx.gasPrice
        }, {
            key: HighlightFieldKey.GasLimit,
            getLabel: t => t.get("general.gasLimit"),
            getData: tx => tx.gasLimit
        }];
        this.setSelectedField(HighlightFieldKey.Value);
    }
}
