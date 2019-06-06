import { ITranslation } from "plugin-api/ITranslation";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { EthRenderer } from "@alethio/ui/lib/data/gridRenderer/EthRenderer";
import { AccountHashRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/account/AccountHashRenderer";
import { TransferDirectionRenderer } from "./txsGrid/TransferDirectionRenderer";
import { TxLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/tx/TxLinkRenderer";
import { ITxLiteByAccountPending } from "../../../../data/tx/lite/byAccount/pending/ITxLiteByAccountPending";

enum ITxsPendingGridFieldKeys {
    Hash = "hash",
    From = "from",
    Direction = "direction",
    To = "to",
    Value = "value"
}

export class TxsPendingGridFields extends GridFields<ITxLiteByAccountPending> {
    constructor(t: ITranslation, locale: string, currentAccountAddress: string) {
        super();
        this.fields = [{
            label: t.get("general.hash"),
            fieldKey: ITxsPendingGridFieldKeys.Hash,
            type: "string",
            isSortable: false,
            selected: true,
            alwaysVisible: true,
            getFieldValue: f => f.hash,
            renderer: new TxLinkRenderer(f => f.hash)
        }, {
            label: t.get("general.from"),
            fieldKey: ITxsPendingGridFieldKeys.From,
            type: "string",
            isSortable: false,
            alwaysVisible: true,
            selected: true,
            getFieldValue: f => f.from,
            renderer: new AccountHashRenderer(
                currentAccountAddress,
                f => f.from
            )
        }, {
            label: "",
            fieldKey: ITxsPendingGridFieldKeys.Direction,
            type: "string",
            isSortable: false,
            alwaysVisible: true,
            selected: true,
            getFieldValue: f => "",
            renderer: new TransferDirectionRenderer(currentAccountAddress, t)
        }, {
            label: t.get("general.to"),
            fieldKey: ITxsPendingGridFieldKeys.To,
            type: "string",
            isSortable: false,
            alwaysVisible: true,
            selected: true,
            getFieldValue: f => f.to,
            renderer: new AccountHashRenderer(
                currentAccountAddress,
                f => f.to
            )
        }, {
            label: t.get("general.valueEth"),
            fieldKey: ITxsPendingGridFieldKeys.Value,
            type: "number",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.value,
            renderer: new EthRenderer(
                locale,
                f => f.value
            )
        }];
    }
}
