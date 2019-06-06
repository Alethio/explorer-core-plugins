import { ITranslation } from "plugin-api/ITranslation";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { CmTypeExtraRenderer } from "app/eth-extended/component/grid/cm/CmTypeExtraRenderer";
import { NumberRenderer } from "@alethio/ui/lib/data/gridRenderer/NumberRenderer";
import { EthRenderer } from "@alethio/ui/lib/data/gridRenderer/EthRenderer";
import { CmLinkRenderer } from "app/eth-extended/component/grid/cm/CmLinkRenderer";
import { AccountHashRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/account/AccountHashRenderer";
import { CmParentLinkRenderer } from "app/eth-extended/component/grid/cm/CmParentLinkRenderer";

enum ICmGridFieldKeys {
    Type = "type",
    Id = "id",
    From = "from",
    Direction = "direction",
    To = "to",
    Value = "value",
    Fee = "fee",
    GasUsed = "gasUsed",
    GasLimit = "gasLimit",
    Depth = "depth",
    TriggeredBy = "triggeredBy"
}

export class CmGridFields extends GridFields<ICmLite> {
    constructor(t: ITranslation, locale: string) {
        super();
        this.fields = [{
            label: t.get("general.grid.header.type.label"),
            fieldKey: ICmGridFieldKeys.Type,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.type,
            renderer: new CmTypeExtraRenderer(t)
        }, {
            label: t.get("cmView.content.id.label"),
            fieldKey: ICmGridFieldKeys.Id,
            type: "string",
            isSortable: true,
            selected: true,
            alwaysVisible: true,
            getFieldValue: f => f.originatorTxHash + "_" + f.txValidationIndex,
            renderer: new CmLinkRenderer()
        }, {
            label: t.get("general.from"),
            fieldKey: ICmGridFieldKeys.From,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.from,
            renderer: new AccountHashRenderer(void 0, f => f.from)
        }, {
            label: t.get("general.to"),
            fieldKey: ICmGridFieldKeys.To,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.to,
            renderer: new AccountHashRenderer(void 0, f => f.to)
        }, {
            label: t.get("general.valueEth"),
            fieldKey: ICmGridFieldKeys.Value,
            type: "number",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.value,
            renderer: new EthRenderer(
                locale,
                f => f.value
            )
        }, {
            label: t.get("general.feeEth"),
            fieldKey: ICmGridFieldKeys.Fee,
            type: "number",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.gasUsed.multipliedBy(f.gasPrice),
            renderer: new EthRenderer(
                locale,
                f => f.gasUsed.multipliedBy(f.gasPrice),
                { decimals: 9 }
            )
        }, {
            label: t.get("general.gasUsed"),
            fieldKey: ICmGridFieldKeys.GasUsed,
            type: "number",
            isSortable: true,
            selected: false,
            getFieldValue: f => f.gasUsed,
            renderer: new NumberRenderer(
                locale,
                f => f.gasUsed
            )
        }, {
            label: t.get("general.gasLimit"),
            fieldKey: ICmGridFieldKeys.GasLimit,
            type: "number",
            isSortable: true,
            selected: false,
            getFieldValue: f => f.gasLimit,
            renderer: new NumberRenderer(
                locale,
                f => f.gasLimit
            )
        }, {
            label: t.get("cmView.content.depth.label"),
            fieldKey: ICmGridFieldKeys.Depth,
            type: "number",
            isSortable: true,
            selected: false,
            getFieldValue: f => f.depth,
            renderer: new NumberRenderer(
                locale,
                f => f.depth
            )
        }, {
            label: t.get("cmView.content.triggeredBy.label"),
            fieldKey: ICmGridFieldKeys.TriggeredBy,
            type: "string",
            isSortable: false,
            selected: false,
            getFieldValue: f => "",
            renderer: new CmParentLinkRenderer()
        }];
    }
}
