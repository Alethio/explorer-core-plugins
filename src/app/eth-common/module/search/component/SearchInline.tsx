import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { withInternalNav, IInternalNav } from "plugin-api/withInternalNav";
import { observer } from "mobx-react";
import { ITranslation } from "plugin-api/ITranslation";
import { SearchIcon } from "@alethio/ui/lib/icon/SearchIcon";
import { Button } from "@alethio/ui/lib/control/Button";
import { NoResults } from "./NoResults";
import { SearchBox } from "./SearchBox";
import { SpinnerLite } from "@alethio/ui/lib/fx/SpinnerLite";
import { SearchInlineStore } from "../SearchInlineStore";
import { ResponsiveContainer, MinimumWidth } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";
import { IconButton } from "@alethio/ui/lib/control/IconButton";
import { ISearch } from "app/shared/data/search/ISearch";
import { ResultsLayer } from "app/eth-common/module/search/component/ResultsLayer";
import { HashPasteHandler } from "app/eth-common/module/search/component/HashPasteHandler";
import { SearchState } from "app/eth-common/module/search/component/SearchState";
import { ResultsList } from "app/eth-common/module/search/component/ResultsList";
import { IResult } from "app/shared/data/search/IResult";
import { SearchStatus } from "app/eth-common/module/search/component/SearchStatus";

const InlineSearchContent = styled.div`
    display: inline-block;
    background: ${props => props.theme.colors.overlayBg};
    border: 1px solid ${props => props.theme.colors.overlayBorder};
    color: ${props => props.theme.colors.overlayText};
    box-shadow: 0 8px 16px 0 rgba(51,69,100,0.07), 0 6px 16px 0 rgba(51,69,100,0.08);
    margin-bottom: 24px;
    margin-top: 32px;

    width: 828px;
    max-width: 100%;
    box-sizing: border-box;

    /** For results layer positioning */
    position: relative;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 22px;
`;

const SearchIconContainer = styled.div`
    color: ${props => props.theme.colors.toolbarIcon};

    @media ${props => props.theme.mediaQueries.breakPoints.smallerThanStandardView} {
        display: none;
    }
`;

const SearchBoxContainer = styled.div`
    margin-left: 12px;
    margin-right: 24px;
    flex-grow: 1;

    @media ${props => props.theme.mediaQueries.breakPoints.smallerThanStandardView} {
        margin-left: 0;
    }
`;

export interface ISearchInlineProps {
    internalNav: IInternalNav;
    translation: ITranslation;
    search: ISearch;
    searchInlineStore: SearchInlineStore;
    onRequestClose?(): void;
}

@observer
class $SearchInline extends React.Component<ISearchInlineProps> {
    private searchBox: HTMLInputElement;
    private searchState: SearchState;

    constructor(props: ISearchInlineProps) {
        super(props);

        this.searchState = new SearchState(this.props.search, this.props.internalNav);
    }

    render() {
        let { translation: tr } = this.props;
        return (
            <>
            <InlineSearchContent>
                <Content>
                    <SearchIconContainer>
                        <SearchIcon />
                    </SearchIconContainer>
                    <SearchBoxContainer>
                    <form onSubmit={this.handleSubmit}>
                        <SearchBox
                            innerRef={ref => this.searchBox = ref!}
                            readOnly={this.searchState.status === SearchStatus.InProgress}
                            type="text" autoComplete="off" autoCorrect="off" spellCheck={false}
                            placeholder={tr.get("search.box.placeholder")} />
                    </form>
                    </SearchBoxContainer>
                    <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForStandardView}}>
                        <Button
                            colors="primary"
                            Icon={this.searchState.status !== SearchStatus.InProgress ? SearchIcon : SpinnerLite}
                            onClick={this.handleSubmit}
                        >
                            {tr.get("search.button.label")}
                        </Button>
                    </ResponsiveContainer>
                    <ResponsiveContainer behavior="show" forScreenWidth={{lowerThan: MinimumWidth.ForStandardView}}>
                        <IconButton
                            color={(theme) => theme.colors.copyIcon}
                            Icon={this.searchState.status !== SearchStatus.InProgress ? SearchIcon : SpinnerLite}
                            onClick={this.handleSubmit}
                        />
                    </ResponsiveContainer>
                </Content>
                { this.searchState.status === SearchStatus.Finished ?
                <ResultsLayer>
                { !this.searchState.results.length ?
                    <NoResults>
                        {tr.get("search.noResults.text")}
                    </NoResults>
                    :
                    <ResultsList results={this.searchState.results} onActivateResult={this.handleResultClick} />
                }
                </ResultsLayer>
                : null }
            </InlineSearchContent>
            <HashPasteHandler onPaste={this.handlePaste} />
            </>
        );
    }

    componentDidMount() {
        this.props.searchInlineStore.instancesCount++;
    }

    componentWillUnmount() {
        this.props.searchInlineStore.instancesCount--;
    }

    private handlePaste = (hash: string) => {
        setTimeout(() => {
            this.searchBox.value = hash;
            this.focusSearchBox();
        });
    }

    private focusSearchBox() {
        setTimeout(() => {
            this.searchBox.focus();
        });
    }

    private handleSubmit = async (e?: React.FormEvent<{}>) => {
        if (e) {
            e.preventDefault();
        }

        await this.searchState.submit(this.searchBox.value);
    }

    private handleResultClick = (r: IResult) => {
        this.searchState.activateResult(r);
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }
}

export const SearchInline = withInternalNav($SearchInline);
