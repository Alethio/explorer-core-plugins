import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { ITranslation } from "plugin-api/ITranslation";
import { ExternalLink } from "plugin-api/component/ExternalLink";
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
            <ExternalLink href={alethioApiUrl} rel="noopener noreferrer">
                <ProductIconButton Icon={AlethioApiIcon} />
            </ExternalLink>
        </ToolbarItem>
    ),
    getContentProps : data => data
});
