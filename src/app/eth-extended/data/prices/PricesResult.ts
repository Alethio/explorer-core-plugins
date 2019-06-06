import { IPrices } from "./IPrices";
import { ICurrencyMeta } from "./ICurrencyMeta";
import { ETH_ADDR } from "./PricesStore";

interface IPricesResultRaw {
    blockId: number;
    currencyAddr: string;
    meta: ICurrencyMeta;
    prices: IPrices;
}

export class PricesResult {
    private data: IPricesResultRaw[] = [];

    add(...items: IPricesResultRaw[]) {
        this.data.push(...items);
    }

    getTokenPrices(blockId: number, tokenAddr: string) {
        let ret = this.data.find(d => d.blockId === blockId && d.currencyAddr === tokenAddr);
        if (!ret) {
            throw new Error(`Prices not found in data set for blockId=${blockId}, tokenAddr=${tokenAddr}`);
        }
        return {
            meta: ret.meta,
            prices: ret.prices
        };
    }

    getEthPrices(blockId: number) {
        let ret = this.data.find(d => d.blockId === blockId && d.currencyAddr === ETH_ADDR);
        if (!ret) {
            throw new Error(`ETH prices not found in data set for blockId=${blockId}`);
        }
        return {
            meta: ret.meta,
            prices: ret.prices
        };
    }
}
