// tslint:disable:no-string-literal
import { IPropagationChartItem } from "./IPropagationChartItem";

export class PropagationChartDataReader {
    read(data: any) {
        if (typeof data !== "object") {
            throw new Error(`Expected an object but got "${typeof data}"`);
        }
        let blockValue: IPropagationChartItem = {
            cumpercent: Number(data["cumpercent"]),
            cumulative: Number(data["cumulative"]),
            dx: Number(data["dx"]),
            frequency: Number(data["frequency"]),
            x: Number(data["x"]),
            y: Number(data["y"])
        };

        return blockValue;
    }
}
