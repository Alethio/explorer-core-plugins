export interface ISearchResult {
    entity?: SearchEntity;
    data?: ISearchData;
}

export interface ISearchData {
    number: number;
}

export enum SearchEntity {
    Block = "block",
    Tx = "tx",
    Uncle = "uncle"
}
