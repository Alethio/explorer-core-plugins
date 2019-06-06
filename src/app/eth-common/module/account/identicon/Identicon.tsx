import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { IdenticonProxy } from "./IdenticonProxy";

export interface IIdenticonProps {
    identicon: IdenticonProxy;
}

const IdenticonImg = styled("img")`
    width: ${props => props.theme.spacing.identiconSize}px;
    height: ${props => props.theme.spacing.identiconSize}px;
    border: 1px solid ${({theme}) => theme.colors.identiconBorder};
`;

export class Identicon extends React.PureComponent<IIdenticonProps> {
    render() {
        return <IdenticonImg src={this.getProfileImageSrc()} />;
    }

    private getProfileImageSrc() {
        return this.props.identicon.getDataImageString();
    }
}
