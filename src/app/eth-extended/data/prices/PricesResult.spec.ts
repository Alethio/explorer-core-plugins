import * as assert from "assert";
import { PricesResult } from "app/eth-extended/data/prices/PricesResult";

describe("data/" + PricesResult.name, () => {
    describe(PricesResult.prototype.getTokenPrices.name, () => {
        it("should get token prices", () => {
            let pricesResult = new PricesResult();
            let meta = {
                id: "aeternity",
                name: "Aeternity",
                symbol: "AE",
                address: "0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d",
                decimals: 0
            };
            let prices = {
                usd: 0.506264,
                btc: 0.0002
            };
            pricesResult.add({
                blockId: 100,
                currencyAddr: "0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d",
                meta,
                prices
            });
            assert.deepStrictEqual(pricesResult.getTokenPrices(100, "0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d"), {
                meta,
                prices
            });
        });

        it("should throw for bad block id or token address", () => {
            let result = new PricesResult();
            assert.throws(() => result.getTokenPrices(100, "0xff"));
        });
    });

    describe(PricesResult.prototype.getEthPrices.name, () => {
        it("should get eth prices", () => {
            let pricesResult = new PricesResult();
            let meta = {
                id: "ethereum",
                name: "Ethereum",
                symbol: "ETH",
                address: "",
                decimals: 18
            };
            let prices = {
                usd: 0.506264,
                btc: 0.0002
            };
            pricesResult.add({
                blockId: 100,
                currencyAddr: "ETH",
                meta,
                prices
            });
            assert.deepStrictEqual(pricesResult.getEthPrices(100), {
                meta,
                prices
            });
        });

        it("should throw for bad block id", () => {
            let result = new PricesResult();
            assert.throws(() => result.getEthPrices(100));
        });
    });
});
