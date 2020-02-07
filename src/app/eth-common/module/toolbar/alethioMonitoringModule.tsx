import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { ITranslation } from "plugin-api/ITranslation";
import { Link } from "plugin-api/component/Link";
import { ProductIconButton } from "@alethio/ui/lib/layout/toolbar/ProductIconButton";
import { AlethioMonitoringIcon } from "@alethio/ui/lib/icon/AlethioMonitoringIcon";

interface IAlethioMonitoringProps {
    translation: ITranslation;
}

export const alethioMonitoringModule: (alethioMonitoringUrl: string) => IModuleDef<IAlethioMonitoringProps, {}> =
(alethioMonitoringUrl) => ({
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => (props) => (
        <ToolbarItem title={props.translation.get("toolbar.monitoring.label")}>
            <Link to={alethioMonitoringUrl}>
                <ProductIconButton Icon={AlethioMonitoringIcon} />
            </Link>
        </ToolbarItem>
    ),
    getContentProps : data => data,
    getHelpComponent: () => ({ translation }) => <div dangerouslySetInnerHTML={{
        __html: translation.get("toolbar.monitoring.help")
    }} />
});
