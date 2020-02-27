import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ArrowForwardIcon } from "@alethio/ui/lib/icon/ArrowForwardIcon";
import { ResponsiveContainer } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";
import { ITranslation } from "plugin-api/ITranslation";
import { ActiveNodesBox } from "app/eth-extended/module/dashboard/charts/component/ActiveNodesBox";
import { IPropagationChartItem } from "app/eth-extended/module/dashboard/charts/data/IPropagationChartItem";
import { IEthNodesInfo } from "app/eth-extended/module/dashboard/charts/data/IEthNodesInfo";
import { DashboardLabel } from "@alethio/explorer-ui/lib/dashboard/DashboardLabel";
import { PropagationChart } from "./PropagationChart";

export interface IPropagationProps {
    propagationItems: IPropagationChartItem[] | undefined;
    ethNodesInfo: IEthNodesInfo;
    ethstatsUrl: string;
    locale: string;
    translation: ITranslation;
}

export class Propagation extends React.Component<IPropagationProps> {
    private get propagation() {
        let data = this.props.propagationItems || [];
        let firstDataItem = data[0];
        if (firstDataItem) {
            return (
                <div style={{display: "flex"}}>
                    <div>{ "< " + (firstDataItem.x + firstDataItem.dx) + " s  " }</div>
                    <ArrowForwardIcon size={24} />
                    <div>{ "  " +
                    firstDataItem.y.toLocaleString(
                        this.props.locale, {
                            style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 3
                        }
                    ) }</div>
                </div>
            );
        }
        return void 0;
    }

    render() {
        let { translation: tr, locale } = this.props;

        return <ResponsiveContainer behavior="hide" mediaQuery={theme => theme.media.mAndBelow}>
            <DashboardLabel>
                <Label>{ tr.get("dashboardView.propagationChart.title.label") }</Label>
            </DashboardLabel>
            <PropagationChart
                propagationItems={this.props.propagationItems}
                translation={this.props.translation}
                ethstatsUrl={this.props.ethstatsUrl}
                locale={locale}
            />
            <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
                <LayoutRowItem>
                    <Label>{ tr.get("dashboardView.propagation.activeNodes.label") }</Label>
                    <ActiveNodesBox>{ this.props.ethNodesInfo.activeNodesCount }</ActiveNodesBox>
                </LayoutRowItem>
                { this.propagation ?
                <LayoutRowItem>
                    <Label>{ tr.get("dashboardView.propagation.label") }</Label>
                    <ValueBox>
                        { this.propagation }
                    </ValueBox>
                </LayoutRowItem>
                : null }
            </div>
        </ResponsiveContainer>;
    }
}
