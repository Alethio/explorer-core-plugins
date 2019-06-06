import { IDataAdapter } from "plugin-api/IDataAdapter";
import { ISearch } from "app/shared/data/search/ISearch";

export class SearchAdapter implements IDataAdapter<{}, ISearch> {
    contextType = {};

    constructor(private store: ISearch) {

    }

    async load() {
        return this.store;
    }
}
