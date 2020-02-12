import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { StatusOkIcon } from "@alethio/ui/lib/icon/StatusOkIcon";
import { Tooltip } from "@alethio/ui/lib/overlay/tooltip/Tooltip";
import { ErrorIcon } from "@alethio/ui/lib/icon/ErrorIcon";
import { ITxReceipt } from "app/eth-lite/data/tx/receipt/ITxReceipt";

export interface ITxStatusBoxProps {
    txReceipt: ITxReceipt;
    translation: ITranslation;
}

export class TxStatusBox extends React.Component<ITxStatusBoxProps> {
    render() {
        let { status } = this.props.txReceipt;
        let translation = this.props.translation;

        return (
            <Tooltip placement="right" content={
                !status ?
                    translation.get("txView.content.txStatus.error") :
                    translation.get("txView.content.txStatus.ok")
            }>
                <ValueBox
                    colors={!status ? "error" : "highlight"}
                    Icon={!status ? ErrorIcon : StatusOkIcon}
                    />
            </Tooltip>
        );
    }
}
