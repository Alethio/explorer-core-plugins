import { observable } from "mobx";

export class BlockStateStore {
    /**
     * Latest block number could be undefined at the start, but we wait for it to be set before initializing the plugin.
     */
    @observable
    private latestBlockNo: number;

    setLatest(blockNo: number) {
        this.latestBlockNo = blockNo;
    }

    getLatest() {
        return this.latestBlockNo;
    }

    /**
     * Number of confirmations for given block
     */
    getConfirmations(blockId: number) {
        return Math.max(0, this.latestBlockNo - blockId);
    }

    /**
     * Whether a given block is confirmed.
     * Block is considered confirmed if older than the last block by at least N blocks
     */
    isConfirmed(blockId: number) {
        let confirmations = this.getConfirmations(blockId);
        return confirmations > 32;
    }
}
