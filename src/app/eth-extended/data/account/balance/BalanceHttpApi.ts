import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";

interface IServerResponse<T> {
    status: number;
    data: T;
}

interface IServerRequest {
    account: string;
    blockNumber?: number;
    tokens?: string[];
    days?: number;
}

export class BalanceHttpApi {
    constructor(private httpRequest: HttpRequest) {

    }

    async fetch<T>(url: string, requestBody: IServerRequest) {
        let response = await this.httpRequest.fetchJson<IServerResponse<T>>(url, {
            method: "POST",
            data: requestBody
        });

        if (response.status !== 200) {
            throw new Error(`Got response with unexpected status ${response.status}`);
        }

        return response.data;
    }
}
