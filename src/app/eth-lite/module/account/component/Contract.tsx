import * as React from "react";
import { ResponsiveContainer, MinimumWidth } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";
import { ITranslation } from "plugin-api/ITranslation";
import { ILogger } from "plugin-api/ILogger";
import { IAccountDetails } from "app/eth-lite/data/account/IAccountDetails";
import { ContractDetails } from "./ContractDetails";

export interface IContractProps {
    locale: string;
    translation: ITranslation;
    accountDetails: IAccountDetails;
    logger: ILogger;
}

export class Contract extends React.PureComponent<IContractProps> {

    render() {
        let locale = this.props.locale;
        let tr = this.props.translation;
        let account = this.props.accountDetails;

        return account.accountCode ?
            <ResponsiveContainer behavior="hide" forScreenWidth={{lowerThan: MinimumWidth.ForFullView}}>
                <ContractDetails
                    accountCode={account.accountCode}
                    translation={tr}
                    locale={locale}
                    logger={this.props.logger}
                />
            </ResponsiveContainer>
        : null;
    }
}
