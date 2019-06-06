import { ICache } from "app/util/cache/ICache";
import { PricesApi } from "./PricesApi";
import { PricesResult } from "./PricesResult";
import { IPrices } from "./IPrices";
import { ICurrencyMeta } from "./ICurrencyMeta";

/** ETH is treated like other tokens, with a special key for the address */
export const ETH_ADDR = "ETH";

export interface IBlockPricesRecord {
    meta: ICurrencyMeta;
    prices: IPrices;
}

export class PricesStore {
    constructor(
        private pricesCache: ICache<string, IBlockPricesRecord>,
        private pricesApi: PricesApi
    ) {

    }

    private getCacheKey(blockId: number, currencyAddr: string) {
        return blockId + "_" + currencyAddr;
    }

    /**
     * Fetches token prices + ETH prices
     */
    async fetch(blockIds: number[], tokenAddrs: string[] = []) {
        /** Data combined from cache + api response */
        let result = new PricesResult();
        /** Block ids that are not in cache */
        let fetchBlocksIds = new Set<number>();
        /** Currency addresses that are not in cache */
        let fetchAddrs = new Set<string>();

        blockIds.forEach(blockId => {
            [ETH_ADDR, ...tokenAddrs].forEach(addr => {
                let cacheKey = this.getCacheKey(blockId, addr);
                if (this.pricesCache.has(cacheKey)) {
                    let cachedData = this.pricesCache.get(cacheKey)!;
                    result.add({
                        blockId,
                        currencyAddr: addr,
                        meta: cachedData.meta,
                        prices: cachedData.prices
                    });
                } else {
                    fetchBlocksIds.add(blockId);
                    if (addr !== ETH_ADDR) {
                        fetchAddrs.add(addr);
                    }
                }
            });
        });

        if (fetchBlocksIds.size) {
            let apiData = await this.pricesApi.fetch([...fetchBlocksIds], [...fetchAddrs]);
            apiData.forEach((dataSet, addr) => {
                dataSet.prices.forEach((priceData, blockId) => {
                    let cacheKey = this.getCacheKey(blockId, addr);
                    let blockData: IBlockPricesRecord = {
                        meta: dataSet.meta,
                        prices: priceData
                    };
                    this.pricesCache.set(cacheKey, blockData);
                    result.add({
                        blockId,
                        currencyAddr: addr,
                        meta: blockData.meta,
                        prices: blockData.prices
                    });
                });
            });
        }

        return result;
    }
}
