import { ITranslation } from "plugin-api/ITranslation";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { CmTypeExtraRenderer } from "app/eth-extended/component/grid/cm/CmTypeExtraRenderer";
import { NumberRenderer } from "@alethio/ui/lib/data/gridRenderer/NumberRenderer";
import { EthRenderer } from "@alethio/ui/lib/data/gridRenderer/EthRenderer";
import { CmLinkRenderer } from "app/eth-extended/component/grid/cm/CmLinkRenderer";
import { TransferDirectionRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/tx/TransferDirectionRenderer";
import { AccountHashRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/account/AccountHashRenderer";
import { BlockLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/block/BlockLinkRenderer";
import { DateTimeRenderer } from "@alethio/ui/lib/data/gridRenderer/DateTimeRenderer";
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
    BlockNo = "blockNumber",
    BlockTime = "blockTime",
    Depth = "depth",
    TriggeredBy = "triggeredBy"
}

export class CmGridFields extends GridFields<ICmLite> {
    constructor(t: ITranslation, locale: string, ethSymbol: string, contextAccountAddress: string) {
        super();
        this.fields = [{
            label: t.get("general.grid.header.type.label"),
            fieldKey: ICmGridFieldKeys.Type,
            type: "string",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.type,
            renderer: new CmTypeExtraRenderer(t)
        }, {
            label: t.get("cmView.content.id.label"),
            fieldKey: ICmGridFieldKeys.Id,
            type: "string",
            isSortable: false,
            selected: true,
            alwaysVisible: true,
            getFieldValue: f => f.originatorTxHash + "_" + f.txValidationIndex,
            renderer: new CmLinkRenderer()
        }, {
            label: t.get("general.from"),
            fieldKey: ICmGridFieldKeys.From,
            type: "string",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.from,
            renderer: new AccountHashRenderer(
                contextAccountAddress,
                f => f.from
            )
        }, {
            label: "",
            fieldKey: ICmGridFieldKeys.Direction,
            type: "string",
            isSortable: false,
            alwaysVisible: true,
            selected: true,
            getFieldValue: f => "",
            renderer: new TransferDirectionRenderer(contextAccountAddress, t)
        }, {
            label: t.get("general.to"),
            fieldKey: ICmGridFieldKeys.To,
            type: "string",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.to,
            renderer: new AccountHashRenderer(
                contextAccountAddress,
                f => f.to
            )
        }, {
            label: t.get("general.valueEth", { "%s": ethSymbol }),
            fieldKey: ICmGridFieldKeys.Value,
            type: "number",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.value,
            renderer: new EthRenderer(
                locale,
                f => f.value
            )
        }, {
            label: t.get("general.feeEth", { "%s": ethSymbol }),
            fieldKey: ICmGridFieldKeys.Fee,
            type: "number",
            isSortable: false,
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
            isSortable: false,
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
            isSortable: false,
            selected: false,
            getFieldValue: f => f.gasLimit,
            renderer: new NumberRenderer(
                locale,
                f => f.gasLimit
            )
        }, {
            label: t.get("accountView.content.accountSummary.transactions.blockNumber.label"),
            fieldKey: ICmGridFieldKeys.BlockNo,
            type: "number",
            isSortable: false,
            selected: false,
            getFieldValue: f => f.block.id,
            renderer: new BlockLinkRenderer(
                locale,
                f => f.block.id
            )
        }, {
            label: t.get("accountView.content.accountSummary.transactions.blockTime.label"),
            fieldKey: ICmGridFieldKeys.BlockTime,
            type: "string",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.block.creationTime,
            renderer: new DateTimeRenderer(
                locale,
                f => f.block.creationTime
            )
        }, {
            label: t.get("cmView.content.depth.label"),
            fieldKey: ICmGridFieldKeys.Depth,
            type: "number",
            isSortable: false,
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
