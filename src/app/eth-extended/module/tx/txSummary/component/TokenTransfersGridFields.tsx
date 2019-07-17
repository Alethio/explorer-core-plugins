import { ITranslation } from "plugin-api/ITranslation";
import { GridFields } from "@alethio/ui/lib/control/grid/state/GridFields";
import { ITokenTransfer } from "app/eth-extended/data/token/transfer/ITokenTransfer";
import { NumberRenderer } from "@alethio/ui/lib/data/gridRenderer/NumberRenderer";
import { AccountLinkRenderer } from "@alethio/explorer-ui/lib/grid/dataRenderer/account/AccountLinkRenderer";
import { EthRenderer } from "@alethio/ui/lib/data/gridRenderer/EthRenderer";
import { BigNumber } from "app/util/BigNumber";

enum ITokenTransfersGridFieldKeys {
    Address = "address",
    Name = "name",
    Symbol = "symbol",
    From = "from",
    To = "to",
    Value = "value",
    Fee = "fee",
    GasUsed = "gasUsed"
}

export class TokenTransfersGridFields extends GridFields<ITokenTransfer> {
    constructor(t: ITranslation, locale: string, ethSymbol: string) {
        super();
        this.fields = [{
            label: t.get("txView.content.txSummary.txTokenTransfersGrid.header.address.label"),
            fieldKey: ITokenTransfersGridFieldKeys.Address,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.address,
            renderer: new AccountLinkRenderer(f => f.address)
        }, {
            label: t.get("txView.content.txSummary.txTokenTransfersGrid.header.name.label"),
            fieldKey: ITokenTransfersGridFieldKeys.Name,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.name || t.get("txView.content.erc20.unknownToken.label")
        }, {
            label: t.get("txView.content.txSummary.txTokenTransfersGrid.header.symbol.label"),
            fieldKey: ITokenTransfersGridFieldKeys.Symbol,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.symbol || "???"
        }, {
            label: t.get("general.from"),
            fieldKey: ITokenTransfersGridFieldKeys.From,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.from,
            renderer: new AccountLinkRenderer(f => f.from)
        }, {
            label: t.get("general.to"),
            fieldKey: ITokenTransfersGridFieldKeys.To,
            type: "string",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.to,
            renderer: new AccountLinkRenderer(f => f.to)
        }, {
            label: t.get("txView.content.txSummary.txTokenTransfersGrid.header.value.label"),
            fieldKey: ITokenTransfersGridFieldKeys.Value,
            type: "number",
            isSortable: true,
            selected: true,
            getFieldValue: f => f.value.shiftedBy(-f.decimals).integerValue(BigNumber.ROUND_FLOOR),
            renderer: new NumberRenderer(
                locale,
                f => f.value.shiftedBy(-f.decimals).integerValue(BigNumber.ROUND_FLOOR)
            )
        }, {
            label: t.get("general.feeEth", { "%s": ethSymbol }),
            fieldKey: ITokenTransfersGridFieldKeys.Fee,
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
            fieldKey: ITokenTransfersGridFieldKeys.GasUsed,
            type: "number",
            isSortable: true,
            selected: false,
            getFieldValue: f => f.gasUsed,
            renderer: new NumberRenderer(
                locale,
                f => f.gasUsed
            )
        }];
    }
}
