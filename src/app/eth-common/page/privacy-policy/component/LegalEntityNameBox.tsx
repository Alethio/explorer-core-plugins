import * as React from "react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

interface ILegalEntityNameBoxProps {
}

export const LegalEntityNameBox: React.StatelessComponent<ILegalEntityNameBoxProps> = ({ children }) => (
    <ValueBox
        colors={(theme: ITheme) => ({
            background: theme.colors.privacyNameBg,
            text: theme.colors.privacyNameText
        })}
    >
        { children }
    </ValueBox>
);
