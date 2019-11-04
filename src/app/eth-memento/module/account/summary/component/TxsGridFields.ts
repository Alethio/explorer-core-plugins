import { ITranslation } from "plugin-api/ITranslation";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { EthRenderer } from "@alethio/ui/lib/data/gridRenderer/EthRenderer";
import { AccountHashRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/account/AccountHashRenderer";
import { BlockLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/block/BlockLinkRenderer";
import { DateTimeRenderer } from "@alethio/ui/lib/data/gridRenderer/DateTimeRenderer";
import { TransferDirectionRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/tx/TransferDirectionRenderer";
import { ITxLiteByAccount } from "app/eth-memento/data/tx/byAccount/ITxLiteByAccount";
import { TxLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/tx/TxLinkRenderer";
import { TxLinkWithStatusRenderer } from "app/eth-memento/module/account/summary/component/txsGrid/TxLinkWithStatusRenderer";

enum ITxsGridFieldKeys {
    Hash = "hash",
    From = "from",
    Direction = "direction",
    To = "to",
    Value = "value",
    Fee = "fee",
    BlockNo = "blockNumber",
    BlockTime = "blockTime"
}

export class TxsGridFields extends GridFields<ITxLiteByAccount> {
    constructor(t: ITranslation, locale: string, ethSymbol: string, currentAccountAddress: string) {
        super();
        this.fields = [{
            label: t.get("general.hash"),
            fieldKey: ITxsGridFieldKeys.Hash,
            type: "string",
            isSortable: false,
            selected: true,
            alwaysVisible: true,
            getFieldValue: f => f.hash,
            renderer: new TxLinkWithStatusRenderer(
                new TxLinkRenderer(f => f.hash),
                t
            )
        }, {
            label: t.get("general.from"),
            fieldKey: ITxsGridFieldKeys.From,
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
            fieldKey: ITxsGridFieldKeys.Direction,
            type: "string",
            isSortable: false,
            alwaysVisible: true,
            selected: true,
            getFieldValue: f => "",
            renderer: new TransferDirectionRenderer(currentAccountAddress, t)
        }, {
            label: t.get("general.to"),
            fieldKey: ITxsGridFieldKeys.To,
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
            label: t.get("general.valueEth", { "%s": ethSymbol }),
            fieldKey: ITxsGridFieldKeys.Value,
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
            fieldKey: ITxsGridFieldKeys.Fee,
            type: "number",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.gasUsed.multipliedBy(f.gasPrice),
            renderer: new EthRenderer(
                locale,
                f => f.gasUsed.multipliedBy(f.gasPrice)
            )
        }, {
            label: t.get("accountView.content.accountSummary.transactions.blockNumber.label"),
            fieldKey: ITxsGridFieldKeys.BlockNo,
            type: "number",
            isSortable: false,
            selected: false,
            getFieldValue: f => f.block.id,
            renderer: new BlockLinkRenderer(
                locale,
                f => f.block.id
            )
        },
        {
            label: t.get("accountView.content.accountSummary.transactions.blockTime.label"),
            fieldKey: ITxsGridFieldKeys.BlockTime,
            type: "string",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.block.creationTime,
            renderer: new DateTimeRenderer(
                locale,
                f => f.block.creationTime
            )
        }];
    }
}
