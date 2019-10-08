import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { NotFoundError } from "app/shared/data/NotFoundError";

interface IServerResponse<T> {
    status: number;
    data: T;
}

export class HttpApi {
    constructor(
        private httpRequest: HttpRequest
    ) {

    }

    async fetch<T>(url: string) {
        let response = await this.httpRequest.fetchJson<IServerResponse<T>>(url);

        if (response.status !== 200) {
            if (response.status === 404) {
                throw new NotFoundError(`Got response with status code 404`);
            }
            throw new Error(`Got response with unexpected status ${response.status}`);
        }

        return response.data;
    }

    /** Same as fetch but considers 404 statuses as empty data sets */
    async fetchList<T>(url: string) {
        let data: T[];
        try {
            data = await this.fetch<T[]>(url);
        } catch (e) {
            if (e instanceof NotFoundError) {
                data = [];
            } else {
                throw e;
            }
        }

        if (!data || !Array.isArray(data)) {
            throw new Error(`Expected response data for url "${url}" to be an array`);
        }

        return data;
    }
}
