import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";

const BalanceChartLoadingMaskRoot = styled.div`
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const ContentWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export class BalanceChartLoadingMask extends React.Component {
    render() {
        return <BalanceChartLoadingMaskRoot>
            <ContentWrapper>
                {this.props.children}
            </ContentWrapper>
        </BalanceChartLoadingMaskRoot>;
    }
}
