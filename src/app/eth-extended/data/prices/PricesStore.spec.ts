import * as assert from "assert";
import * as TypeMoq from "typemoq";
import { PricesStore, IBlockPricesRecord } from "app/eth-extended/data/prices/PricesStore";
import { ICache } from "app/util/cache/ICache";
import { PricesApi } from "app/eth-extended/data/prices/PricesApi";
import { IPricesDataSet } from "app/eth-extended/data/prices/IPricesDataSet";
import { IPrices } from "app/eth-extended/data/prices/IPrices";

describe("data/" + PricesStore.name, () => {
    function createStore() {
        let cacheMock = TypeMoq.Mock.ofType<ICache<string, IBlockPricesRecord>>();
        let pricesApiMock = TypeMoq.Mock.ofType(PricesApi, TypeMoq.MockBehavior.Strict);
        let store = new PricesStore(cacheMock.object, pricesApiMock.object);
        return {store, cacheMock, pricesApiMock };
    }
    let tokenMeta = {
        address: "0xff",
        decimals: 18,
        id: "testCoin",
        name: "test coin",
        symbol: "TC"
    };
    let ethMeta = {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        address: "",
        decimals: 18
    };
    let apiResult = new Map<string, IPricesDataSet>([
        ["0xff", {
            meta: tokenMeta,
            prices: new Map<number, IPrices>([
                [100, { btc: 2, usd: 3 }],
                [101, { btc: 1, usd: 5 }]
            ])
        }],
        ["ETH", {
            meta: ethMeta,
            prices: new Map<number, IPrices>([
                [100, { btc: 15, usd: 4 }],
                [101, { btc: 20, usd: 7 }]
            ])
        }]
    ]);

    it("should fetch data from API", async () => {
        let { store, pricesApiMock } = createStore();
        pricesApiMock.setup(x => x.fetch(TypeMoq.It.isValue([100, 101]), TypeMoq.It.isValue(["0xff"])))
            .returns(() => Promise.resolve(apiResult));

        let result = await store.fetch([100, 101], ["0xff"]);
        assert.deepStrictEqual(result.getEthPrices(100).meta, ethMeta);
        assert.deepStrictEqual(result.getEthPrices(100).prices, {
            btc: 15,
            usd: 4
        });
        assert.deepStrictEqual(result.getTokenPrices(100, "0xff").meta, tokenMeta);
        assert.deepStrictEqual(result.getTokenPrices(100, "0xff").prices, {
            btc: 2,
            usd: 3
        });
    });

    it("should fetch data entirely from cache", async () => {
        let { store, cacheMock } = createStore();
        cacheMock.setup(x => x.has(TypeMoq.It.isValue("100_ETH"))).returns(() => true);
        cacheMock.setup(x => x.get(TypeMoq.It.isValue("100_ETH"))).returns(() => ({
            meta: ethMeta,
            prices: { btc: 4, usd: 6 }
        }));
        cacheMock.setup(x => x.has(TypeMoq.It.isValue("100_0xff"))).returns(() => true);
        cacheMock.setup(x => x.get(TypeMoq.It.isValue("100_0xff"))).returns(() => ({
            meta: tokenMeta,
            prices: { btc: 2, usd: 3 }
        }));

        let result = await store.fetch([100], ["0xff"]);
        assert.deepStrictEqual(result.getTokenPrices(100, "0xff"), {
            meta: tokenMeta,
            prices: {
                btc: 2,
                usd: 3
            }
        });
    });

    it("should fetch data from cache + api", async () => {
        let { store, cacheMock, pricesApiMock } = createStore();
        cacheMock.setup(x => x.has(TypeMoq.It.isValue("100_ETH"))).returns(() => false);
        cacheMock.setup(x => x.has(TypeMoq.It.isValue("100_0xff"))).returns(() => true);
        cacheMock.setup(x => x.get(TypeMoq.It.isValue("100_0xff"))).returns(() => ({
            meta: tokenMeta,
            prices: { btc: 2, usd: 3 }
        }));
        pricesApiMock.setup(x => x.fetch(TypeMoq.It.isValue([100]), TypeMoq.It.isValue([])))
            .returns(() => Promise.resolve(apiResult));

        let result = await store.fetch([100], ["0xff"]);
        assert.deepStrictEqual(result.getTokenPrices(100, "0xff"), {
            meta: tokenMeta,
            prices: {
                btc: 2,
                usd: 3
            }
        });
        assert.deepStrictEqual(result.getEthPrices(100), {
            meta: ethMeta,
            prices: {
                btc: 15,
                usd: 4
            }
        });
    });
});
