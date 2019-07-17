import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxCounts } from "../ITxCounts";
import { TooltipRegular } from "@alethio/ui/lib/overlay/tooltip/TooltipRegular";
import { MessageSummaryCountBox } from "./MessageSummaryCountBox";
import { MsgCountInIcon } from "@alethio/ui/lib/icon/MsgCountInIcon";
import { MsgCountOutIcon } from "@alethio/ui/lib/icon/MsgCountOutIcon";
import { MsgCountPendingIcon } from "@alethio/ui/lib/icon/MsgCountPendingIcon";
import { NotAvailableBox } from "app/shared/component/NotAvailableBox";
import { AccountSummary } from "app/eth-extended/module/account/summary/component/AccountSummary";
import { IAccountDetails } from "app/eth-extended/data/account/details/IAccountDetails";
import { ILogger } from "plugin-api/ILogger";
import { CmLiteByAccountStore } from "app/eth-extended/data/contractMsg/lite/byAccount/CmLiteByAccountStore";
import { TxLiteByAccountStore } from "app/eth-extended/data/tx/lite/byAccount/TxLiteByAccountStore";

export interface ISummaryProps {
    accountDetails: IAccountDetails;
    translation: ITranslation;
    txCounts: ITxCounts;
    locale: string;
    ethSymbol: string;
    logger: ILogger;
    cmLiteByAccountStore: CmLiteByAccountStore;
    txLiteByAccountStore: TxLiteByAccountStore;
}

export class Summary extends React.Component<ISummaryProps> {
    render() {
        let {
            translation: tr, txCounts, locale, accountDetails: account, cmLiteByAccountStore, txLiteByAccountStore,
            ethSymbol
        } = this.props;

        if (account.isFresh) {
            return null;
        }

        return (
            <div style={{flex: "1 1 auto"}}>
                <LayoutRow>
                    <LayoutRowItem fullRow>
                        <Label>{tr.get("accountView.content.messageSummary.label")}</Label>
                        { txCounts ?
                            <>
                                <TooltipRegular
                                    content={tr.get("accountView.content.messageSummary.incoming.tooltip")}
                                >
                                    <MessageSummaryCountBox
                                        icon={<MsgCountInIcon />} count={txCounts.in} locale={locale} />
                                </TooltipRegular>
                                <TooltipRegular
                                    content={tr.get("accountView.content.messageSummary.outgoing.tooltip")}
                                >
                                    <MessageSummaryCountBox
                                        icon={<MsgCountOutIcon />} count={txCounts.out} locale={locale} />
                                </TooltipRegular>
                                <TooltipRegular
                                    content={tr.get("accountView.content.messageSummary.pending.tooltip")}
                                >
                                    <MessageSummaryCountBox
                                        icon={<MsgCountPendingIcon />} count={txCounts.pending}
                                        locale={locale}
                                    />
                                </TooltipRegular>
                            </>
                        : <NotAvailableBox translation={tr} /> }
                    </LayoutRowItem>
                </LayoutRow>
                <AccountSummary
                    account={account}
                    translation={tr}
                    locale={locale}
                    ethSymbol={ethSymbol}
                    logger={this.props.logger}
                    cmLiteByAccountStore={cmLiteByAccountStore}
                    txCounts={txCounts}
                    txLiteByAccountStore={txLiteByAccountStore}
                />
            </div>
        );
    }
}
