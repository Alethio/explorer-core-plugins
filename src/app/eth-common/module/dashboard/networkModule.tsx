import * as React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ITranslation } from "plugin-api/ITranslation";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { NetworkSwitch } from "./NetworkSwitch";

const validateOptions = (options: INetworkProps) => {
    if (!options.networkName) {
        throw new Error(`Missing option "networkName"`);
    }
    if (options.otherNetworks.length) {
        if (options.otherNetworks
            .some(n => typeof n !== "object" || typeof n.name !== "string" || typeof n.url !== "string")
        ) {
            throw new Error(`Option "otherNetworks" is invalid. ` +
                `Each item must be an object with "name" and "url" string properties`);
        }
    }
};

const NetworkRoot = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
	color: #273656;
	font-size: 20px;
	font-weight: 300;
	line-height: 24px;
    margin: 32px 0 7px 0;
`;

const NetworkName = styled.b`
    margin-left: 12px;
`;

interface INetworkProps {
    networkName: string;
    otherNetworks: {
        name: string;
        url: string;
    }[];
    translation: ITranslation;
}

export const networkModule: IModuleDef<INetworkProps, {}> = {
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => props => <NetworkRoot>
        <span>{props.translation.get("dashboardView.network.label")}</span>
        <NetworkName>{ props.networkName }</NetworkName>
        { props.otherNetworks.length ?
        <NetworkSwitch networks={props.otherNetworks} translation={props.translation} />
        : null }
    </NetworkRoot>,
    getContentProps: props => {
        let { options, translation } = props;

        validateOptions(options as any);

        return {
            ...options as INetworkProps,
            translation
        };
    }
};
