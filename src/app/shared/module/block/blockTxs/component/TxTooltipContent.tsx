import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { EthValue } from "@alethio/ui/lib/data/EthValue";
import { ContractIcon } from "@alethio/ui/lib/icon/ContractIcon";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { ITranslation } from "plugin-api/ITranslation";
import { TxType } from "app/shared/data/tx/TxType";
import { weiToEth } from "app/util/wei";
import { TxTooltipContentWrapper } from "@alethio/explorer-ui/lib/blockTxs/TxTooltipContentWrapper";
import { isFullTxLite } from "app/shared/data/tx/lite/isFullTxLite";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

export interface ITxTooltipContentProps {
    tx: ITxLite;
    latestEthPrice: number | undefined;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
}

export class TxTooltipContent extends React.Component<ITxTooltipContentProps> {
    render() {
        let { tx, translation, ethSymbol } = this.props;
        return (
            <TxTooltipContentWrapper>
                <TxHashBox variant="small">{tx.hash}</TxHashBox>
                <Label>{translation.get("general.from")}</Label>
                <AddressHashBox variant="small">{tx.from}</AddressHashBox>
                {isFullTxLite(tx) && tx.type === TxType.Create ?
                <>
                <Label>{translation.get("general.creates")}</Label>
                <AddressHashBox variant="small" Icon={ContractIcon}>{tx.to}</AddressHashBox>
                </>
                :
                <>
                <Label>{translation.get("general.to")}</Label>
                <AddressHashBox variant="small">{tx.to}</AddressHashBox>
                </>
                }
                <ValueBox
                    colors={(theme: ITheme) => ({
                        background: theme.colors.blockColorCode,
                        text: theme.colors.blockBoxText
                    })} variant="small">
                    <EthValue wei={tx.value} locale={this.props.locale}
                        decimals={4} showSymbol={true} symbol={ethSymbol} />
                    { this.props.latestEthPrice ?
                    <> =
                    {" " + this.formatUsd(weiToEth(tx.value).multipliedBy(this.props.latestEthPrice).toNumber(),
                        this.props.locale)}
                    </>
                    : null }
                </ValueBox>
            </TxTooltipContentWrapper>
        );
    }
    private formatUsd(value: number, locale?: string) {
        return value.toLocaleString(locale, {
            currency: "USD",
            currencyDisplay: "symbol",
            style: "currency"
        });
    }
}
