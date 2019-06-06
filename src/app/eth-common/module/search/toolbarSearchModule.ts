import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "../../../shared/adapter/AlethioAdapterType";
import { ISearch } from "app/shared/data/search/ISearch";
import { IToolbarSearchProps, ToolbarSearch } from "./component/ToolbarSearch";
import { SearchInlineStore } from "./SearchInlineStore";

export const toolbarSearchModule: (searchInlineStore: SearchInlineStore) => IModuleDef<IToolbarSearchProps, {}, void> =
(searchInlineStore) => ({
    contextType: {},
    dataAdapters: [{
        ref: AlethioAdapterType.Search
    }],

    getContentComponent() {
        return Promise.resolve(ToolbarSearch);
    },

    getContentProps(data) {
        let { translation, asyncData } = data;

        let search = asyncData.get(AlethioAdapterType.Search)!.data as ISearch;
        let props: IToolbarSearchProps = {
            translation,
            search,
            searchInlineStore
        };
        return props;
    }
});
