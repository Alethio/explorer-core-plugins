import * as React from "react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

interface ICmCountBoxProps {
}

export const CmCountBox: React.StatelessComponent<ICmCountBoxProps> = ({ children }) => (
    <ValueBox
        colors={(theme: ITheme) => ({
            background: theme.colors.contractColorCode,
            text: theme.colors.cmBoxText
        })}
    >
        { children }
    </ValueBox>
);
