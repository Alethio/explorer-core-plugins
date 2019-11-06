import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import styled from "@alethio/explorer-ui/lib/styled-components";

interface ITooltipTxCountBoxProps {
    count: number;
    translation: ITranslation;
}

const TooltipCountRoot = styled.span`
    color: ${props => props.theme.colors.tooltipTxCountText};
`;

export const TooltipTxCount: React.StatelessComponent<ITooltipTxCountBoxProps> = ({ count, translation }) => (
    <TooltipCountRoot>
        {translation.get("blockView.content.blockSummary.txs.label")
            .replace(/%d/, "" + count)}
    </TooltipCountRoot>
);
