import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { EthRenderer } from "@alethio/ui/lib/data/gridRenderer/EthRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { TxType } from "app/shared/data/tx/TxType";
import { TxLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/tx/TxLinkRenderer";
import { AccountLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/account/AccountLinkRenderer";
import { IHighlightFn } from "app/shared/module/block/blockTxs/TxsGrid";
import { TxHighlightRenderer } from "./TxHighlightRenderer";
import { ITxLiteFull } from "app/shared/data/tx/lite/ITxLiteFull";

export enum ITxGridFieldKeys {
    Type = "type",
    Hash = "hash",
    From = "from",
    To = "to",
    Value = "value",
    Fee = "fee"
}

export class TxGridFields extends GridFields<ITxLiteFull> {
    constructor(t: ITranslation, locale: string, ethSymbol: string, highlightFn: IHighlightFn) {
        super();
        this.fields = [{
            label: t.get("general.grid.header.type.label"),
            fieldKey: ITxGridFieldKeys.Type,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => TxType[f.type],
            renderer: new TxHighlightRenderer(t, highlightFn)
        }, {
            label: t.get("general.hash"),
            fieldKey: ITxGridFieldKeys.Hash,
            type: "string",
            isSortable: true,
            selected: true,
            alwaysVisible: true,
            getFieldValue: f => f.hash,
            renderer: new TxLinkRenderer(f => f.hash)
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
            label: t.get("general.valueEth", {"%s": ethSymbol}),
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
            label: t.get("general.feeEth", {"%s": ethSymbol}),
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
