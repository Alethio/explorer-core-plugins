import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { withInternalNav, IInternalNav } from "plugin-api/withInternalNav";
import { observer } from "mobx-react";
import { ITranslation } from "plugin-api/ITranslation";
import { SearchIcon } from "@alethio/ui/lib/icon/SearchIcon";
import { NoResults } from "./NoResults";
import { SearchBox } from "./SearchBox";
import { SpinnerLite } from "@alethio/ui/lib/fx/SpinnerLite";
import { SearchInlineStore } from "../SearchInlineStore";
import { ISearch } from "app/shared/data/search/ISearch";
import { ResultsLayer } from "app/eth-common/module/search/component/ResultsLayer";
import { HashPasteHandler } from "app/eth-common/module/search/component/HashPasteHandler";
import { SearchState } from "app/eth-common/module/search/component/SearchState";
import { ResultsList } from "app/eth-common/module/search/component/ResultsList";
import { IResult } from "app/shared/data/search/IResult";
import { SearchStatus } from "app/eth-common/module/search/component/SearchStatus";
import { ILogger } from "plugin-api/ILogger";

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
    color: ${props => props.theme.colors.input.placeholder};

    @media ${props => props.theme.media.sAndBelow} {
        display: none;
    }
`;

const SearchBoxContainer = styled.div`
    margin-left: 12px;
    margin-right: 24px;
    flex-grow: 1;

    @media ${props => props.theme.media.sAndBelow} {
        margin-left: 0;
    }
`;

export interface ISearchInlineProps {
    internalNav?: IInternalNav;
    translation: ITranslation;
    search: ISearch;
    searchInlineStore: SearchInlineStore;
    logger: ILogger;
    onRequestClose?(): void;
}

@observer
class $SearchInline extends React.Component<ISearchInlineProps> {
    private searchBox: HTMLInputElement;
    private searchState: SearchState;

    constructor(props: ISearchInlineProps) {
        super(props);

        this.searchState = new SearchState(this.props.search, this.props.internalNav!, this.props.logger);
    }

    render() {
        let { translation: tr } = this.props;
        return (
            <>
            <InlineSearchContent>
                <Content>
                    <SearchIconContainer>
                        { this.searchState.status !== SearchStatus.InProgress ?
                        <SearchIcon /> :
                        <SpinnerLite />
                        }
                    </SearchIconContainer>
                    <SearchBoxContainer>
                    <form onSubmit={this.handleSubmit}>
                        <SearchBox
                            innerRef={ref => this.searchBox = ref!}
                            type="text" autoComplete="off" autoCorrect="off" spellCheck={false}
                            placeholder={tr.get("search.box.placeholder")}
                            onFocus={this.searchState.handleFocus}
                            onBlur={this.searchState.handleBlur}
                            onKeyUp={this.searchState.handleKeyPress}
                        />
                    </form>
                    </SearchBoxContainer>
                </Content>
                { this.searchState.isActive && this.searchState.status === SearchStatus.Finished ?
                <ResultsLayer>
                { !this.searchState.results.length ?
                    <NoResults>
                        {tr.get("search.noResults.text")}
                    </NoResults>
                    :
                    <ResultsList
                        results={this.searchState.results}
                        onActivateResult={this.handleResultClick}
                        translation={this.props.translation}
                    />
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
        this.searchState.deactivate();
    }

    private handlePaste = (hash: string) => {
        setTimeout(() => {
            this.searchBox.value = hash;
            this.searchState.triggerSearch(hash, false);
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

        if (this.searchState.status === SearchStatus.Finished && this.searchState.results.length) {
            this.handleResultClick(this.searchState.results[0]);
        }
    }

    private handleResultClick = (r: IResult) => {
        this.searchState.activateResult(r);
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }
}

export const SearchInline = withInternalNav($SearchInline);
