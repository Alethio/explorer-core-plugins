import styled from "@alethio/explorer-ui/lib/styled-components";

export const ResultWrapper = styled.div`
    text-align: left;
    padding: 16px 24px;
    cursor: pointer;
    max-width: 100%;
    overflow: hidden;

    :not(:first-child) {
        border-top: 1px solid ${props => props.theme.colors.overlayBorder};
    }

    :hover {
        background-color: ${props => props.theme.colors.base.bg.main};
    }
`;
