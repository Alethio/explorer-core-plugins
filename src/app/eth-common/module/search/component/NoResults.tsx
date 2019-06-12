import styled from "@alethio/explorer-ui/lib/styled-components";

export const NoResults = styled.div`
    padding-top: 24px;
    padding-bottom: 24px;
    text-align: center;
    text-transform: uppercase;
    color: ${props => props.theme.colors.searchNoResultsText};
    font-size: 12px;
    line-height: 14px;
    font-weight: 700;
    letter-spacing: .4px;
`;
