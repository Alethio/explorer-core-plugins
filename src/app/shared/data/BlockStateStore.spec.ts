import * as assert from "assert";
import { BlockStateStore } from "./BlockStateStore";

describe("data/" + BlockStateStore.name, () => {
    describe(BlockStateStore.prototype.getConfirmations.name, () => {
        it("should return the number of confirmations for given block number", () => {
            let store = new BlockStateStore();
            store.setLatest(100);
            assert.strictEqual(store.getConfirmations(85), 15);
        });
    });

    describe(BlockStateStore.prototype.isConfirmed.name, () => {
        it("should check if given block number represents a confirmed block", () => {
            let store = new BlockStateStore();
            store.setLatest(133);
            assert.strictEqual(store.isConfirmed(100), true);
            assert.strictEqual(store.isConfirmed(101), false);
        });
    });
});
