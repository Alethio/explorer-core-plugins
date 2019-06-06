import * as React from "react";
import PieChart from "react-minimal-pie-chart";
import { withTheme } from "@alethio/explorer-ui/lib/styled-components";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

interface IBalancePieChartProps {
    percentage: number;
    clockwise?: boolean;
    theme: ITheme;
}

class $BalancePieChart extends React.PureComponent<IBalancePieChartProps> {
    render() {
        const colors = this.props.theme.colors;
        const percentage = Math.round(Math.min(100, Math.max(0, this.props.percentage)));
        const data = [{
            value: percentage, color: colors.accountPieChartFill
        }, {
            value: 100 - percentage, color: colors.accountPieChartBg
        }];
        return <PieChart
            data={data}
            totalValue={100}
            startAngle={270}
            lengthAngle={this.props.clockwise ? -360 : 360}
            style={{
                width: "24px",
                height: "24px",
                margin: "1px 0",
                boxShadow: "0 2px 6px 0 rgba(0,0,0,0.04)",
                borderRadius: "50%"
            }}
        />;
    }
}

export const BalancePieChart = withTheme($BalancePieChart);
