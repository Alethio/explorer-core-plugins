import * as React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { ITranslation } from "plugin-api/ITranslation";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { NetworkSwitch } from "./NetworkSwitch";
import { INetworkModuleOptions } from "./INetworkModuleOptions";

const validateOptions = (options: INetworkModuleOptions) => {
    if (!options.networkName) {
        throw new Error(`Missing option "networkName"`);
    }
    if (options.otherNetworks && options.otherNetworks.length) {
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

const NetworkLabel = styled.div`
    margin-top: -2px;
    margin-right: 8px;
`;

interface INetworkProps extends INetworkModuleOptions {
    translation: ITranslation;
}

export const networkModule: IModuleDef<INetworkProps, {}> = {
    contextType: {},
    dataAdapters: [],
    getContentComponent: async () => props => <NetworkRoot>
        <NetworkLabel>{props.translation.get("dashboardView.network.label")}</NetworkLabel>
        <NetworkSwitch networkName={props.networkName} networks={props.otherNetworks || []} />
    </NetworkRoot>,
    getContentProps: props => {
        let { options, translation } = props;

        validateOptions(options as INetworkModuleOptions);

        return {
            ...options as INetworkModuleOptions,
            translation
        };
    }
};
