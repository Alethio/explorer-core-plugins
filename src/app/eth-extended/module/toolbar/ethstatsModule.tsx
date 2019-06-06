import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { ITranslation } from "plugin-api/ITranslation";
import { ResponsiveContainer, MinimumWidth } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";
import { ExternalLink } from "plugin-api/component/ExternalLink";
import { ProductIconButton } from "@alethio/ui/lib/layout/toolbar/ProductIconButton";
import { EthStatsIcon } from "@alethio/ui/lib/icon/EthStatsIcon";

interface INetstatsProps {
    translation: ITranslation;
}

export const ethstatsModule: (ethstatsUrl: string) => IModuleDef<INetstatsProps, {}> = (ethstatsUrl) => ({
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => (props) => (
        <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForFullView}}>
            <ToolbarItem title={props.translation.get("toolbar.ethstats.label")}>
                <ExternalLink href={ethstatsUrl} rel="noopener noreferrer">
                    <ProductIconButton Icon={EthStatsIcon} />
                </ExternalLink>
            </ToolbarItem>
        </ResponsiveContainer>
    ),
    getContentProps(data) {
        let { translation } = data;
        let props: INetstatsProps = {
            translation
        };
        return props;
    }
});
