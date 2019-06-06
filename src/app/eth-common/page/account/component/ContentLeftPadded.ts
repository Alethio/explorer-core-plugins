import styled from "@alethio/explorer-ui/lib/styled-components";

export const ContentLeftPadded = styled.div`
    box-sizing: border-box;
    padding-left: ${props => props.theme.spacing.sidebarWidth}px;

    @media ${props => props.theme.mediaQueries.breakPoints.smallerThanStandardView} {
        padding-left: 0px;
    }
`;
