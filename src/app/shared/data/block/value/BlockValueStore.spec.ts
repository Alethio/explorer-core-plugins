import * as TypeMoq from "typemoq";
import * as assert from "assert";
import { BlockValueStore } from "app/shared/data/block/value/BlockValueStore";
import { BlockRangeStore } from "app/shared/data/block/value/BlockRangeStore";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";

describe("data/" + BlockValueStore.name, () => {
    function createStore() {
        let valueApiStoreMock = TypeMoq.Mock.ofType<BlockRangeStore<IBlockTxCount>>(
            BlockRangeStore, TypeMoq.MockBehavior.Strict);
        let store = new BlockValueStore(valueApiStoreMock.object);
        return { store, valueApiStoreMock };
    }
    it("should fetch from API", async () => {
        let { store, valueApiStoreMock } = createStore();
        let apiResult: IBlockTxCount[] = [
            { id: 0, transactionCount: 0 },
            { id: 1, transactionCount: 0 },
            { id: 2, transactionCount: 0 }
        ];
        valueApiStoreMock.setup(x => x.fetch(TypeMoq.It.isValue(0), TypeMoq.It.isValue(3)))
            .returns(() => Promise.resolve<IBlockTxCount[]>(apiResult));
        let results = await store.fetch(0, 3);
        assert.deepEqual(results, apiResult);
    });
});
