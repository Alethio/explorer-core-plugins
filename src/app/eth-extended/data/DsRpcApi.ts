import { NotFoundError } from "app/shared/data/NotFoundError";
import { Deepstream } from "app/util/network/Deepstream";

interface IServerResponse<T> {
    status: number;
    data: T;
}

export class DsRpcApi {
    constructor(
        private deepstream: Deepstream
    ) {

    }

    async fetch<T>(name: string, data: any) {
        let response = await this.deepstream.rpcCall<IServerResponse<T>>(name, data);

        if (response.status !== 200) {
            if (response.status === 404) {
                throw new NotFoundError(`Got response with status code 404`);
            }
            throw new Error(`Got response with unexpected status ${response.status}`);
        }

        return response.data;
    }
}
