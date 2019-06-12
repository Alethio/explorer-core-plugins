import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { ITranslation } from "plugin-api/ITranslation";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { SearchInline } from "./SearchInline";
import { SearchInlineStore } from "../SearchInlineStore";
import { SearchIcon } from "@alethio/ui/lib/icon/SearchIcon";
import { MenuItem } from "plugin-api/component/topbar/MenuItem";
import { SearchInlineWrapper } from "./SearchInlineWrapper";
import { ISearch } from "app/shared/data/search/ISearch";
import { ILogger } from "plugin-api/ILogger";

export interface ISearchMenuProps {
    translation: ITranslation;
    search: ISearch;
    searchInlineStore: SearchInlineStore;
    logger: ILogger;
}

@observer
export class SearchMenu extends React.Component<ISearchMenuProps> {
    @observable
    private searchOpen = false;

    private requestClose: () => void;

    render() {
        let { translation: tr } = this.props;

        return <>
            <MenuItem title={this.props.translation.get("toolbar.search.label")} sticky>
                {(requestClose) => {
                    this.requestClose = requestClose;
                    return <ToolbarIconButton
                        Icon={SearchIcon}
                        onClick={() => {
                            this.searchOpen = true;
                        }}
                    />;
                }}
            </MenuItem>
            { this.searchOpen ?
            <SearchInlineWrapper>
                <SearchInline
                    translation={tr} search={this.props.search}
                    searchInlineStore={this.props.searchInlineStore}
                    logger={this.props.logger}
                    onRequestClose={() => {
                        this.searchOpen = false;
                        this.requestClose();
                    }}
                />
            </SearchInlineWrapper> : null }
        </>;
    }
}
