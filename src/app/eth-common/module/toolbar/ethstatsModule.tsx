import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { ITranslation } from "plugin-api/ITranslation";
import { ResponsiveContainer } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";
import { Link } from "plugin-api/component/Link";
import { ProductIconButton } from "@alethio/ui/lib/layout/toolbar/ProductIconButton";
import { EthStatsIcon } from "@alethio/ui/lib/icon/EthStatsIcon";

interface INetstatsProps {
    translation: ITranslation;
}

export const ethstatsModule: (ethstatsUrl: string) => IModuleDef<INetstatsProps, {}> = (ethstatsUrl) => ({
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => (props) => (
        <ResponsiveContainer behavior="hide" mediaQuery={theme => theme.media.mAndBelow}>
            <ToolbarItem title={props.translation.get("toolbar.ethstats.label")}>
                <Link to={ethstatsUrl}>
                    <ProductIconButton Icon={EthStatsIcon} />
                </Link>
            </ToolbarItem>
        </ResponsiveContainer>
    ),
    getContentProps(data) {
        let { translation } = data;
        let props: INetstatsProps = {
            translation
        };
        return props;
    },

    getHelpComponent: () => ({ translation }) => translation.get("toolbar.ethstats.help") as any
});
