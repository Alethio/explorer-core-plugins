import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { ITranslation } from "plugin-api/ITranslation";
import { ExternalLink } from "plugin-api/component/ExternalLink";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { BriefcaseIcon } from "@alethio/ui/lib/icon/BriefcaseIcon";

interface IAlethioCompanyProps {
    translation: ITranslation;
}

export const alethioCompanyModule: (alethioCompanyUrl: string) => IModuleDef<IAlethioCompanyProps, {}> =
(alethioCompanyUrl) => ({
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => (props) => (
        <ToolbarItem title={props.translation.get("toolbar.company.label")}>
            <ExternalLink href={alethioCompanyUrl} rel="noopener noreferrer">
                <ToolbarIconButton Icon={BriefcaseIcon} />
            </ExternalLink>
        </ToolbarItem>
    ),
    getContentProps : data => data,
    getHelpComponent: () => ({ translation }) => translation.get("toolbar.company.help") as any
});
