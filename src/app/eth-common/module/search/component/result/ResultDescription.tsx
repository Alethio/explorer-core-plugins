import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { Box } from "@alethio/ui/lib/layout/content/box/Box";

const ResultDescriptionBox: React.StatelessComponent =
({ children }) => <Box colors={theme => theme.colors.valueBox.primary} metrics={{
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 300,
    height: 24,
    textPaddingX: 8,
    textPaddingTop: 2,
    letterSpacing: 0.2,
    iconSize: 0
}}>{children}</Box>;

export const ResultDescription = styled(ResultDescriptionBox)`
    overflow: hidden;
    text-overflow: ellipsis;
`;
