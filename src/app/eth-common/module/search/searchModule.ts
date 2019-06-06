import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "../../../shared/adapter/AlethioAdapterType";
import { ISearch } from "app/shared/data/search/ISearch";
import { SearchInline } from "./component/SearchInline";
import { ITranslation } from "plugin-api/ITranslation";
import { SearchInlineStore } from "./SearchInlineStore";

interface ISearchProps {
    translation: ITranslation;
    search: ISearch;
    searchInlineStore: SearchInlineStore;
}

export const searchModule: (searchInlineStore: SearchInlineStore) => IModuleDef<ISearchProps, {}, void> =
(searchInlineStore) => ({
    contextType: {},
    dataAdapters: [{
        ref: AlethioAdapterType.Search
    }],

    getContentComponent() {
        return Promise.resolve(SearchInline);
    },

    getContentProps(data) {
        let { translation, asyncData } = data;

        let search = asyncData.get(AlethioAdapterType.Search)!.data as ISearch;
        let props: ISearchProps = {
            translation,
            search,
            searchInlineStore
        };
        return props;
    }
});
