import styled from "@alethio/explorer-ui/lib/styled-components";

export const ChartContainer = styled.div`
    /* Position relative to constrain the loading mask */
    position: relative;

    @media ${props => props.theme.media.sAndBelow} {
        display: none;
    }
`;
