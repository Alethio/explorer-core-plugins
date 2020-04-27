import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { Select } from "@alethio/ui/lib/control/Select";
import { Option } from "@alethio/ui/lib/control/Option";

const Link = styled.a`
    text-decoration: none;
    outline: none;
    cursor: pointer;

    color: ${props => props.theme.colors.link};
`;

const Url = styled.span`
    margin-left: 8px;
`;

export interface INetworkSwitchProps {
    networkName: string;
    networks: {
        name: string;
        url: string;
    }[];
}

export class NetworkSwitch extends React.Component<INetworkSwitchProps> {
    render() {
        let { networks } = this.props;

        return (
            <Select
                placeholder={this.props.networkName}
                onSelect={this.onNetworkChange}
                disabled={!networks.length}>
                {this.props.networks.map(({ name, url }) =>
                    <Option key={name} value={url}>
                        <strong>{name}</strong> <Url>(<Link>{url}</Link>)</Url>
                    </Option>
                )}
            </Select>
        );
    }

    private onNetworkChange = (url: string) => location.href = url;
}
