import * as React from "react";
import { AreaChart, Area, YAxis, ReferenceArea } from "recharts";
import { CHART_DATA_KEY, IPortfolioChartData } from "./BalanceChartData";
import { IBalanceAreaChartSmallPayload } from "./IBalanceAreaChartSmallPayload";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { withTheme } from "@alethio/explorer-ui/lib/styled-components";

const CHART_HEIGHT = 18;
const STROKE_WIDTH = 2;

export interface IBalanceAreaChartSmallProps {
    data: IPortfolioChartData<IBalanceAreaChartSmallPayload>;
    theme: ITheme;
}

class $BalanceAreaChartSmall extends React.Component<IBalanceAreaChartSmallProps> {
    render() {
        let { data, theme } = this.props;
        let colors = theme.colors;

        let fillColor = colors.accountBalanceChartSmallFill;

        // We need to convert vertical padding from px value to chartData domain
        let padY = STROKE_WIDTH; // px
        let resY = (data.max - data.min) / (CHART_HEIGHT - 2 * padY);

        return (
            <AreaChart
                width={174} height={CHART_HEIGHT} margin={{top: 0, bottom: 0, left: 0, right: 0}}
                data={data.points}
            >
                {/*
                The two reference areas expand the Y domain due to the alwaysShow property.
                The bottom area also ensures the padding is filled with the same color as the main area fill.
                It is the only way to add vertical padding without affecting the area fill.
                */}
                <ReferenceArea
                    x1={0} x2={data.points.length - 1}
                    y1={data.min - padY * resY} y2={data.min}
                    fill={fillColor} fillOpacity={1} alwaysShow={true}
                />
                <ReferenceArea
                    x1={0} x2={data.points.length - 1}
                    y1={data.max} y2={data.max + padY * resY}
                    fillOpacity={0} alwaysShow={true}
                />
                <Area
                    type="monotone"
                    dataKey={CHART_DATA_KEY}
                    stroke={colors.accountBalanceChartSmallStroke}
                    strokeWidth={STROKE_WIDTH}
                    fill={fillColor}
                    fillOpacity={1}
                    isAnimationActive={false}
                />
                <YAxis
                    hide={true}
                    domain={[ data.min, data.max ]}
                />
            </AreaChart>
        );
    }
}

export const BalanceAreaChartSmall = withTheme($BalanceAreaChartSmall);
