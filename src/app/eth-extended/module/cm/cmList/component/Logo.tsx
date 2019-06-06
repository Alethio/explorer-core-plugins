import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";

const LogoWrapper = styled.div`
    flex: 0 0 auto;
    width: 112px;
    height: 112px;
    padding-top: 4px;
    padding-left: 16px;
    box-sizing: border-box;
`;

const WIDTH = 96;
const HEIGHT = 104;

const LogoInner = styled.div`
    color: ${props => props.theme.colors.cmBoxText};
    font-size: 32px;
    line-height: 38px;
    font-weight: 700;
    padding-left: 11px;
    padding-top: 29px;
    padding-bottom: 37px;
    width: ${WIDTH}px;
    position: relative; /* For arrow positioning */
    z-index: 0; /* Prevents :after element from going behind the sidebar */

    &:after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-top: ${HEIGHT / 2}px solid transparent;
        border-bottom: ${HEIGHT / 2}px solid transparent;
        border-left: ${WIDTH}px solid ${props => props.theme.colors.contractColorCode};
    }
`;

export const Logo: React.StatelessComponent<{}> = ({ children }) => (
    <LogoWrapper>
        <LogoInner>{children}</LogoInner>
    </LogoWrapper>
);
