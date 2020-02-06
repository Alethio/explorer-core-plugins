import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { MobileMenuItem } from "@alethio/ui/lib/layout/topbar/MobileMenuItem";
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
        <MobileMenuItem title={props.translation.get("toolbar.reports.label")}>
            <Link to={alethioReportsUrl}>
                <ToolbarIconButton Icon={AlethioReportsIcon} />
            </Link>
        </MobileMenuItem>
    ),
    getContentProps : data => data
});
