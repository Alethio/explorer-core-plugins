import * as React from "react";
import { IValueBoxProps } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { HashLinkValueBox } from "@alethio/explorer-ui/lib/box/HashLinkValueBox";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

interface ICmIdBoxProps {
    variant?: IValueBoxProps["variant"];
    txHash: string;
    txValidationIndex: number;
    noLink?: boolean;
    noTooltip?: boolean;
    children?: never;
}

export const CmIdBox: React.StatelessComponent<ICmIdBoxProps> = ({
    variant, noLink, noTooltip, txHash, txValidationIndex
}) => (
    <HashLinkValueBox
        colors={(theme: ITheme) => ({
            background: theme.colors.contractColorCode,
            text: theme.colors.cmBoxText
        })}
        variant={variant}
        linkTo={!noLink ? `page://aleth.io/cm?txHash=${txHash}&validationIndex=${txValidationIndex}` : void 0}
        noTooltip={noTooltip}
    >
        { `${txHash}_${txValidationIndex}` }
    </HashLinkValueBox>
);
