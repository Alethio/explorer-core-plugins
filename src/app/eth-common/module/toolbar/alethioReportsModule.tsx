import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
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
        <ToolbarItem title={props.translation.get("toolbar.reports.label")}>
            <ExternalLink href={alethioReportsUrl} rel="noopener noreferrer">
                <ToolbarIconButton Icon={AlethioReportsIcon} />
            </ExternalLink>
        </ToolbarItem>
    ),
    getContentProps : data => data
});
