import { ICache } from "app/util/cache/ICache";
import { ITxDetailsFull } from "app/eth-extended/data/tx/details/ITxDetailsFull";
import { TxDetailsFullApi } from "app/eth-extended/data/tx/details/TxDetailsFullApi";
import { TxDetailsPartialApi } from "app/eth-extended/data/tx/details/TxDetailsPartialApi";
import { NotFoundError } from "app/eth-extended/data/NotFoundError";
import { ILogger } from "plugin-api/ILogger";

export class TxDetailsStore {
    constructor(
        private txDetailsCache: ICache<string, ITxDetailsFull>,
        private txDetailsFullApi: TxDetailsFullApi,
        private txDetailsPartialApi: TxDetailsPartialApi,
        private logger: ILogger
    ) {

    }

    async fetch(txHash: string) {
        if (this.txDetailsCache.has(txHash)) {
            return this.txDetailsCache.get(txHash)!;
        }

        try {
            let details = await this.txDetailsFullApi.fetch(txHash);
            this.txDetailsCache.set(txHash, details);
            return details;
        } catch (e) {
            if (e instanceof NotFoundError) {
                this.logger.info(`Tx details not found by API for txHash "${txHash}". Falling back to deepstream.`);
            } else {
                this.logger.error(`Couldn't fetch TX details. Falling back to deepstream.`, e, { txHash });
            }
            // Fetch from deepstream, but don't cache non-consolidated data
            let details = await this.txDetailsPartialApi.fetch(txHash);
            return details;
        }
    }
}
