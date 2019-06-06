import * as React from "react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { withTheme } from "@alethio/explorer-ui/lib/styled-components";
import { ITranslation } from "plugin-api/ITranslation";
import { StatusSomeConfirmedIcon } from "@alethio/ui/lib/icon/StatusSomeConfirmedIcon";
import { StatusNotConfirmedIcon } from "@alethio/ui/lib/icon/StatusNotConfirmedIcon";
import { StatusConfirmedIcon } from "@alethio/ui/lib/icon/StatusConfirmedIcon";

export interface IConfirmationsBoxProps {
    theme?: ITheme;
    translation: ITranslation;
    locale: string | undefined;
    confirmations: number;
    isConfirmed: boolean;
}

const $ConfirmationsBox: React.StatelessComponent<IConfirmationsBoxProps> = ({
    translation, confirmations, isConfirmed
}) => {
    let tooltipText = isConfirmed ?
        translation.get("blockView.content.blockConfirmations.confirmed") :
        translation.get("blockView.content.blockConfirmations.text", {"%d": confirmations});

    return <ValueBox colors={isConfirmed ? "highlight" : "warn"}
        iconPlacement="left"
        Icon={isConfirmed ?
            StatusConfirmedIcon :
            confirmations ? StatusSomeConfirmedIcon : StatusNotConfirmedIcon}
    >
        { tooltipText }
    </ValueBox>;
};

export const ConfirmationsBox = withTheme($ConfirmationsBox);
