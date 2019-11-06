import * as assert from "assert";
import * as TypeMoq from "typemoq";
import { ICache } from "app/util/cache/ICache";
import { TxLiteByAccountMinedStore } from "./TxLiteByAccountMinedStore";
import { ITxLiteByAccountMined } from "./ITxLiteByAccountMined";
import { TxLiteByAccountMinedApi } from "app/eth-extended/data/tx/lite/byAccount/mined/TxLiteByAccountMinedApi";
import { TxType } from "app/shared/data/tx/TxType";
import { ICursor } from "app/eth-extended/data/contractMsg/lite/byAccount/ICursor";
import { BigNumber } from "app/util/BigNumber";

let apiResult: ITxLiteByAccountMined[] = [
    {
        block: {
            id: 6353116,
            creationTime: 1537255221
        },
        type: TxType.Value,
        from: "d7005d7a71bf800c84e507490d302e33cfd462c7",
        error: "",
        to: "9beada45d3268ba8a50c1c549cc7e865197191fe",
        gasPrice: new BigNumber(5687500000),
        gasUsed: new BigNumber(21000),
        hash: "ce3b1ba4ccdd81f24001d8a4c9621762946057e937130e67dfe015d4837a4f4a",
        value: new BigNumber("2000000000000000000"),
        blockMsgValidationIndex: 0
    },
    {
        block: {
            id: 6352111,
            creationTime: 1537240728
        },
        type: TxType.Value,
        from: "eb6d43fe241fb2320b5a3c9be9cdfd4dd8226451",
        error: "",
        to: "d7005d7a71bf800c84e507490d302e33cfd462c7",
        gasPrice: new BigNumber(52000000000),
        gasUsed: new BigNumber(21000),
        hash: "c8497b0d2eac2b27af043dec32b3d7006e155f1f074da9dbab77e42bebdcb076",
        value: new BigNumber("4000000000000000000"),
        blockMsgValidationIndex: 0
    },
    {
        block: {
            id: 6351937,
            creationTime: 1537238115
        },
        type: TxType.Value,
        from: "e423f51fc95c50a7b09873827fe44d6fa1a5391e",
        error: "",
        to: "d7005d7a71bf800c84e507490d302e33cfd462c7",
        gasPrice: new BigNumber(6000000000),
        gasUsed: new BigNumber(21000),
        hash: "80825dc2881f4385d0486f9cc3070003c8d821a6d0c508c11e779ea2e61d3749",
        value: new BigNumber("5000000000000000000"),
        blockMsgValidationIndex: 0
    }
];

describe("data/" + TxLiteByAccountMinedStore.name, () => {
    function createStore() {
        let cacheMock = TypeMoq.Mock.ofType<ICache<string, ITxLiteByAccountMined[]>>();
        let apiMock = TypeMoq.Mock.ofType(TxLiteByAccountMinedApi, TypeMoq.MockBehavior.Strict);
        let store = new TxLiteByAccountMinedStore(cacheMock.object, apiMock.object);
        return {store, cacheMock, apiMock };
    }
    it("should fetch data from API", async () => {
        let {store, apiMock, cacheMock} = createStore();
        let cursor: ICursor = {
            blockNo: 6353117,
            blockMsgValidationIndex: 0
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
            blockMsgValidationIndex: 0
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
