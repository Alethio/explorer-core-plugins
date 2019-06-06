import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { SearchLayer } from "./SearchLayer";
import { SearchInlineStore } from "../SearchInlineStore";
import { ISearch } from "app/shared/data/search/ISearch";
import { ToolbarItem } from "@alethio/ui/lib/layout/toolbar/ToolbarItem";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { SearchIcon } from "@alethio/ui/lib/icon/SearchIcon";

export interface IToolbarSearchProps {
    translation: ITranslation;
    search: ISearch;
    searchInlineStore: SearchInlineStore;
}

@observer
export class ToolbarSearch extends React.Component<IToolbarSearchProps> {
    @observable
    private layerVisible = false;

    render() {
        let { translation: tr } = this.props;

        return (
            <>
                <ToolbarItem title={this.props.translation.get("toolbar.search.label")}>
                    <ToolbarIconButton Icon={SearchIcon} onClick={this.handleLayerToggle} />
                </ToolbarItem>
                <SearchLayer
                    open={this.layerVisible}
                    onRequestClose={this.handleLayerToggle}
                    onRequestOpen={this.handleLayerToggle}
                    translation={tr}
                    search={this.props.search}
                    searchInlineStore={this.props.searchInlineStore}
                />
            </>
        );
    }

    private handleLayerToggle = () => {
        this.toggleLayer();
    }

    private toggleLayer() {
        this.layerVisible = !this.layerVisible;
    }
}
