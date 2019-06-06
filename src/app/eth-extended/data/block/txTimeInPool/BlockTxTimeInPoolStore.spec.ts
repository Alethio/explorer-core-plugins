import * as assert from "assert";
import { BlockTxTimeInPoolStore } from "./BlockTxTimeInPoolStore";

describe("data/" + BlockTxTimeInPoolStore.name, () => {
    it("should setLatestValues", () => {
        let store = new BlockTxTimeInPoolStore();
        assert.equal(store.getLatestValues(), void 0);
        store.setLatestValues([
            {id: 5, averageTimeInPool: 9},
            {id: 6, averageTimeInPool: 12},
            {id: 7, averageTimeInPool: 15},
            {id: 6, averageTimeInPool: 9},
            {id: 10, averageTimeInPool: 10}
        ]);
        assert.deepEqual(store.getLatestValues(), [
            {id: 5, averageTimeInPool: 9},
            {id: 6, averageTimeInPool: 9},
            {id: 7, averageTimeInPool: 15},
            {id: 10, averageTimeInPool: 10}
        ]);
    });
});
