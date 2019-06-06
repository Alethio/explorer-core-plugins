import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { StatusOkIcon } from "@alethio/ui/lib/icon/StatusOkIcon";
import { TooltipRegular } from "@alethio/ui/lib/overlay/tooltip/TooltipRegular";
import { ErrorIcon } from "@alethio/ui/lib/icon/ErrorIcon";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";

export interface ICmStatusProps {
    cm: ICmDetails;
    translation: ITranslation;
}

export class CmStatus extends React.Component<ICmStatusProps> {
    render() {
        let cm = this.props.cm;
        let translation = this.props.translation;

        return (
            <TooltipRegular placement="right" content={
                cm.error ?
                    translation.get("txView.content.txStatus.error") :
                    translation.get("txView.content.txStatus.ok")
            }>
                <ValueBox
                    colors={cm.error ? "error" : "highlight"}
                    Icon={cm.error ? ErrorIcon : StatusOkIcon}
                    />
            </TooltipRegular>
        );
    }
}
