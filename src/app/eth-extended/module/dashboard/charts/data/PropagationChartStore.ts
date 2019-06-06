import { observable } from "mobx";
import { IPropagationChartItem } from "./IPropagationChartItem";

export class PropagationChartStore {

    @observable.shallow
    private blockPropagationHistogramData: IPropagationChartItem[] | undefined;

    setPropagationHistogramData(values: IPropagationChartItem[]) {
        this.blockPropagationHistogramData = values;
    }

    getPropagationHistogramData() {
        return this.blockPropagationHistogramData;
    }
}
