import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { ContractIcon } from "@alethio/ui/lib/icon/ContractIcon";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { ITranslation } from "plugin-api/ITranslation";
import { TxType } from "app/shared/data/tx/TxType";
import { TxTooltipContentWrapper } from "@alethio/explorer-ui/lib/blockTxs/TxTooltipContentWrapper";
import { isFullTxLite } from "app/shared/data/tx/lite/isFullTxLite";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { EthUsdValueBox } from "@alethio/explorer-ui/lib/box/block/EthUsdValueBox";

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
                    <EthUsdValueBox
                        variant="small"
                        locale={this.props.locale}
                        symbol={ethSymbol}
                        decimals={4}
                        wei={tx.value}
                        latestEthPrice={this.props.latestEthPrice}
                        colors={(theme: ITheme) => ({
                            background: theme.colors.blockColorCode,
                            text: theme.colors.blockBoxText
                        })}
                    />
            </TxTooltipContentWrapper>
        );
    }
}
