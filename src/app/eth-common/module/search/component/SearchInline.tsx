import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { withInternalNav, IInternalNav } from "plugin-api/withInternalNav";
import { observer } from "mobx-react";
import { observable, action, runInAction } from "mobx";
import { ResultType } from "app/shared/data/search/ResultType";
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
    @observable
    private noResults = false;
    @observable
    private inProgress = false;

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
                            readOnly={this.inProgress}
                            type="text" autoComplete="off" autoCorrect="off" spellCheck={false}
                            placeholder={tr.get("search.box.placeholder")} />
                    </form>
                    </SearchBoxContainer>
                    <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForStandardView}}>
                        <Button
                            colors="primary"
                            Icon={!this.inProgress ? SearchIcon : SpinnerLite}
                            onClick={this.handleSubmit}
                        >
                            {tr.get("search.button.label")}
                        </Button>
                    </ResponsiveContainer>
                    <ResponsiveContainer behavior="show" forScreenWidth={{lowerThan: MinimumWidth.ForStandardView}}>
                        <IconButton
                            color={(theme) => theme.colors.copyIcon}
                            Icon={!this.inProgress ? SearchIcon : SpinnerLite}
                            onClick={this.handleSubmit}
                        />
                    </ResponsiveContainer>
                </Content>
            </InlineSearchContent>
            { this.noResults ?
            <NoResults inline>
                {tr.get("search.noResults.text")}
            </NoResults>
            : null }
            </>
        );
    }

    componentDidMount() {
        this.props.searchInlineStore.instancesCount++;
        document.addEventListener("paste", this.handlePaste);
    }

    componentWillUnmount() {
        this.props.searchInlineStore.instancesCount--;
        document.removeEventListener("paste", this.handlePaste);
    }

    private handlePaste = (e: ClipboardEvent) => {
        let activeEl = document.activeElement;
        if ((activeEl as HTMLInputElement).value !== void 0 || (activeEl as HTMLElement).isContentEditable) {
            // We ignore paste event on form or editable elements
            return;
        }

        let text = e.clipboardData!.getData("text/plain").trim();
        // Should be non-empty string and it should look like a hash or block number
        if (text && text.match(/^(0x)?[a-fA-F0-9]+$/)) {
            setTimeout(() => {
                this.searchBox.value = text;
                this.focusSearchBox();
            });
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
        let result = await this.props.search.search(query);
        if (result) {
            let url: string;

            if (result.type === ResultType.Account) {
                url = `page://aleth.io/account?accountHash=${query}`;
            } else if (result.type === ResultType.Block) {
                url = `page://aleth.io/block?blockNumber=${result.blockNumber}`;
            } else if (result.type === ResultType.Tx) {
                url = `page://aleth.io/tx?txHash=${query}`;
            } else if (result.type === ResultType.Uncle) {
                url = `page://aleth.io/uncle?uncleHash=${query}`;
            } else {
                throw new Error(`Unhandled result type "${result.type}"`);
            }

            runInAction(() => {
                this.inProgress = false;
            });
            if (!this.props.internalNav.goTo(url)) {
                this.handleNoResults();
                return;
            }
            if (this.props.onRequestClose) {
                this.props.onRequestClose();
            }
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

export const SearchInline = withInternalNav($SearchInline);
