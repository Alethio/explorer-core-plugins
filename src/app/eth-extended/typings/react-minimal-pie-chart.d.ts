/**
 * https://www.npmjs.com/package/react-minimal-pie-chart
 */
declare module "react-minimal-pie-chart" {
    export interface IPieChartData {
        key?: number | string;
        value: number;
        color: string;
    }
    interface IPieChartProps {
        // The source data which each element is a segment.
        data: IPieChartData[];
        cx?: number; // The x-coordinate of center. The value is the percentage of the component width (default: 50)
        cy?: number; // The y-coordinate of center. The value is the percentage of the component height (default: 50)
        ratio?: number; // The ratio of rendered svg element (default: 1)
        startAngle?: number; // The start angle of first sector (default: 0)
        lengthAngle?: number; // The total angle taken by the chart
                            // (can be negative to make the chart clockwise!) (default: 360)
        totalValue?: number; // The total value represented by the full chart (default: -)
        lineWidth?: number; // The width of the line representing each sector.
                            // The value is the percentage of chart radio*(100 === full pie)* (default: 100)
        radius?: number; // The radius of the pie. The value is the percentage of the component width * (default: 50)
        paddingAngle?: number; // The angle between two sectors (default: -)
        rounded?: boolean; // Round line caps of each sector (default: false)
        style?: object; // The style object assigned to chart wrapper (default: -)
        animate?: boolean; // Animate sectors on component mount (default: false)
        animationDuration?: number; // Animation duration in ms (default: 500)
        animationEasing?: String; // Animation CSS easing (default: "ease-out")
        reveal?: number; // Turn on CSS animation and reveal just a percentage of each segment (default: -)
    }
    export default class PieChart extends React.PureComponent<IPieChartProps> {
        render(): React.ReactNode;
    }
}
