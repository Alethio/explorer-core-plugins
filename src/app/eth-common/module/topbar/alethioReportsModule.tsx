import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { MenuItem } from "plugin-api/component/topbar/MenuItem";
import { ITranslation } from "plugin-api/ITranslation";
import { ExternalLink } from "plugin-api/component/ExternalLink";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { AlethioReportsIcon } from "@alethio/ui/lib/icon/AlethioReportsIcon";

interface IAlethioReportsProps {
    translation: ITranslation;
}

export const alethioReportsModule: (alethioReportsUrl: string) => IModuleDef<IAlethioReportsProps, {}> =
(alethioReportsUrl) => ({
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => (props) => (
        <MenuItem title={props.translation.get("toolbar.reports.label")}>
            <ExternalLink href={alethioReportsUrl} rel="noopener noreferrer">
                <ToolbarIconButton Icon={AlethioReportsIcon} />
            </ExternalLink>
        </MenuItem>
    ),
    getContentProps : data => data
});
