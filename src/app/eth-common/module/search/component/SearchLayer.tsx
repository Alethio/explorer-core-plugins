import * as React from "react";
import ReactDOM from "react-dom";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { withInternalNav, IInternalNav } from "plugin-api/withInternalNav";
import { observer } from "mobx-react";
import { ITranslation } from "plugin-api/ITranslation";
import { SearchIcon } from "@alethio/ui/lib/icon/SearchIcon";
import { Fade } from "@alethio/ui/lib/fx/Fade";
import { SpinnerLite } from "@alethio/ui/lib/fx/SpinnerLite";
import { Layer } from "@alethio/ui/lib/overlay/Layer";
import { Mask } from "@alethio/ui/lib/overlay/Mask";
import { CloseIcon } from "@alethio/ui/lib/icon/CloseIcon";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { NoResults } from "./NoResults";
import { SearchBox } from "./SearchBox";
import { SearchInlineStore } from "../SearchInlineStore";
import { ISearch } from "app/shared/data/search/ISearch";
import { ResultsLayer } from "app/eth-common/module/search/component/ResultsLayer";
import { HashPasteHandler } from "app/eth-common/module/search/component/HashPasteHandler";
import { SearchState } from "app/eth-common/module/search/component/SearchState";
import { IResult } from "app/shared/data/search/IResult";
import { ResultsList } from "app/eth-common/module/search/component/ResultsList";
import { SearchStatus } from "app/eth-common/module/search/component/SearchStatus";
import { ILogger } from "plugin-api/ILogger";

const Content = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 22px;
    width: 848px;
    max-width: 100vw;
    box-sizing: border-box;
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

const CloseIconContainer = styled.div`
    margin-left: 20px;
`;

export interface ISearchLayerProps {
    internalNav: IInternalNav;
    open: boolean;
    translation: ITranslation;
    search: ISearch;
    searchInlineStore: SearchInlineStore;
    logger: ILogger;
    onRequestOpen(): void;
    onRequestClose(): void;
}

@observer
class $SearchLayer extends React.Component<ISearchLayerProps> {
    private searchBox: HTMLInputElement;
    private searchState: SearchState;

    constructor(props: ISearchLayerProps) {
        super(props);

        this.searchState = new SearchState(this.props.search, this.props.internalNav, this.props.logger);
    }
    render() {
        let { open, translation: tr } = this.props;

        return ( open ?
            ReactDOM.createPortal(<Fade duration={.2}>
                <Mask onClick={this.handleRootClick} />
                <Layer>
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
                        <CloseIconContainer>
                            <ToolbarIconButton onClick={this.props.onRequestClose} Icon={CloseIcon} />
                        </CloseIconContainer>
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
                    <HashPasteHandler onPaste={this.handlePaste} />
                </Layer>
            </Fade>, document.body) :
            null
        );
    }

    private handleRootClick = (e: React.MouseEvent<{}>) => {
        if (e.target === e.currentTarget) {
            this.props.onRequestClose();
        }
    }

    componentDidMount() {
        if (this.props.open) {
            this.focusSearchBox();
        }
    }

    componentDidUpdate(prevProps: ISearchLayerProps) {
        if (this.props.open !== prevProps.open && this.props.open) {
            this.searchState.deactivate();
            this.searchState.reset();
            this.focusSearchBox();
        }
    }

    private handlePaste = (hash: string) => {
        if (this.props.searchInlineStore.instancesCount > 0) {
            return;
        }

        if (!this.props.open) {
            this.props.onRequestOpen();
        }
        setTimeout(() => {
            this.searchBox.value = hash;
            this.searchState.triggerSearch(hash, false);
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
        this.props.onRequestClose();
    }
}

export const SearchLayer = withInternalNav($SearchLayer);
