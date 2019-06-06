import * as React from "react";
import { StackBarTooltipText } from "@alethio/ui/lib/data/vis/stackBar/StackBarTooltipText";
import { ITranslation } from "plugin-api/ITranslation";
import { TooltipTxCount } from "./TooltipTxCount";

export interface IBlockSummaryTooltipTextProps {
    count: number;
    percent: number;
    color: string;
    label: string;
    translation: ITranslation;
}

export class BlockSummaryTooltipText extends React.Component<IBlockSummaryTooltipTextProps> {
    render() {
        return (
            <StackBarTooltipText bubbleColor={this.props.color}>
                <span>
                    {this.props.label}
                </span>
                <span>
                    {this.props.percent}%
                </span>
                <TooltipTxCount count={this.props.count} translation={this.props.translation} />
            </StackBarTooltipText>
        );
    }
}
