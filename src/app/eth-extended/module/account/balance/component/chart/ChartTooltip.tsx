import * as React from "react";
import { TooltipProps } from "recharts";
import { getOffset } from "@puzzl/browser/lib/dom";
import { Popover } from "@alethio/ui/lib/overlay/Popover";
import { clamp } from "@puzzl/core/lib/math/number";
import { IBalanceAreaChartPayload } from "./IBalanceAreaChartPayload";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { withTheme } from "@alethio/explorer-ui/lib/styled-components";

export interface IChartTooltipProps extends TooltipProps {
    placement: "top" | "bottom";
    arrow?: boolean;
    referenceEl: HTMLElement;
    theme: ITheme;
    children(payload: IBalanceAreaChartPayload): React.ReactElement<{}>;
}

class $ChartTooltip extends React.Component<IChartTooltipProps> {
    render() {
        if (!this.props.active || !this.props.coordinate ||
            !this.props.viewBox ||
            this.props.viewBox.height === void 0 ||
            this.props.viewBox.width === void 0 ||
            !this.props.payload) {
            return null;
        }

        let colors = this.props.theme.colors;

        let payload: IBalanceAreaChartPayload = (this.props.payload[0] as any).payload;

        let refEl = this.props.referenceEl;
        let refOffset = getOffset(refEl);

        // Viewport top and left
        let top = refOffset.top + (this.props.placement === "top" ? 0 : this.props.viewBox.height) - window.scrollY;
        // TODO: this ensure tooltip and arrow stay in the viewport. Should be fixed from graph x axis limits
        let left = clamp(refOffset.left + this.props.coordinate.x, 15, this.props.viewBox.width - 15) - window.scrollX;

        return <Popover
            offset={this.props.arrow ? 5 : 0}
            noArrow={!this.props.arrow}
            nonInteractive={true}
            placement={this.props.placement}
            noFlip
            visible
            referenceElement={{
                getBoundingClientRect() {
                    return {bottom: top, left, right: left, top, height: 0, width: 0};
                },
                clientHeight: 0,
                clientWidth: 0
            }}
            content={this.props.children(payload)}
            backgroundColor={colors.accountBalanceChartOverlayBg}
            borderColor={colors.accountBalanceChartOverlayBorder}
            style={{
                borderRadius: "3px"
            }}
        >
            <div />
        </Popover>;
    }
}

export const ChartTooltip = withTheme($ChartTooltip);
