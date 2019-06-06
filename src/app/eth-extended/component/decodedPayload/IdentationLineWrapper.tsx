import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import LeafSvg from "assets/identation-lines-svg/H.svg";
import LastLeafSvg from "assets/identation-lines-svg/L.svg";
import VerticalSvg from "assets/identation-lines-svg/V.svg";

export enum IdentationGuideLineIcon {
    Leaf,
    Vertical,
    LastLeaf,
    Empty
}

const IdentationIconDiv = styled.div`
    background-color: transparent;
    background-origin: padding-box;
    background-position: 16px 0%;
    background-repeat: repeat-y;
    padding-left: 40px;
`;
const LeafIconDiv = styled(IdentationIconDiv)`
    background-image: url(${VerticalSvg}), url(${LeafSvg});
    background-repeat: repeat-y, no-repeat;
`;
const VerticalIconDiv = styled(IdentationIconDiv)`
    background-image: url(${VerticalSvg});
`;
const LastLeafIconDiv = styled(IdentationIconDiv)`
    background-image: url(${LastLeafSvg});
    background-repeat: no-repeat;
`;
const EmptyIconDiv = styled.div`
    padding-left: 40px;
`;

interface IIdentationLineWrapperProps {
    icon: IdentationGuideLineIcon;
}

export class IdentationLineWrapper extends React.Component<IIdentationLineWrapperProps> {
    render() {
        switch (this.props.icon) {
            case IdentationGuideLineIcon.Leaf:
                return <LeafIconDiv>{ this.props.children }</LeafIconDiv>;
            case IdentationGuideLineIcon.Vertical:
                return <VerticalIconDiv>{ this.props.children }</VerticalIconDiv>;
            case IdentationGuideLineIcon.LastLeaf:
                return <LastLeafIconDiv>{ this.props.children }</LastLeafIconDiv>;
            case IdentationGuideLineIcon.Empty:
                return <EmptyIconDiv>{ this.props.children }</EmptyIconDiv>;
            default:
                throw new Error("Unknown");
        }
    }
}
