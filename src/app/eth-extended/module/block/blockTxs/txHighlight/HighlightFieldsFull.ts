import { HighlightFields } from "@alethio/explorer-ui/lib/blockTxs/txHighlight/HighlightFields";
import { HighlightFieldKey } from "./HighlightFieldKey";
import {ITxLiteFull} from "app/shared/data/tx/lite/ITxLiteFull";

export class HighlightFieldsFull extends HighlightFields<ITxLiteFull, HighlightFieldKey> {
    constructor() {
        super();
        this.fields = [{
            key: HighlightFieldKey.Value,
            getLabel: t => t.get("blockView.content.transactionsHighlight.value.label"),
            getData: tx => tx.value
        }, {
            key: HighlightFieldKey.ContractMessageCount,
            getLabel: t => t.get("blockView.content.transactionsHighlight.contractMessageCount.label"),
            getData: tx => tx.contractMsgCount
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
        }, {
            key: HighlightFieldKey.ContractCreationCount,
            getLabel: t => t.get("blockView.content.transactionsHighlight.contractCreationCount.label"),
            getData: tx => tx.contractCreationCount
        }];
        this.setSelectedField(HighlightFieldKey.Value);
    }
}
