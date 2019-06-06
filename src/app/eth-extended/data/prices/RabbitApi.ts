import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";

interface IServerResponse<T> {
    code: number;
    result: T;
}

interface IServerRequest {
    tokens?: string[];
    blocks: number[];
}

export class RabbitApi {
    constructor(private httpRequest: HttpRequest) {

    }

    async fetch<T>(url: string, requestBody: IServerRequest) {
        let response = await this.httpRequest.fetchJson<IServerResponse<T>>(url, {
            method: "POST",
            data: requestBody
        });

        if (response.code !== 200) {
            throw new Error(`Got response with unexpected status ${response.code}`);
        }

        return response.result;
    }
}
