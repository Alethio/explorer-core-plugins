import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { StatusOkIcon } from "@alethio/ui/lib/icon/StatusOkIcon";
import { TooltipRegular } from "@alethio/ui/lib/overlay/tooltip/TooltipRegular";
import { StatusNotConfirmedIcon } from "@alethio/ui/lib/icon/StatusNotConfirmedIcon";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { isPendingTxDetails } from "app/eth-extended/data/tx/details/isPendingTxDetails";
import { ErrorIcon } from "@alethio/ui/lib/icon/ErrorIcon";

export interface ITxStatusProps {
    tx: ITxDetails;
    translation: ITranslation;
}

export class TxStatus extends React.Component<ITxStatusProps> {
    render() {
        let tx = this.props.tx;
        let translation = this.props.translation;

        return (
            <TooltipRegular placement="right" content={
                !isPendingTxDetails(tx) ?
                    (tx.error ?
                        translation.get("txView.content.txStatus.error") :
                        translation.get("txView.content.txStatus.ok")) :
                    translation.get("txView.content.txStatus.pending")
            }>
                <ValueBox
                    colors={!isPendingTxDetails(tx) ? (tx.error ? "error" : "highlight") : "warn"}
                    Icon={!isPendingTxDetails(tx) ?
                        (tx.error ? ErrorIcon : StatusOkIcon) :
                        StatusNotConfirmedIcon }
                    />
            </TooltipRegular>
        );
    }
}
