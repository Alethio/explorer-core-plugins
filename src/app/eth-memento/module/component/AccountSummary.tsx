import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { NotAvailableBox } from "app/shared/component/NotAvailableBox";
import { IAccordionItemConfig } from "@alethio/ui/lib/control/accordion/IAccordionItemConfig";
import { Expander } from "@alethio/ui/lib/control/expander/Expander";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { AccordionVertical, IAccordionVerticalProps } from "@alethio/ui/lib/control/accordion/AccordionVertical";
import { AccordionItem } from "@alethio/ui/lib/control/accordion/AccordionItem";
import { AccordionContentFrame } from "@alethio/ui/lib/control/accordion/AccordionContentFrame";
import { ThemeContext } from "plugin-api/ThemeContext";
import { AccordionItemContentStatus } from "@alethio/ui/lib/control/accordion/AccordionItemContentStatus";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { TxLiteByAccountStore } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStore";
import { TxsGrid } from "./TxsGrid";
import { ITxLiteByAccount } from "app/eth-memento/data/tx/byAccount/ITxLiteByAccount";
import { ICursor } from "app/eth-memento/data/tx/byAccount/ICursor";
import { CursorInfinitePaginatedView } from "../pagination/CursorInfinitePaginatedView";
import { ILogger } from "plugin-api/ILogger";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { CursorPaginatedView } from "app/shared/data/pagination/CursorPaginatedView";

const GridRoot = styled.div`
    max-width: 100vw;
`;

const PAGINATION_PAGE_SIZE = 50;

interface IAccountSummaryItemConfig extends IAccordionItemConfig {
    label: string;
}

export interface IAccountSummaryProps {
    accountHash: string;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
    ethSymbol: string;
    latestBlockNumber: number;
    txLiteByAccountStore: TxLiteByAccountStore;
}

@observer
export class AccountSummary extends React.Component<IAccountSummaryProps> {
    @observable.shallow
    private items: React.ReactNode;

    constructor(props: IAccountSummaryProps) {
        super(props);

        this.items = this.buildItems(this.props.accountHash, this.props.latestBlockNumber);
    }

    componentDidUpdate(prevProps: IAccountSummaryProps) {
        if (this.props.accountHash !== prevProps.accountHash ||
            this.props.translation !== prevProps.translation
        ) {
            this.items = this.buildItems(this.props.accountHash, this.props.latestBlockNumber);
        }
    }

    render() {
        const { translation: tr } = this.props;

        return <AccordionVertical
            label={tr.get("accountView.content.accountSummary.label")}
            noDataContent={<NotAvailableBox translation={tr} />}
            renderExpander={this.renderExpander}
            renderContent={this.renderContent}
            loadingText={`${tr.get("general.loading")}...`}
            errorText={tr.get("general.error")}
            onContentError={(e, item) => {
                this.props.logger.error(`Couldn't load content for account summary tab #${item.index}`, e);
            }}
        >
            {this.items}
        </AccordionVertical>;
    }

    private renderExpander: IAccordionVerticalProps<IAccountSummaryItemConfig>["renderExpander"] =
    ({config, isOpen, onClick, onResize, isFullWidth}) => {
        return <Expander
            label={config.label}
            open={isOpen}
            onClick={onClick}
            onResize={onResize}
            fullWidth={isFullWidth}
            locale={this.props.locale}
        />;
    }

    private renderContent: IAccordionVerticalProps<IAccountSummaryItemConfig>["renderContent"] =
    ({ content, status, arrowPosition }) => {
        if (status !== AccordionItemContentStatus.Loaded) {
            return <LayoutRow>
                <LayoutRowItem>
                    <Label></Label>
                    {content}
                </LayoutRowItem>
            </LayoutRow>;
        }

        return (
            <ThemeContext.Consumer>
                {(theme) =>
                    <AccordionContentFrame
                        arrowPosition={arrowPosition ? arrowPosition + theme.spacing.sidebarWidth : void 0}
                        backgroundColor={theme.colors.gridEvenRowBg}
                        borderColor={theme.colors.gridBorder}
                        noBorder
                    >{content}</AccordionContentFrame>
                }
            </ThemeContext.Consumer>
        );
    }

    private buildItems(accountHash: string, latestBlockNumber: number) {
        let tr = this.props.translation;

        let items = <>
            <AccordionItem<IAccountSummaryItemConfig>
                label={tr.get("accountView.content.accountSummary.minedTransactions.label")}
                content={async () => {
                    let paginatedView = new CursorInfinitePaginatedView<
                        ITxLiteByAccount, ICursor
                    >(
                        new CursorPaginatedView(
                            {
                                fetch: (atCursor, limit) => this.props.txLiteByAccountStore.fetch(
                                    accountHash, atCursor, limit
                                )
                            },
                            {
                                blockNo: latestBlockNumber,
                                txIndex: 0
                            },
                            PAGINATION_PAGE_SIZE,
                            (item) => ({
                                blockNo: item.block.id,
                                txIndex: item.txIndex
                            })
                        )
                    );
                    // Pre-fetch
                    await paginatedView.loadFirstPage();
                    return <GridRoot>
                        <TxsGrid
                            paginatedView={paginatedView}
                            accountAddress={accountHash}
                            translation={tr}
                            locale={this.props.locale}
                            ethSymbol={this.props.ethSymbol}
                            logger={this.props.logger}
                        />
                    </GridRoot>;
                }}
            />
        </>;

        return items;
    }
}
