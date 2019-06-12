import * as React from "react";
import { Box } from "@alethio/ui/lib/layout/content/box/Box";

export const ResultTypes: React.StatelessComponent =
({ children }) => <Box colors={theme => ({text: theme.colors.base.secondary.color})} metrics={{
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 300,
    height: 16,
    textPaddingX: 8,
    textPaddingTop: 2,
    letterSpacing: "normal",
    iconSize: 0
}}>{children}</Box>;
