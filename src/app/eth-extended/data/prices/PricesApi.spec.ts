import * as assert from "assert";
import * as TypeMoq from "typemoq";
import { PricesApi } from "app/eth-extended/data/prices/PricesApi";
import { PricesDataSetReader } from "app/eth-extended/data/prices/PricesDataSetReader";
import { RabbitApi } from "app/eth-extended/data/prices/RabbitApi";

// tslint:disable-next-line:no-var-requires
let apiResultMock = require("../../../../../dev/mocks/sample-prices.json").result;

describe("data/" + PricesApi.name, () => {
    it("should fetch results", async () => {
        let rabbitApiMock = TypeMoq.Mock.ofType(RabbitApi);
        rabbitApiMock.setup(x => x.fetch(TypeMoq.It.isValue("test://url"), TypeMoq.It.isValue({
            blocks: [4000000, 5891670],
            tokens: ["0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d"]
        }))).returns(() => Promise.resolve(apiResultMock));
        let pricesApi = new PricesApi(rabbitApiMock.object, "test://url", new PricesDataSetReader());
        let result = await pricesApi.fetch([4000000, 5891670], ["0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d"]);
        assert.equal(result instanceof Map, true);
        assert.equal(result.has("5ca9a71b1d01849c0a95490cc00559717fcf0d1d"), true);
        assert.equal(result.has("3047367396746982734692762476938247623687"), false);
        assert.equal(result.has("ETH"), true);

        let tokenData = result.get("5ca9a71b1d01849c0a95490cc00559717fcf0d1d")!;
        assert.deepStrictEqual(tokenData.meta, {
            address: "5ca9a71b1d01849c0a95490cc00559717fcf0d1d",
            decimals: 0,
            id: "aeternity",
            name: "Aeternity",
            symbol: "AE"
        });

        assert.equal(tokenData.prices instanceof Map, true);
        assert.equal(tokenData.prices.has(4000000), true);
        assert.equal(tokenData.prices.has(5891670), true);
        assert.deepStrictEqual(tokenData.prices.get(5891670)!, {
            usd: 1.91478,
            btc: 0.00030292
        });
    });

    it("should fetch for tokenAddr hashes omitting 0x prefix", async () => {
        let rabbitApiMock = TypeMoq.Mock.ofType(RabbitApi);
        rabbitApiMock.setup(x => x.fetch(TypeMoq.It.isValue("test://url"), TypeMoq.It.isValue({
            blocks: [4000000, 5891670],
            tokens: ["0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d"]
        }))).returns(() => Promise.resolve(apiResultMock));
        let pricesApi = new PricesApi(rabbitApiMock.object, "test://url", new PricesDataSetReader());
        let result = await pricesApi.fetch([4000000, 5891670], ["5ca9a71b1d01849c0a95490cc00559717fcf0d1d"]);
        assert.equal(result instanceof Map, true);
        assert.equal(result.has("5ca9a71b1d01849c0a95490cc00559717fcf0d1d"), true);
    });
});
