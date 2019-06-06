import * as assert from "assert";
import * as TypeMoq from "typemoq";
import { BalanceHttpApi } from "app/eth-extended/data/account/balance/BalanceHttpApi";
import { AccountBalanceApi } from "./AccountBalanceApi";
import { AccountBalanceDataSetReader } from "./AccountBalanceDataSetReader";
import { BigNumber } from "app/util/BigNumber";

// tslint:disable-next-line:no-var-requires
let latestBalanceResultMock = require("../../../../../../dev/mocks/sample-balance-latest.json").data;
// tslint:disable-next-line:no-var-requires
let historicalBalanceResultMock = require("../../../../../../dev/mocks/sample-balance-historical.json").data;

describe("data/" + AccountBalanceApi.name, () => {
    const createApi = (url: string, apiResultMock: any) => {
        let balanceHttpApiMock = TypeMoq.Mock.ofType(BalanceHttpApi, TypeMoq.MockBehavior.Strict);
        balanceHttpApiMock
            .setup(x => x.fetch(TypeMoq.It.isValue("test://url/" + url), TypeMoq.It.isAny()))
            .returns(() => Promise.resolve(apiResultMock));
        let accountBalanceApi = new AccountBalanceApi(
            balanceHttpApiMock.object,
            "test://url/latest",
            "test://url/historical",
            new AccountBalanceDataSetReader()
        );
        return accountBalanceApi;
    };
    it("should fetch latest balance", async () => {
        let accountBalanceApi = createApi("latest", latestBalanceResultMock);
        let result = await accountBalanceApi.fetchLatest("", 100);

        assert.equal(result instanceof Array, true);
        assert.equal(result.length, 6);
        // search for eth balance
        let ethBalance = result.find(b => b.currency.symbol === "ETH");
        assert.notEqual(ethBalance, undefined);
        // search for a token
        let tokenBalance = result.find(b => b.currency.address === "3209f98bebf0149b769ce26d71f7aea8e435efea");
        assert.notEqual(tokenBalance, undefined);

        if (ethBalance) {
            assert.deepEqual(ethBalance.currency, {
                id: "ethereum",
                name: "Ethereum",
                symbol: "ETH",
                address: "",
                decimals: 18
            });
            assert.equal(ethBalance.chart.length, 1);
            assert.deepEqual(ethBalance.chart[0], {
                blockNumber: 6353640,
                priceUsd: 198.252916273,
                balance: new BigNumber("35327892301860348000"),
                balanceUsd: 7003.86,
                timestamp: 0
            });
        }
        if (tokenBalance) {
            assert.deepEqual(tokenBalance.currency, {
                id: "traxia",
                name: "TRAXIA",
                symbol: "TMT",
                address: "3209f98bebf0149b769ce26d71f7aea8e435efea",
                decimals: 18
            });
            assert.equal(tokenBalance.chart.length, 1);
            assert.deepEqual(tokenBalance.chart[0], {
                blockNumber: 6353640,
                priceUsd: 0.0086714498,
                balance: new BigNumber("48400000000000000000000"),
                balanceUsd: 419.70,
                timestamp: 0
            });
        }
    });

    it("should fetch historical balance", async () => {
        let accountBalanceApi = createApi("historical", historicalBalanceResultMock);
        let result = await accountBalanceApi.fetchHistorical("", 100, 30);

        assert.equal(result instanceof Array, true);
        assert.equal(result.length, 6);
        // search for eth balance
        let ethBalance = result.find(b => b.currency.symbol === "ETH");
        assert.notEqual(ethBalance, undefined);
        // search for a token
        let tokenBalance = result.find(b => b.currency.address === "3209f98bebf0149b769ce26d71f7aea8e435efea");
        assert.notEqual(tokenBalance, undefined);

        if (ethBalance) {
            assert.deepEqual(ethBalance.currency, {
                id: "ethereum",
                name: "Ethereum",
                symbol: "ETH",
                address: "",
                decimals: 18
            });
            assert.equal(ethBalance.chart.length, 30);
            assert.deepEqual(ethBalance.chart[0], {
                blockNumber: 6353640,
                priceUsd: 198.252916273,
                balance: new BigNumber("35327892301860348000"),
                balanceUsd: 7003.86,
                timestamp: 1537262840
            });
            assert.deepEqual(ethBalance.chart[29], {
                balance: new BigNumber("6006236305416597000"),
                blockNumber: 6188340,
                timestamp: 1534869566,
                priceUsd: 275.237388135,
                balanceUsd: 1653.14
            });
        }
        if (tokenBalance) {
            assert.deepEqual(tokenBalance.currency, {
                id: "traxia",
                name: "TRAXIA",
                symbol: "TMT",
                address: "3209f98bebf0149b769ce26d71f7aea8e435efea",
                decimals: 18
            });
            assert.equal(tokenBalance.chart.length, 30);
            assert.deepEqual(tokenBalance.chart[0], {
                blockNumber: 6353640,
                priceUsd: 0.0086714498,
                balance: new BigNumber("48400000000000000000000"),
                balanceUsd: 419.70,
                timestamp: 1537262840
            });
            assert.deepEqual(tokenBalance.chart[29], {
                balance: new BigNumber("48400000000000000000000"),
                blockNumber: 6188340,
                timestamp: 1534869566,
                priceUsd: 0.0130275304,
                balanceUsd: 630.53
            });
        }
    });
});
