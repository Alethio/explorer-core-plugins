import { HighlightFields } from "app/shared/module/block/blockTxs/txHighlight/HighlightFields";
import { HighlightFieldKey } from "./HighlightFieldKey";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";

export class HighlightFieldsFull extends HighlightFields<ITxDetails, HighlightFieldKey> {
    constructor() {
        super();
        this.fields = [{
            key: HighlightFieldKey.Value,
            getLabel: t => t.get("blockView.content.transactionsHighlight.value.label"),
            getData: tx => tx.value
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
