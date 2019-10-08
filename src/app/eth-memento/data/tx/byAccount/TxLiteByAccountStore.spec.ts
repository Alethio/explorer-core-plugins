import * as assert from "assert";
import * as TypeMoq from "typemoq";
import { ICache } from "app/util/cache/ICache";
import { TxLiteByAccountStore } from "./TxLiteByAccountStore";
import { ITxLiteByAccount } from "./ITxLiteByAccount";
import { TxLiteByAccountApi } from "./TxLiteByAccountApi";
import { ICursor } from "./ICursor";
import { BigNumber } from "app/util/BigNumber";

let apiResult: ITxLiteByAccount[] = [
    {
        block: {
            id: 6353116,
            creationTime: 1537255221
        },
        from: "d7005d7a71bf800c84e507490d302e33cfd462c7",
        error: false,
        to: "9beada45d3268ba8a50c1c549cc7e865197191fe",
        gasPrice: new BigNumber(5687500000),
        gasUsed: new BigNumber(21000),
        hash: "ce3b1ba4ccdd81f24001d8a4c9621762946057e937130e67dfe015d4837a4f4a",
        value: new BigNumber("2000000000000000000"),
        txIndex: 0
    },
    {
        block: {
            id: 6352111,
            creationTime: 1537240728
        },
        from: "eb6d43fe241fb2320b5a3c9be9cdfd4dd8226451",
        error: false,
        to: "d7005d7a71bf800c84e507490d302e33cfd462c7",
        gasPrice: new BigNumber(52000000000),
        gasUsed: new BigNumber(21000),
        hash: "c8497b0d2eac2b27af043dec32b3d7006e155f1f074da9dbab77e42bebdcb076",
        value: new BigNumber("4000000000000000000"),
        txIndex: 0
    },
    {
        block: {
            id: 6351937,
            creationTime: 1537238115
        },
        from: "e423f51fc95c50a7b09873827fe44d6fa1a5391e",
        error: false,
        to: "d7005d7a71bf800c84e507490d302e33cfd462c7",
        gasPrice: new BigNumber(6000000000),
        gasUsed: new BigNumber(21000),
        hash: "80825dc2881f4385d0486f9cc3070003c8d821a6d0c508c11e779ea2e61d3749",
        value: new BigNumber("5000000000000000000"),
        txIndex: 0
    }
];

describe("data/" + TxLiteByAccountStore.name, () => {
    function createStore() {
        let cacheMock = TypeMoq.Mock.ofType<ICache<string, ITxLiteByAccount[]>>();
        let apiMock = TypeMoq.Mock.ofType(TxLiteByAccountApi, TypeMoq.MockBehavior.Strict);
        let store = new TxLiteByAccountStore(cacheMock.object, apiMock.object);
        return {store, cacheMock, apiMock };
    }
    it("should fetch data from API", async () => {
        let {store, apiMock, cacheMock} = createStore();
        let cursor: ICursor = {
            blockNo: 6353117,
            txIndex: 0
        };
        let limit = 50;
        apiMock.setup(x => x.fetch(
            TypeMoq.It.isValue("d7005d7a71bf800c84e507490d302e33cfd462c7"),
            TypeMoq.It.isValue(cursor),
            TypeMoq.It.isValue(limit)
        ))
            .returns(() => Promise.resolve(apiResult));

        let result = await store.fetch("d7005d7a71bf800c84e507490d302e33cfd462c7", cursor, limit);

        cacheMock.verify(x => x.get("d7005d7a71bf800c84e507490d302e33cfd462c7"), TypeMoq.Times.never());
        assert.deepEqual(result, apiResult);
    });
    it("should fetch data entirely from cache", async () => {
        let { store, cacheMock, apiMock } = createStore();
        let cursor: ICursor = {
            blockNo: 6353117,
            txIndex: 0
        };
        let limit = 50;
        let cacheKey = `d7005d7a71bf800c84e507490d302e33cfd462c7_${JSON.stringify(cursor)}_${limit}`;
        cacheMock
            .setup(x => x.has(TypeMoq.It.isValue(cacheKey)))
            .returns(() => true);
        cacheMock
            .setup(x => x.get(TypeMoq.It.isValue(cacheKey)))
            .returns(() => apiResult);

        let result = await store.fetch("d7005d7a71bf800c84e507490d302e33cfd462c7", cursor, limit);

        apiMock.verify(x => x.fetch("d7005d7a71bf800c84e507490d302e33cfd462c7",
            TypeMoq.It.isAny(),
            TypeMoq.It.isAny()
        ), TypeMoq.Times.never());
        assert.deepEqual(result, apiResult);
    });
});
