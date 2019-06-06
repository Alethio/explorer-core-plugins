import { TxGraphApi } from "app/eth-extended/data/tx/graph/TxGraphApi";

export class TxGraphStore {
    // TODO: caching
    constructor(
        private api: TxGraphApi
    ) {

    }

    async fetchAccountInteractionGraphData(txHash: string) {
        return await this.api.fetchAccountInteractionGraphData(txHash);
    }

    async fetchMessageGraphData(txHash: string) {
        return await this.api.fetchMessageGraphData(txHash);
    }

    async fetchTriggerGraphData(txHash: string) {
        return await this.api.fetchTriggerGraphData(txHash);
    }
}
