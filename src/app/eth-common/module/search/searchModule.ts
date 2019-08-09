import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "../../../shared/adapter/AlethioAdapterType";
import { ISearch } from "app/shared/data/search/ISearch";
import { SearchInline, ISearchInlineProps } from "./component/SearchInline";
import { SearchInlineStore } from "./SearchInlineStore";

export const searchModule: (searchInlineStore: SearchInlineStore) => IModuleDef<ISearchInlineProps, {}, void> =
(searchInlineStore) => ({
    contextType: {},
    dataAdapters: [{
        ref: AlethioAdapterType.Search
    }],

    getContentComponent() {
        return Promise.resolve(SearchInline);
    },

    getContentProps(data) {
        let { translation, asyncData, logger } = data;

        let search = asyncData.get(AlethioAdapterType.Search)!.data as ISearch;
        let props: ISearchInlineProps = {
            translation,
            search,
            searchInlineStore,
            logger
        };
        return props;
    },

    getHelpComponent: () => ({ translation }) => translation.get("dashboardView.help.search") as any
});
