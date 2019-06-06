import { BigNumber } from "app/util/BigNumber";

export interface ITokenBalance {
    timestamp: number;
    /** Raw token balance (amount multiplied by Pow(10, decimals)) or eth balance if not a token */
    balance: BigNumber;
    priceUsd: number;
    balanceUsd: number;
    /**
     * TODO: FIXME: Delete block number from token balance. For now we need it because balance api does not
     * guarantee to return 30 points for each token, each point corresponding to the same block number
     * so we need to check the block number when computing total balance and chart data
     */
    blockNumber: number;
}
