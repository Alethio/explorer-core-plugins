import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { EthRenderer } from "@alethio/ui/lib/data/gridRenderer/EthRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { TxLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/tx/TxLinkRenderer";
import { AccountLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/account/AccountLinkRenderer";
import { ITxGridFieldKeys } from "./TxsGrid";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";

export class TxGridFields extends GridFields<ITxDetails> {
    constructor(t: ITranslation, locale: string) {
        super();
        this.fields = [{
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
            label: t.get("general.valueEth"),
            fieldKey: ITxGridFieldKeys.Value,
            type: "number",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.value,
            renderer: new EthRenderer(
                locale,
                f => f.value
            )
        }];
    }
}
