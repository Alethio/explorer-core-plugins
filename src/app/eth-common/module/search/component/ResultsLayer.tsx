import styled from "@alethio/explorer-ui/lib/styled-components";

export const ResultsLayer = styled.div`
    position: absolute;
    bottom: 0;
    left: -1px; /** border adjust */
    transform: translateY(100%);
    width: 100%;
    max-height: 50vh;
    overflow-y: auto;

    box-shadow: 0 8px 16px 0 rgba(51,69,100,0.07), 0 6px 16px 0 rgba(51,69,100,0.08);
    /* Clip the top part of the shadow */
    clip: rect(0px, 2000px, 2000px, -2000px);

    background-color: ${props => props.theme.colors.overlayBg};
    border: 1px solid ${props => props.theme.colors.overlayBorder};
`;
