import styled from "@alethio/explorer-ui/lib/styled-components";

export const Title = styled.h1`
    text-align: center;
	color: ${({theme}) => theme.colors.base.accent.color};
	font-size: 36px;
	letter-spacing: 0.23px;
	line-height: 43px;
    font-weight: 300;
    margin: 14px 0 7px 0;
`;
