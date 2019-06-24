import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { MenuItem } from "plugin-api/component/topbar/MenuItem";
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
        <MenuItem title={props.translation.get("toolbar.company.label")}>
            <ExternalLink href={alethioCompanyUrl} rel="noopener noreferrer">
                <ToolbarIconButton Icon={BriefcaseIcon} />
            </ExternalLink>
        </MenuItem>
    ),
    getContentProps : data => data
});
