import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { ITranslation } from "plugin-api/ITranslation";
import { Link } from "plugin-api/component/Link";
import { ProductIconButton } from "@alethio/ui/lib/layout/toolbar/ProductIconButton";
import { AlethioApiIcon } from "@alethio/ui/lib/icon/AlethioApiIcon";

interface IAlethioApiProps {
    translation: ITranslation;
}

export const alethioApiModule: (alethioApiUrl: string) => IModuleDef<IAlethioApiProps, {}> = (alethioApiUrl) => ({
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => (props) => (
        <ToolbarItem title={props.translation.get("toolbar.api.label")}>
            <Link to={alethioApiUrl}>
                <ProductIconButton Icon={AlethioApiIcon} />
            </Link>
        </ToolbarItem>
    ),
    getContentProps : data => data,
    getHelpComponent: () => ({ translation }) => <div dangerouslySetInnerHTML={{
        __html: translation.get("toolbar.api.help")
    }} />
});
