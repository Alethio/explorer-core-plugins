import * as React from "react";
import {
    ResponsiveContainer, ReferenceLine, AreaChart, Area, YAxis, Tooltip, DotProps, TooltipProps,
    ReferenceArea
} from "recharts";
import { IPortfolioChartData, CHART_DATA_KEY } from "./BalanceChartData";
import { ChartTooltip } from "./ChartTooltip";
import { BalanceChartTooltipTop } from "./BalanceChartTooltipTop";
import { BalanceChartTooltipBottom } from "./BalanceChartTooltipBottom";
import { IBalanceAreaChartPayload } from "./IBalanceAreaChartPayload";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import styled, { withTheme } from "@alethio/explorer-ui/lib/styled-components";

const CHART_HEIGHT = 250;
const CIRCLE_FILTER_ID = "BalanceChart-circleShadow";
const AREA_GRADIENT_ID = "BalanceChart-areaGradient";

const $ActiveDot = (props: DotProps & {theme: ITheme}) => <g>
    <circle cx={props.cx} cy={props.cy} r="12"
        fill={props.theme.colors.accountBalanceChartOverlayBg}
        stroke={props.theme.colors.accountBalanceChartOverlayBorder}
        filter={`url(#${CIRCLE_FILTER_ID})`} />
    <circle cx={props.cx} cy={props.cy} r="4"
        fill={props.theme.colors.accountBalanceChartStroke} />
</g>;

const ActiveDot = withTheme($ActiveDot);

const ChartWrapper = styled.div`
    & svg {
        /** Allow the hover "dot" to overflow */
        overflow: visible;
    }
`;

export interface IBalanceAreaChartProps {
    data: IPortfolioChartData<IBalanceAreaChartPayload>;
    locale: string;
    ethSymbol: string;
    usdPricesEnabled: boolean;
    disabled?: boolean;
    theme: ITheme;
}

class $BalanceAreaChart extends React.Component<IBalanceAreaChartProps> {
    private rootEl: HTMLElement;

    render() {
        let colors = this.props.theme.colors;
        let { data: chartData, locale, disabled, ethSymbol, usdPricesEnabled } = this.props;

        let fillColor = colors.accountBalanceChartFill;
        let strokeColor = !disabled ? colors.accountBalanceChartStroke : colors.accountBalanceChartDisabledStroke;
        let refStrokeColor = colors.accountBalanceChartRefStroke;

        let domainMin = Math.floor(chartData.min);
        let domainMax = Math.ceil(chartData.max);

        // We need to convert vertical padding from px value to chartData domain
        let padY = 17; // px
        let resY = (domainMax - domainMin) / (CHART_HEIGHT - 2 * padY);

        return (
            <div ref={ref => this.rootEl = ref!}>
            <ChartWrapper>
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <AreaChart margin={{top: 0, bottom: 0, left: 0, right: 0}} data={chartData.points}>
                    <defs>
                        {/* Filter for active dot box shadow */}
                        <filter id={CIRCLE_FILTER_ID} x="-50%" y="-50%" width="200%" height="200%">
                            <feOffset result="offOut" in="SourceAlpha" dx="0" dy="2" />
                            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="6" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.08" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id={AREA_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.1}/>
                            <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    {/*
                    The two reference areas expand the Y domain due to the alwaysShow property.
                    The bottom area also ensures the padding is filled with the same color as the main area fill.
                    It is the only way to add vertical padding without affecting the area fill.
                    */}
                    <ReferenceArea
                        x1={0} x2={chartData.points.length - 1}
                        y1={domainMin - padY * resY} y2={domainMin}
                        fill={fillColor} fillOpacity={1} alwaysShow={true}
                    />
                    <ReferenceArea
                        x1={0} x2={chartData.points.length - 1}
                        y1={domainMax} y2={domainMax + padY * resY}
                        fillOpacity={0} alwaysShow={true}
                    />
                    {/* Area used only for rendering the fill below the reference lines */}
                    <Area
                        type="monotone" dataKey={CHART_DATA_KEY}
                        strokeOpacity={0}
                        fill={`url(#${AREA_GRADIENT_ID})`}
                        fillOpacity={1}
                        isAnimationActive={!disabled}
                    />
                    <ReferenceLine y={domainMax} stroke={refStrokeColor} strokeDasharray="3 1" />
                    <ReferenceLine
                        y={Math.round((domainMax + domainMin) / 2)} stroke={refStrokeColor}
                        strokeDasharray="3 1"
                    />
                    <ReferenceLine y={domainMin} stroke={refStrokeColor} strokeDasharray="3 1" />
                    { !disabled ?
                    <Tooltip
                        offset={0}
                        cursor={{ stroke: refStrokeColor }}
                        content={(props: TooltipProps) =>
                            <>
                            <ChartTooltip placement="top" arrow {...props} referenceEl={this.rootEl}>
                                {(payload) => (
                                    <BalanceChartTooltipTop locale={locale} payload={payload} ethSymbol={ethSymbol}
                                        usdPricesEnabled={usdPricesEnabled} />
                                )}
                            </ChartTooltip>
                            <ChartTooltip placement="bottom" {...props} referenceEl={this.rootEl}>
                                {(payload) => (
                                    <BalanceChartTooltipBottom locale={locale} payload={payload} />
                                )}
                            </ChartTooltip>
                            </>
                        }
                        isAnimationActive={false}
                    />
                    : null }
                    <Area
                        type="monotone" dataKey={CHART_DATA_KEY}
                        stroke={strokeColor} strokeWidth={3}
                        fillOpacity={0}
                        activeDot={!disabled ? <ActiveDot /> : void 0}
                        isAnimationActive={!disabled}
                    />
                    <YAxis
                        hide={true}
                        domain={[ domainMin, domainMax ]}
                    />
                </AreaChart>
            </ResponsiveContainer>
            </ChartWrapper>
            </div>
        );
    }
}

export const BalanceAreaChart = withTheme($BalanceAreaChart);
