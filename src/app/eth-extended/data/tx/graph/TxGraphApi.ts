import { HttpApi } from "app/eth-extended/data/HttpApi";
import { IGraphData } from "app/eth-extended/data/tx/graph/IGraphData";

enum GraphType {
    Message = "message",
    Trigger = "trigger",
    AccountInteraction = "account-interaction"
}

export class TxGraphApi {
    constructor(
        private httpApi: HttpApi,
        private endpointUrlMask: string
    ) {

    }

    private async fetch<T>(txHash: string, graphName: GraphType) {
        let data = await this.httpApi.fetch<T>(
            this.endpointUrlMask
                .replace(/%s/, txHash)
                .replace(/%s/, graphName)
        );

        if (!data) {
            throw new Error(`Graph ${graphName} not found for transaction hash "${txHash}"`);
        }

        return data;
    }

    async fetchAccountInteractionGraphData(txHash: string) {
        let data = await this.fetch<any>(txHash, GraphType.AccountInteraction);

        return data as IGraphData;
    }

    async fetchMessageGraphData(txHash: string) {
        let data = await this.fetch<any>(txHash, GraphType.Message);

        return data as IGraphData;
    }

    async fetchTriggerGraphData(txHash: string) {
        let data = await this.fetch<any>(txHash, GraphType.Trigger);

        return data as IGraphData;
    }
}
