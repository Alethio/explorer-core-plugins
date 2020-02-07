import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { ITranslation } from "plugin-api/ITranslation";
import { Link } from "plugin-api/component/Link";
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
            <Link to={alethioReportsUrl}>
                <ToolbarIconButton Icon={AlethioReportsIcon} />
            </Link>
        </ToolbarItem>
    ),
    getContentProps : data => data,
    getHelpComponent: () => ({ translation }) => <div dangerouslySetInnerHTML={{
        __html: translation.get("toolbar.reports.help")
    }} />
});
