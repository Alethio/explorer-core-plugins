import * as React from "react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

interface IActiveNodesBoxProps {
}

export const ActiveNodesBox: React.StatelessComponent<IActiveNodesBoxProps> = ({ children }) => (
    <ValueBox
        colors={(theme: ITheme) => ({
            background: theme.colors.addressHashBoxBg,
            text: theme.colors.valueBox.primary.text
        })}
    >
        { children }
    </ValueBox>
);
