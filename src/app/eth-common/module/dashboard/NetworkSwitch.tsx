import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { Popover } from "@alethio/ui/lib/overlay/Popover";
import { contains } from "@puzzl/browser/lib/dom";
import { ITranslation } from "plugin-api/ITranslation";

const Link = styled.a`
    text-decoration: none;
    outline: none;
    cursor: pointer;

    color: ${props => props.theme.colors.link};
`;

const LinkButton = styled(Link)`
    margin-left: 12px;
    font-size: 12px;
    line-height: 12px;
    padding-top: 3px;
    font-weight: 600;
    text-transform: uppercase;
    user-select: none;
`;

const ListItem = styled.div`
    cursor: pointer;
    height: 32px;
    display: flex;
    align-items: center;

    & strong {
        font-weight: 500;
    }

    &:hover {
        color: ${props => props.theme.colors.link};
    }
`;

const Url = styled.span`
    margin-left: 8px;
`;

export interface INetworkSwitchProps {
    networks: {
        name: string;
        url: string;
    }[];
    translation: ITranslation;
}

@observer
export class NetworkSwitch extends React.Component<INetworkSwitchProps> {
    @observable
    private layerVisible = false;
    private layerEl: HTMLElement;
    private targetEl: HTMLElement;

    render() {
        return (
            <Popover visible={this.layerVisible} placement="right" offset={8} content={this.renderPopover()}>
                <LinkButton innerRef={ref => this.targetEl = ref!} onClick={this.handleLayerToggle}>
                    { this.props.translation.get("dashboardView.network.switch.label") }
                </LinkButton>
            </Popover>
        );
    }

    private renderPopover() {
        return <div style={{ padding: "8px 16px" }} ref={ref => this.layerEl = ref!}>
            <div>
                { this.props.networks.map(({name, url}) => (
                    <ListItem key={url} onClick={() => this.selectNetwork(url)}>
                        <strong>{name}</strong> <Url>(<Link>{url}</Link>)</Url>
                    </ListItem>
                ))}
            </div>
        </div>;
    }

    private selectNetwork(url: string) {
        this.layerVisible = false;
        location.href = url;
    }

    private handleLayerToggle = () => {
        this.toggleLayer();
    }

    private handleDocumentClick = (e: MouseEvent) => {
        if (!contains(this.layerEl, e.target as HTMLElement) &&
            !contains(this.targetEl, e.target as HTMLElement)) {
            this.layerVisible = false;
        }
    }

    private toggleLayer() {
        this.layerVisible = !this.layerVisible;
        if (this.layerVisible) {
            document.addEventListener("click", this.handleDocumentClick);
        } else {
            document.removeEventListener("click", this.handleDocumentClick);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleDocumentClick);
    }
}
