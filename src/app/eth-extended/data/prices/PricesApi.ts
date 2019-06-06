import { RabbitApi } from "app/eth-extended/data/prices/RabbitApi";
import { PricesDataSetReader } from "./PricesDataSetReader";
import { IPricesDataSet } from "./IPricesDataSet";

export class PricesApi {
    constructor(
        private rabbitApi: RabbitApi,
        private endpointUrl: string,
        private pricesDataSetReader: PricesDataSetReader
    ) {

    }

    /**
     * Fetches price conversion data between given tokens (and implicitly ETH) and USD/BTC
     *
     * @return data mapped by token address or "ETH"
     */
    async fetch(blockIds: number[], tokensAddrs?: string[]) {
        let data = await this.rabbitApi.fetch<any>(this.endpointUrl, {
            blocks: blockIds,
            tokens: tokensAddrs ? tokensAddrs.map(addr => "0x" + addr.replace(/^0x/, "")) : void 0
        });

        return Object.keys(data).reduce((map, currencyAddr) => {
            map.set(currencyAddr.replace(/^0x/, ""), this.pricesDataSetReader.read(data[currencyAddr]));
            return map;
        }, new Map<string, IPricesDataSet>());
    }
}
