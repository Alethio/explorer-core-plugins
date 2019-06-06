import { observable } from "mobx";

export class NetstatsStore {
    @observable
    private activeNodesCount: number | undefined;

    setActiveNodesCount(value: number) {
        this.activeNodesCount = value;
    }

    getActiveNodesCount() {
        return this.activeNodesCount;
    }

}
