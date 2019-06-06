import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "../../../shared/adapter/AlethioAdapterType";
import { ISearch } from "app/shared/data/search/ISearch";
import { ISearchMenuProps, SearchMenu } from "./component/SearchMenu";
import { SearchInlineStore } from "./SearchInlineStore";

export const topbarSearchModule: (searchInlineStore: SearchInlineStore) => IModuleDef<ISearchMenuProps, {}, void> =
(searchInlineStore) => ({
    contextType: {},
    dataAdapters: [{
        ref: AlethioAdapterType.Search
    }],

    getContentComponent() {
        return Promise.resolve(SearchMenu);
    },

    getContentProps(data) {
        let { translation, asyncData } = data;

        let search = asyncData.get(AlethioAdapterType.Search)!.data as ISearch;
        let props: ISearchMenuProps = {
            translation,
            search,
            searchInlineStore
        };
        return props;
    }
});
