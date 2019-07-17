import { ITranslation } from "plugin-api/ITranslation";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { EthRenderer } from "@alethio/ui/lib/data/gridRenderer/EthRenderer";
import { AccountHashRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/account/AccountHashRenderer";
import { BlockLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/block/BlockLinkRenderer";
import { DateTimeRenderer } from "@alethio/ui/lib/data/gridRenderer/DateTimeRenderer";
import { TxTypeExtraRenderer } from "./txsGrid/TxTypeExtraRenderer";
import { TransferDirectionRenderer } from "./txsGrid/TransferDirectionRenderer";
import { ITxLiteByAccountMined } from "app/eth-extended/data/tx/lite/byAccount/mined/ITxLiteByAccountMined";
import { TxLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/tx/TxLinkRenderer";

enum ITxsMinedGridFieldKeys {
    Type = "type",
    Hash = "hash",
    From = "from",
    Direction = "direction",
    To = "to",
    Value = "value",
    Fee = "fee",
    BlockNo = "blockNumber",
    BlockTime = "blockTime"
}

export class TxsMinedGridFields extends GridFields<ITxLiteByAccountMined> {
    constructor(t: ITranslation, locale: string, ethSymbol: string, currentAccountAddress: string) {
        super();
        this.fields = [{
            label: t.get("general.grid.header.type.label"),
            fieldKey: ITxsMinedGridFieldKeys.Type,
            type: "string",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.type,
            renderer: new TxTypeExtraRenderer(t)
        }, {
            label: t.get("general.hash"),
            fieldKey: ITxsMinedGridFieldKeys.Hash,
            type: "string",
            isSortable: false,
            selected: true,
            alwaysVisible: true,
            getFieldValue: f => f.hash,
            renderer: new TxLinkRenderer(f => f.hash)
        }, {
            label: t.get("general.from"),
            fieldKey: ITxsMinedGridFieldKeys.From,
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
            fieldKey: ITxsMinedGridFieldKeys.Direction,
            type: "string",
            isSortable: false,
            alwaysVisible: true,
            selected: true,
            getFieldValue: f => "",
            renderer: new TransferDirectionRenderer(currentAccountAddress, t)
        }, {
            label: t.get("general.to"),
            fieldKey: ITxsMinedGridFieldKeys.To,
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
            fieldKey: ITxsMinedGridFieldKeys.Value,
            type: "number",
            isSortable: false,
            selected: true,
            getFieldValue: f => f.value,
            renderer: new EthRenderer(
                locale,
                f => f.value
            )
        }, {
            label: t.get("general.feeEth"),
            fieldKey: ITxsMinedGridFieldKeys.Fee,
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
            fieldKey: ITxsMinedGridFieldKeys.BlockNo,
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
            fieldKey: ITxsMinedGridFieldKeys.BlockTime,
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
