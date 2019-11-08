// tslint:disable:no-string-literal

import { ISearchResult, SearchEntity } from "app/eth-memento/data/search/ISearchResult";

export class SearchReader {
    read(data: any) {
        let result: ISearchResult = {
            entity: data["entity"]
        };

        if (result.entity && result.entity === SearchEntity.Block) {
            result.data = {
                number: Number(data["data"]["number"])
            };
        }

        return result;
    }
}
