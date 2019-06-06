import * as assert from "assert";
import { AccountBalance } from "./AccountBalance";
import { IAccountBalanceData } from "app/eth-extended/data/account/balance/IAccountBalanceDataSet";
import { BigNumber } from "app/util/BigNumber";

describe("data/" + AccountBalance.name, () => {
    let latestTokenBalanceSampleData: IAccountBalanceData[] = [
        {
            currency: {
                id: "traxia",
                name: "TRAXIA",
                symbol: "TMT",
                address: "0x3209f98bebf0149b769ce26d71f7aea8e435efea",
                decimals: 18
            },
            chart: [
                {
                    blockNumber: 6353640,
                    priceUsd: 0.0086714498,
                    balance: new BigNumber("48400000000000000000000"),
                    balanceUsd: 419.70,
                    timestamp: 0
                }
            ]
        }, {
            currency: {
                id: "hybrid-block",
                name: "Hybrid Block",
                symbol: "HYB",
                address: "0x6059f55751603ead7dc6d280ad83a7b33d837c90",
                decimals: 18
            },
            chart: [
                {
                    blockNumber: 6353640,
                    priceUsd: 0.0194323869,
                    balance: new BigNumber("13020000000000000000000"),
                    balanceUsd: 253.01,
                    timestamp: 0
                }
            ]
        }, {
            currency: {
                id: "polyswarm",
                name: "PolySwarm",
                symbol: "NCT",
                address: "0x9e46a38f5daabe8683e10793b06749eef7d733d1",
                decimals: 18
            },
            chart: [
                {
                    blockNumber: 6353640,
                    priceUsd: 0.0036077864,
                    balance: new BigNumber("119145000000000000000000"),
                    balanceUsd: 429.85,
                    timestamp: 0
                }
            ]
        }, {
            currency: {
                id: "loom-network",
                name: "Loom Network",
                symbol: "LOOM",
                address: "0xa4e8c3ec456107ea67d3075bf9e3df3a75823db0",
                decimals: 18
            },
            chart: [
                {
                    blockNumber: 6353640,
                    priceUsd: 0.077218123,
                    balance: new BigNumber(0),
                    balanceUsd: 0.00,
                    timestamp: 0
                }
            ]
        }, {
            currency: {
                id: "pixie-coin",
                name: "Pixie Coin",
                symbol: "PXC",
                address: "0xc27c95350ecd634c80df89db0f10cd5c24b7b11f",
                decimals: 2
            },
            chart: [
                {
                    blockNumber: 6353640,
                    priceUsd: 0.000861211,
                    balance: new BigNumber(0),
                    balanceUsd: 0.00,
                    timestamp: 0
                }
            ]
        }
    ];
    let latestEthBalanceSampleData = {
        currency: {
            id: "ethereum",
            name: "Ethereum",
            symbol: "ETH",
            address: "",
            decimals: 18
        },
        chart: [
            {
                blockNumber: 6353640,
                priceUsd: 198.252916273,
                balance: new BigNumber("35327892301860348000"),
                balanceUsd: 7003.86,
                timestamp: 0
            }
        ]
    };

    describe("empty account balance", () => {
        let accountBalance = new AccountBalance();
        it("should return false for hasTokens", () => {
            let hasTokens = accountBalance.hasTokens();
            assert.equal(hasTokens, false);
        });

        it("should return 0 for getTokenTypeCount", () => {
            let tokenCount = accountBalance.getTokenTypeCount();
            assert.equal(tokenCount, 0);
        });

        it ("should throw error for getEthBalance and getTokenBalance", () => {
            assert.throws(() => { accountBalance.getEthBalance(); });
            assert.throws(() => { accountBalance.getTokenBalance("0x3209f98bebf0149b769ce26d71f7aea8e435efea"); });
        });

        it("should return empty array for getAllTokenBalances", () => {
            assert.deepEqual(accountBalance.getAllTokenBalances(), []);
        });

        it ("should throw error for aggregateTokenBalance and computeTotalBalance", () => {
            assert.throws(() => { accountBalance.aggregateTokenBalance(); });
            assert.throws(() => { accountBalance.computeTotalBalance(); });
        });

    });

    describe("valid data account balance", () => {
        let accountBalance = new AccountBalance();
        accountBalance.add(...latestTokenBalanceSampleData);
        accountBalance.add(latestEthBalanceSampleData);
        it("should return true for hasTokens", () => {
            let hasTokens = accountBalance.hasTokens();
            assert.equal(hasTokens, true);
        });

        it("should return 5 for getTokenTypeCount", () => {
            let tokenCount = accountBalance.getTokenTypeCount();
            assert.equal(tokenCount, latestTokenBalanceSampleData.length);
        });

        it ("should return correct balance for getEthBalance and getTokenBalance", () => {
            let ethBalance = accountBalance.getEthBalance();
            assert.deepEqual(ethBalance, latestEthBalanceSampleData);
            let firstTokenBalance = accountBalance.getTokenBalance(latestTokenBalanceSampleData[0].currency.address);
            assert.deepEqual(firstTokenBalance, latestTokenBalanceSampleData[0]);
        });

        it("should return same length getAllTokenBalances", () => {
            assert.equal(accountBalance.getAllTokenBalances().length, latestTokenBalanceSampleData.length);
        });

        it ("should test result of aggregateTokenBalance", () => {
            let aggregatedTokenBalance = accountBalance.aggregateTokenBalance();
            assert.equal(aggregatedTokenBalance.length, 1);
            assert.equal(aggregatedTokenBalance[0].balanceUsd, 1102.56);
        });

        it ("should test result of computeTotalBalance", () => {
            let totalBalance = accountBalance.computeTotalBalance();
            assert.equal(totalBalance.length, 1);
            assert.equal(totalBalance[0].usd, 8106.42);
            assert.equal(totalBalance[0].wei, 40889273293006740000);
        });
    });
});
