import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { UsdValueBox } from "@alethio/ui/lib/data/box/UsdValueBox";
import { ContractIcon } from "@alethio/ui/lib/icon/ContractIcon";
import { ITxLite } from "app/shared/data/tx/lite/ITxLite";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { ITranslation } from "plugin-api/ITranslation";
import { TxType } from "app/shared/data/tx/TxType";
import { weiToEth } from "app/util/wei";
import { TxTooltipContentWrapper } from "@alethio/explorer-ui/lib/blockTxs/TxTooltipContentWrapper";
import {isFullTxLite} from "app/shared/data/tx/lite/isFullTxLite";

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
                <div style={{paddingLeft: 8}}>
                    <Label arrow disabled={tx.value.isZero()}>{translation.get("txTooltip.value.label")}</Label>
                </div>
                <div style={{display: "flex"}}>
                    <EthValueBox variant="smallThin" wei={tx.value} locale={this.props.locale} symbol={ethSymbol} />
                    { this.props.latestEthPrice ?
                    <UsdValueBox variant="smallThin"
                        value={weiToEth(tx.value).multipliedBy(this.props.latestEthPrice).toNumber()}
                        locale={this.props.locale} />
                    : null }
                </div>
            </TxTooltipContentWrapper>
        );
    }
}
