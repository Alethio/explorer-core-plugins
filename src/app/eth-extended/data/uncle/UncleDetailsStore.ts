import { ICache } from "app/util/cache/ICache";
import { IUncleDetails } from "app/eth-extended/data/uncle/IUncleDetails";
import { UncleDetailsApi } from "app/eth-extended/data/uncle/UncleDetailsApi";

export class UncleDetailsStore {
    constructor(
        private uncleDetailsCache: ICache<string, IUncleDetails>,
        private uncleDetailsApi: UncleDetailsApi
    ) {

    }

    async fetch(uncleHash: string) {
        if (this.uncleDetailsCache.has(uncleHash)) {
            return this.uncleDetailsCache.get(uncleHash)!;
        }

        let details = await this.uncleDetailsApi.fetch(uncleHash);
        this.uncleDetailsCache.set(uncleHash, details);
        return details;
    }
}
