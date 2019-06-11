import * as React from "react";
import ReactDOM from "react-dom";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { withInternalNav, IInternalNav } from "plugin-api/withInternalNav";
import { observer } from "mobx-react";
import { ITranslation } from "plugin-api/ITranslation";
import { SearchIcon } from "@alethio/ui/lib/icon/SearchIcon";
import { Button } from "@alethio/ui/lib/control/Button";
import { Fade } from "@alethio/ui/lib/fx/Fade";
import { ResultType } from "app/shared/data/search/ResultType";
import { observable, action, runInAction } from "mobx";
import { SpinnerLite } from "@alethio/ui/lib/fx/SpinnerLite";
import { Layer } from "@alethio/ui/lib/overlay/Layer";
import { Mask } from "@alethio/ui/lib/overlay/Mask";
import { CloseIcon } from "@alethio/ui/lib/icon/CloseIcon";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import { NoResults } from "./NoResults";
import { SearchBox } from "./SearchBox";
import { SearchInlineStore } from "../SearchInlineStore";
import { ISearch } from "app/shared/data/search/ISearch";
import { IBlockResultData } from "app/shared/data/search/result/IBlockResultData";
import { IAccountResultData } from "app/shared/data/search/result/IAccountResultData";
import { ResultsLayer } from "app/eth-common/module/search/component/ResultsLayer";

const Content = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 22px;
    width: 848px;
    max-width: 100vw;
    box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
    white-space: nowrap;
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
    onRequestOpen(): void;
    onRequestClose(): void;
}
@observer
class $SearchLayer extends React.Component<ISearchLayerProps> {
    private searchBox: HTMLInputElement;
    @observable
    private noResults = false;
    @observable
    private inProgress = false;

    render() {
        let { open, translation: tr } = this.props;

        return ( open ?
            ReactDOM.createPortal(<Fade duration={.2}>
                <Mask onClick={this.handleRootClick} />
                <Layer>
                    <Content>
                        <SearchIconContainer>
                            <SearchIcon />
                        </SearchIconContainer>
                        <SearchBoxContainer>
                        <form onSubmit={this.handleSubmit}>
                            <SearchBox
                                innerRef={ref => this.searchBox = ref!}
                                readOnly={this.inProgress}
                                type="text" autoComplete="off" autoCorrect="off" spellCheck={false}
                                placeholder={tr.get("search.box.placeholder")} />
                        </form>
                        </SearchBoxContainer>
                        <ButtonWrapper>
                            <Button
                                colors="primary"
                                Icon={!this.inProgress ? SearchIcon : SpinnerLite}
                                onClick={this.handleSubmit}
                            >
                                {tr.get("search.button.label")}
                            </Button>
                        </ButtonWrapper>
                        <CloseIconContainer>
                            <ToolbarIconButton onClick={this.props.onRequestClose} Icon={CloseIcon} />
                        </CloseIconContainer>
                    </Content>
                    { this.noResults ?
                    <ResultsLayer>
                        <NoResults>
                            {tr.get("search.noResults.text")}
                        </NoResults>
                    </ResultsLayer>
                    : null }
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
        document.addEventListener("paste", this.handlePaste);
        if (this.props.open) {
            this.focusSearchBox();
        }
    }

    componentDidUpdate(prevProps: ISearchLayerProps) {
        if (this.props.open !== prevProps.open && this.props.open) {
            runInAction(() => {
                this.noResults = false;
                this.inProgress = false;
            });
            this.focusSearchBox();
        }
    }

    componentWillUnmount() {
        document.removeEventListener("paste", this.handlePaste);
    }

    private handlePaste = (e: ClipboardEvent) => {
        let activeEl = document.activeElement;
        if ((activeEl as HTMLInputElement).value !== void 0 || (activeEl as HTMLElement).isContentEditable) {
            // We ignore paste event on form or editable elements
            return;
        }
        if (this.props.searchInlineStore.instancesCount > 0) {
            return;
        }

        let text = e.clipboardData!.getData("text/plain").trim();
        // Should be non-empty string and it should look like a hash or block number
        if (text && text.match(/^(0x)?[a-fA-F0-9]+$/)) {
            if (!this.props.open) {
                this.props.onRequestOpen();
            }
            setTimeout(() => this.searchBox.value = text);
        }
    }

    private focusSearchBox() {
        setTimeout(() => {
            this.searchBox.focus();
        });
    }

    @action
    private handleSubmit = async (e?: React.FormEvent<{}>) => {
        if (e) {
            e.preventDefault();
        }

        // TODO: button disabled state
        if (this.inProgress) {
            return;
        }

        this.noResults = false;
        this.inProgress = true;

        let query = this.searchBox.value.trim().toLowerCase();
        let result = (await this.props.search.search(query))[0];
        if (result) {
            let url: string;

            if (result.type === ResultType.Account) {
                url = `page://aleth.io/account?accountHash=${(result.data as IAccountResultData).address}`;
            } else if (result.type === ResultType.Block) {
                url = `page://aleth.io/block?blockNumber=${(result.data as IBlockResultData).blockNumber}`;
            } else if (result.type === ResultType.Tx) {
                url = `page://aleth.io/tx?txHash=${query}`;
            } else if (result.type === ResultType.Uncle) {
                url = `page://aleth.io/uncle?uncleHash=${query}`;
            } else {
                throw new Error(`Unhandled result type "${result.type}"`);
            }

            // We don't reset inProgress because we're closing the layer
            if (!this.props.internalNav.goTo(url)) {
                this.handleNoResults();
                return;
            }
            this.props.onRequestClose();
        } else {
            this.handleNoResults();
        }
    }

    private handleNoResults() {
        runInAction(() => {
            this.noResults = true;
            this.inProgress = false;
        });
        this.searchBox.value = "";
        this.focusSearchBox();
    }
}

export const SearchLayer = withInternalNav($SearchLayer);
