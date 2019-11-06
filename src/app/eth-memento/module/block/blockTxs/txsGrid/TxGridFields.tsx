import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { EthRenderer } from "@alethio/ui/lib/data/gridRenderer/EthRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { AccountLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/account/AccountLinkRenderer";
import { IHighlightFn, ITxGridFieldKeys } from "../TxsGridMemento";
import { ITxLiteBase } from "app/shared/data/tx/lite/ITxLiteBase";
import { TxHighlightRenderer } from "app/eth-memento/module/block/blockTxs/txsGrid/TxHighlightRenderer";

export class TxGridFields extends GridFields<ITxLiteBase> {
    constructor(t: ITranslation, locale: string, ethSymbol: string, highlightFn: IHighlightFn) {
        super();
        this.fields = [{
            label: t.get("general.hash"),
            fieldKey: ITxGridFieldKeys.Hash,
            type: "string",
            isSortable: true,
            selected: true,
            alwaysVisible: true,
            getFieldValue: f => f.hash,
            renderer: new TxHighlightRenderer(highlightFn)
        }, {
            label: t.get("general.from"),
            fieldKey: ITxGridFieldKeys.From,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.from,
            renderer: new AccountLinkRenderer(f => f.from)
        }, {
            label: t.get("general.to"),
            fieldKey: ITxGridFieldKeys.To,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.to,
            renderer: new AccountLinkRenderer(f => f.to)
        }, {
            label: t.get("general.valueEth", { "%s": ethSymbol }),
            fieldKey: ITxGridFieldKeys.Value,
            type: "number",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.value,
            renderer: new EthRenderer(
                locale,
                f => f.value
            )
        }, {
            label: t.get("general.feeEth", { "%s": ethSymbol }),
            fieldKey: ITxGridFieldKeys.Fee,
            type: "number",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.gasUsed.multipliedBy(f.gasPrice),
            renderer: new EthRenderer(
                locale,
                f => f.gasUsed.multipliedBy(f.gasPrice)
            )
        }];
    }
}
