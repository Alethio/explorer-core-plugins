import * as React from "react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ArrowForwardIcon } from "@alethio/ui/lib/icon/ArrowForwardIcon";
import { ITranslation } from "plugin-api/ITranslation";
import { IPropagationChartItem } from "app/eth-extended/module/dashboard/charts/data/IPropagationChartItem";
import { BarChart } from "@alethio/explorer-ui/lib/dashboard/BarChart";

interface IPropagationChartProps {
    propagationItems: IPropagationChartItem[] | undefined;
    translation: ITranslation;
    ethstatsUrl: string;
    locale: string;
}

export class PropagationChart extends React.Component<IPropagationChartProps> {
    render() {
        return (
            <BarChart
                height={80}
                data={(this.props.propagationItems || []).map((data, idx) => {
                    return {
                        key: idx,
                        value: data.y,
                        data
                    };
                })}
                tooltipThunk={(item) => {
                    let chartTooltipText = this.props.translation.get("dashboardView.propagationChart.tooltip.text", {
                        "{propagationTimeMin}": item.data.x.toLocaleString(
                            this.props.locale, {
                                minimumFractionDigits: 0, maximumFractionDigits: 3
                            }
                        ),
                        "{propagationTimeMax}": (item.data.x + item.data.dx).toLocaleString(
                            this.props.locale, {
                                minimumFractionDigits: 0, maximumFractionDigits: 3
                            }
                        ),
                        "{propagationFraction}": item.data.y.toLocaleString(
                            this.props.locale, {
                                style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 3
                            }
                        ),
                        "{propagationFrequency}": item.data.frequency,
                        "{propagationCumulative}": item.data.cumulative
                    });
                    let [, tooltipPre, tooltipPost] = chartTooltipText.match(/(.*)\{arrow\}(.*)/)!;
                    return <div style={{padding: 8}}>
                        <ValueBox variant="small">
                            <div style={{display: "flex"}}>
                                <div>{ tooltipPre }</div>
                                <ArrowForwardIcon size={16} />
                                <div>{ tooltipPost }</div>
                            </div>
                        </ValueBox>
                    </div>;
                }}
                linkThunk={() => this.props.ethstatsUrl}
            />
        );
    }
}
