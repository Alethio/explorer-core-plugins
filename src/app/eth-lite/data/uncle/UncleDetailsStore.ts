import { ICache } from "app/util/cache/ICache";
import { IUncleDetails } from "app/eth-lite/data/uncle/IUncleDetails";
import { UncleDetailsApi } from "app/eth-lite/data/uncle/UncleDetailsApi";

export class UncleDetailsStore {
    constructor(
        private uncleDetailsCache: ICache<string, IUncleDetails>,
        private uncleDetailsApi: UncleDetailsApi
    ) {

    }

    async fetch(blockNr: number, uncleIndex: number) {
        if (this.uncleDetailsCache.has(`${blockNr}/${uncleIndex}`)) {
            return this.uncleDetailsCache.get(`${blockNr}/${uncleIndex}`)!;
        }
        let details = await this.uncleDetailsApi.fetch(blockNr, uncleIndex);
        this.uncleDetailsCache.set(`${blockNr}/${uncleIndex}`, details);

        return details;
    }
}
