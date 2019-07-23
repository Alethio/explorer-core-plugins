import { IAccountBalanceData } from "app/eth-extended/data/account/balance/IAccountBalanceDataSet";
import { ETH_ADDR } from "app/eth-extended/data/prices/PricesStore";
import { ITokenAggregatedBalance } from "app/eth-extended/data/account/balance/ITokenAggregatedBalance";
import { ITotalBalance } from "app/eth-extended/data/account/balance/ITotalBalance";
import { ethToWei } from "app/util/wei";
import { BigNumber } from "app/util/BigNumber";

const ETH_SYMBOL = "ETH";

export class AccountBalance {
    /** Map of token address to token balance data */
    private data = new Map<string, IAccountBalanceData>();

    add(...items: IAccountBalanceData[]) {
        for (let balanceData of items) {
            let tokenAddr = balanceData.currency.symbol === ETH_SYMBOL ? ETH_ADDR : balanceData.currency.address;
            this.data.set(tokenAddr, balanceData);
        }
    }

    hasTokens() {
        return this.getTokenTypeCount() > 0;
    }

    getTokenTypeCount() {
        return [...this.data.keys()].filter(k => k !== ETH_ADDR).length;
    }

    getEthBalance() {
        if (!this.data.has(ETH_ADDR)) {
            throw new Error(`Eth balance missing in data set`);
        }

        return this.data.get(ETH_ADDR)!;
    }

    getTokenBalance(tokenAddr: string) {
        if (!this.data.has(tokenAddr)) {
            throw new Error(`Token with address "${tokenAddr}" not found in data set`);
        }

        return this.data.get(tokenAddr)!;
    }

    hasToken(tokenAddr: string) {
        return this.data.has(tokenAddr);
    }

    getAllTokenBalances() {
        return [...this.data]
            .filter(([tokenAddr, _data]) => tokenAddr !== ETH_ADDR)
            .map(([_tokenAddr, data]) => data);
    }

    private getAllBalances() {
        return [...this.data.values()];
    }

    aggregateTokenBalance() {
        let tokenData = this.getAllTokenBalances();

        if (!tokenData.length) {
            throw new Error(`Account has no tokens`);
        }

        return tokenData[0].chart.map((balanceEth, idx) => {
            let blockNr = balanceEth.blockNumber;
            let balanceUsd = tokenData.reduce((total: number, data: IAccountBalanceData) => {
                /**
                 * TODO: FIXME: Delete block number from token balance. For now we need it because balance api does not
                 * guarantee to return 30 points for each token, each point corresponding to the same block number
                 * so we need to check the block number when computing total balance and chart data
                 *
                 * use `return total += data.chart[idx].balanceUsd;` when the problem is fixed and no need to check
                 * dataPoint existence
                 */
                const dataPoint = data.chart.find(p => p.blockNumber === blockNr);
                return dataPoint ? total += dataPoint.balanceUsd : total;
            }, 0);
            let aggregatedBalance: ITokenAggregatedBalance = {
                balanceUsd,
                timestamp: tokenData[0].chart[idx].timestamp
            };
            return aggregatedBalance;
        });
    }

    computeTotalBalance() {
        let ethBalance = this.getEthBalance();
        let allBalances = this.getAllBalances();

        return ethBalance.chart.map((ethDataPoint, idx) => {
            let ethPrice = ethBalance.chart[idx].priceUsd;
            let blockNr = ethBalance.chart[idx].blockNumber;
            let initialBalance: ITotalBalance = {
                wei: new BigNumber(0),
                usd: 0,
                timestamp: ethDataPoint.timestamp
            };
            return allBalances.reduce((total, balance) => {
                /**
                 * TODO: FIXME: Delete block number from token balance. For now we need it because balance api does not
                 * guarantee to return 30 points for each token, each point corresponding to the same block number
                 * so we need to check the block number when computing total balance and chart data
                 *
                 * use `let dataPoint = balance.chart[idx];` when the problem is fixed and no need to check dataPoint
                 * existence
                 */
                const dataPoint = balance.chart.find(p => p.blockNumber === blockNr);
                if (dataPoint) {
                    total.usd += dataPoint.balanceUsd;
                    /**
                     * TODO: FIXME: If there are no data in rabbit (for staging mostly), price_USD will return 0,
                     * so dividing by 0 will result in NaN. Therefore, i check ethPrice.
                     */
                    total.wei = total.wei.plus(
                        balance.currency.symbol === ETH_SYMBOL ?
                            dataPoint.balance :
                            (ethPrice === 0 ? 0 : ethToWei(new BigNumber(dataPoint.balanceUsd / ethPrice)))
                    );
                }
                return total;
            }, initialBalance);
        });
    }
}
