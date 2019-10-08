import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { AccountSummary } from "./AccountSummary";
import { ILogger } from "plugin-api/ILogger";
import { TxLiteByAccountStore } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStore";

export interface ISummaryProps {
    accountHash: string;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    logger: ILogger;
    latestBlockNumber: number;
    txLiteByAccountStore: TxLiteByAccountStore;
}

export class Summary extends React.Component<ISummaryProps> {
    render() {
        let {
            translation: tr, locale, txLiteByAccountStore, accountHash,
            ethSymbol
        } = this.props;

        return (
            <div style={{flex: "1 1 auto"}}>
                <AccountSummary
                    accountHash={accountHash}
                    translation={tr}
                    locale={locale}
                    ethSymbol={ethSymbol}
                    logger={this.props.logger}
                    latestBlockNumber={this.props.latestBlockNumber}
                    txLiteByAccountStore={txLiteByAccountStore}
                />
            </div>
        );
    }
}
