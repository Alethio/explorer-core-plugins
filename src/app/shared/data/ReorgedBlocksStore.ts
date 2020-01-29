import { observable } from "mobx";

export class ReorgedBlocksStore {
    @observable
    private blocks = new Set<number>();

    addBlock(blockNumber: number) {
        this.blocks.add(blockNumber);
    }

    isReorged(blockNumber: number) {
        return this.blocks.has(blockNumber);
    }
}
