import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { ITranslation } from "plugin-api/ITranslation";
import { BlockListDashboard } from "./BlockListDashboard";
import { DashboardLabel } from "@alethio/explorer-ui/lib/dashboard/DashboardLabel";
import { ILatestBlockRangeContext } from "../../../../../shared/context/ILatestBlockRangeContext";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";

export interface IBlocksChartWrapperProps {
    blockValues: (IBlockTxCount | undefined)[];
    context: ILatestBlockRangeContext;
    translation: ITranslation;
    modules?: JSX.Element[];
}

export class BlocksChartWrapper extends React.Component<IBlocksChartWrapperProps> {
    render() {
        let { translation: tr, blockValues, context} = this.props;

        return (
            <div>
                <DashboardLabel>
                    <Label>{ tr.get("dashboardView.lastBlocksChart.title.label") }</Label>
                </DashboardLabel>
                <BlockListDashboard
                    blockValues={blockValues}
                    context={context}
                    translation={this.props.translation}
                />
                { this.props.modules }
            </div>
        );
    }
}
