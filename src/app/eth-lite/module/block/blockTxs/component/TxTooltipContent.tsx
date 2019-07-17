import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";
import { TxTooltipContentWrapper } from "@alethio/explorer-ui/lib/blockTxs/TxTooltipContentWrapper";

export interface ITxTooltipContentProps {
    tx: ITxDetails;
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
                <Label>{translation.get("general.to")}</Label>
                <AddressHashBox variant="small">{tx.to}</AddressHashBox>
                <div style={{paddingLeft: 8}}>
                    <Label arrow disabled={tx.value.isZero()}>{translation.get("txTooltip.value.label")}</Label>
                </div>
                <div style={{display: "flex"}}>
                    <EthValueBox variant="smallThin" wei={tx.value} locale={this.props.locale} symbol={ethSymbol} />
                </div>
            </TxTooltipContentWrapper>
        );
    }
}
