import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { MobileMenuItem } from "@alethio/ui/lib/layout/topbar/MobileMenuItem";
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
        <MobileMenuItem title={props.translation.get("toolbar.api.label")}>
            <Link to={alethioApiUrl}>
                <ProductIconButton Icon={AlethioApiIcon} />
            </Link>
        </MobileMenuItem>
    ),
    getContentProps : data => data
});
