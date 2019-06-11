import { ResultReader } from "app/eth-extended/data/search/ResultReader";
import { NotFoundError } from "app/eth-extended/data/NotFoundError";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";

export class SearchDsRpcApi {
    constructor(
        private dsRpcApi: DsRpcApi,
        private resultReader: ResultReader
    ) {

    }

    /**
     * Search for a tx / block / uncle hash
     */
    async search(hash: string) {
        let data: any;
        try {
            data = await this.dsRpcApi.fetch("pending:v2:search", {
                hash: "0x" + hash.replace(/^0x/, "")
            });
        } catch (e) {
            if (e instanceof NotFoundError) {
                return [];
            }
            throw e;
        }

        return [this.resultReader.read(data)];
    }
}
