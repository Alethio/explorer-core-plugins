import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITranslation } from "plugin-api/ITranslation";
import { TxCountBox } from "@alethio/explorer-ui/lib/box/block/TxCountBox";
import { IPendingPoolInfo } from "app/eth-extended/module/dashboard/charts/data/IPendingPoolInfo";
import { DashboardLabel } from "@alethio/explorer-ui/lib/dashboard/DashboardLabel";
import { AvgTimeInPoolChart } from "./AvgTimeInPoolChart";
import { ILatestBlockRangeContext } from "../../../../../shared/context/ILatestBlockRangeContext";
import { IBlockTxTimeInPool } from "app/eth-extended/data/block/txTimeInPool/IBlockTxTimeInPool";

export interface IAvgTimeInPoolProps {
    translation: ITranslation;
    blockValues: (IBlockTxTimeInPool | undefined)[];
    context: ILatestBlockRangeContext;
    pendingPoolInfo: IPendingPoolInfo;
}

export class AvgTimeInPool extends React.Component<IAvgTimeInPoolProps> {
    render() {
        let { translation: tr, pendingPoolInfo, blockValues, context } = this.props;

        return (
            <div>
                <DashboardLabel>
                    <Label>{ tr.get("dashboardView.pendingChart.title.label") }</Label>
                </DashboardLabel>
                <AvgTimeInPoolChart
                    blockValues={blockValues}
                    context={context}
                    translation={this.props.translation}
                />
                <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                    <LayoutRowItem>
                        <Label>{ tr.get("dashboardView.pendingPool.size.label") }</Label>
                        <TxCountBox>{ pendingPoolInfo.size }</TxCountBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{ tr.get("dashboardView.pendingPool.valueAdded.label") }</Label>
                        <ValueBox>
                            { pendingPoolInfo.eth + " " +
                            tr.get("dashboardView.pendingPool.valueAdded.perSec") }
                        </ValueBox>
                    </LayoutRowItem>
                    <LayoutRowItem>
                        <Label>{ tr.get("dashboardView.pendingPool.transferAdded.label") }</Label>
                        <ValueBox>
                            { pendingPoolInfo.erc + " " +
                            tr.get("dashboardView.pendingPool.transferAdded.perSec") }
                        </ValueBox>
                    </LayoutRowItem>
                </div>
            </div>
        );
    }
}
