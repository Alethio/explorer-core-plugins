import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";

const IdenticonWrapperRoot = styled.div`
    width: ${({theme}) => theme.spacing.sidebarWidth}px;
    padding-left: 24px;
    padding-right: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
`;

const IdenticonContainer = styled.div`
    padding-left: 57px;
    padding-right: 57px;
`;

export class IdenticonWrapper extends React.Component<{}> {
    render() {
        return <IdenticonWrapperRoot>
            <IdenticonContainer>
                {this.props.children}
            </IdenticonContainer>
        </IdenticonWrapperRoot>;
    }
}
