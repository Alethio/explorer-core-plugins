import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { NotAvailableBox } from "app/shared/component/NotAvailableBox";
import { IAccordionItemConfig } from "@alethio/ui/lib/control/accordion/IAccordionItemConfig";
import { ExpanderAccordion } from "@alethio/ui/lib/control/expander/ExpanderAccordion";
import { observable } from "mobx";
import { observer, Observer } from "mobx-react";
import { AccordionVertical, IAccordionVerticalProps } from "@alethio/ui/lib/control/accordion/AccordionVertical";
import { AccordionItem } from "@alethio/ui/lib/control/accordion/AccordionItem";
import { AccordionContentFrame } from "@alethio/ui/lib/control/accordion/AccordionContentFrame";
import { ThemeContext } from "plugin-api/ThemeContext";
import { AccordionItemContentStatus } from "@alethio/ui/lib/control/accordion/AccordionItemContentStatus";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { IAccountDetails } from "app/eth-extended/data/account/details/IAccountDetails";
import { TxLiteByAccountStore } from "app/eth-extended/data/tx/lite/byAccount/TxLiteByAccountStore";
import { TxsPendingGrid } from "app/eth-extended/module/account/summary/component/TxsPendingGrid";
import { CmGrid } from "app/eth-extended/module/account/summary/component/CmGrid";
import { TxsMinedGrid } from "app/eth-extended/module/account/summary/component/TxsMinedGrid";
import { ITxLiteByAccountMined } from "app/eth-extended/data/tx/lite/byAccount/mined/ITxLiteByAccountMined";
import { ICursor } from "app/eth-extended/data/contractMsg/lite/byAccount/ICursor";
import { CursorPaginatedView } from "app/shared/data/pagination/CursorPaginatedView";
import { OffsetPaginatedView } from "app/shared/data/pagination/OffsetPaginatedView";
import { ICmLiteByAccount } from "app/eth-extended/data/contractMsg/lite/byAccount/ICmLiteByAccount";
import { ILogger } from "plugin-api/ILogger";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { CmLiteByAccountStore } from "app/eth-extended/data/contractMsg/lite/byAccount/CmLiteByAccountStore";
import { ITxCounts } from "app/eth-extended/module/account/summary/ITxCounts";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

const GridRoot = styled.div`
    max-width: 100vw;
`;

const PAGINATION_PAGE_SIZE = 50;

interface IAccountSummaryItemConfig extends IAccordionItemConfig {
    label: string;
    value(): number;
}

export interface IAccountSummaryProps {
    account: IAccountDetails;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
    ethSymbol: string;
    cmLiteByAccountStore: CmLiteByAccountStore;
    txLiteByAccountStore: TxLiteByAccountStore;
    txCounts: ITxCounts | undefined;
}

@observer
export class AccountSummary extends React.Component<IAccountSummaryProps> {
    @observable.shallow
    private items: React.ReactNode;

    constructor(props: IAccountSummaryProps) {
        super(props);

        this.items = this.buildItems(this.props.account);
    }

    componentDidUpdate(prevProps: IAccountSummaryProps) {
        if (this.props.account.address !== prevProps.account.address ||
            this.props.account.countContractMsgIn !== prevProps.account.countContractMsgIn ||
            this.props.account.countContractMsgOut !== prevProps.account.countContractMsgOut ||
            JSON.stringify(this.props.txCounts) !== JSON.stringify(prevProps.txCounts) ||
            this.props.translation !== prevProps.translation
        ) {
            this.items = this.buildItems(this.props.account);
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
        return <ExpanderAccordion
            label={config.label}
            value={config.value()}
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
                {(theme: ITheme) =>
                    <AccordionContentFrame
                        arrowPosition={arrowPosition}
                        backgroundColor={theme.colors.gridEvenRowBg}
                        borderColor={theme.colors.gridBorder}
                        noBorder
                    >{content}</AccordionContentFrame>
                }
            </ThemeContext.Consumer>
        );
    }

    private buildItems(account: IAccountDetails) {
        let tr = this.props.translation;
        let { txCounts } = this.props;

        if (!txCounts) {
            return null;
        }

        let items = <>
            <AccordionItem<IAccountSummaryItemConfig>
                label={tr.get("accountView.content.accountSummary.contractMessages.label")}
                value={() => account.countContractMsgIn + account.countContractMsgOut}
                content={async () => {
                    let paginatedView = new CursorPaginatedView<ICmLiteByAccount, ICursor>(
                        {
                            fetch: (atCursor: ICursor, limit: number) =>
                                this.props.cmLiteByAccountStore.fetch(account.address, atCursor, limit)
                        },
                        {
                            blockNo: account.countsBlockNumber + 1,
                            blockMsgValidationIndex: 0
                        },
                        PAGINATION_PAGE_SIZE,
                        (item) => ({
                            blockNo: item.block.id,
                            blockMsgValidationIndex: item.blockMsgValidationIndex
                        })
                    );

                    // Pre-fetch
                    await paginatedView.loadFirstPage();
                    return <GridRoot>
                        <CmGrid
                            itemCount={account.countContractMsgIn + account.countContractMsgOut}
                            paginatedView={paginatedView}
                            accountAddress={account.address}
                            translation={tr}
                            locale={this.props.locale}
                            ethSymbol={this.props.ethSymbol}
                            logger={this.props.logger}
                        />
                    </GridRoot>;
                }}
            />
            <AccordionItem<IAccountSummaryItemConfig>
                label={tr.get("accountView.content.accountSummary.pendingTransactions.label")}
                value={() => this.props.txCounts!.pending}
                content={async () => {
                    let paginatedView = new OffsetPaginatedView(
                        {
                            fetch: (offset, limit) => this.props.txLiteByAccountStore.fetchPending(
                                account.address, offset, limit
                            )
                        },
                        0,
                        PAGINATION_PAGE_SIZE
                    );
                    // Pre-fetch
                    await paginatedView.loadFirstPage();

                    // Observer for changing txCounts
                    return <Observer>
                        {() => <GridRoot>
                            <TxsPendingGrid
                                accountAddress={account.address}
                                paginatedView={paginatedView}
                                itemCount={this.props.txCounts!.pending}
                                translation={tr}
                                locale={this.props.locale}
                                ethSymbol={this.props.ethSymbol}
                                logger={this.props.logger}
                            />
                        </GridRoot>}
                    </Observer>;
                }}
            />
            <AccordionItem<IAccountSummaryItemConfig>
                label={tr.get("accountView.content.accountSummary.minedTransactions.label")}
                value={() => this.props.txCounts!.in + this.props.txCounts!.out}
                content={async () => {
                    let paginatedView = new CursorPaginatedView<
                        ITxLiteByAccountMined, ICursor | undefined
                    >(
                        {
                            fetch: (atCursor, limit) => this.props.txLiteByAccountStore.fetchMined(
                                account.address, atCursor, limit
                            )
                        },
                        void 0,
                        PAGINATION_PAGE_SIZE,
                        (item) => ({
                            blockNo: item.block.id,
                            blockMsgValidationIndex: item.blockMsgValidationIndex
                        })
                    );
                    // Pre-fetch
                    await paginatedView.loadFirstPage();
                    return <GridRoot>
                        <TxsMinedGrid
                            paginatedView={paginatedView}
                            itemCount={this.props.txCounts!.in + this.props.txCounts!.out}
                            accountAddress={account.address}
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
