import * as React from "react";
import { IAccountDetails } from "app/eth-extended/data/account/details/IAccountDetails";
import { ITranslation } from "plugin-api/ITranslation";
import { ContractDetails } from "app/eth-extended/module/account/contract/component/ContractDetails";
import { isContractAccountDetails } from "app/eth-extended/data/account/details/isContractAccountDetails";
import { ContractDetailsStore } from "app/eth-extended/data/contract/ContractDetailsStore";
import { ContractWeb3Api } from "app/eth-extended/data/contract/ContractWeb3Api";
import { ILogger } from "plugin-api/ILogger";
import { ResponsiveContainer } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";

export interface IContractProps {
    locale: string;
    translation: ITranslation;
    accountHash: string;
    accountDetails: IAccountDetails;
    contractDetailsStore: ContractDetailsStore;
    contractWeb3Api: ContractWeb3Api;
    logger: ILogger;
    accordionExtraItems: JSX.Element[] | undefined;
}

export class Contract extends React.PureComponent<IContractProps> {

    render() {
        let locale = this.props.locale;
        let tr = this.props.translation;
        let account = this.props.accountDetails;

        return isContractAccountDetails(account) ?
            <ResponsiveContainer behavior="hide" mediaQuery={theme => theme.media.mAndBelow}>
                <ContractDetails
                    accountDetails={account}
                    contractDetailsStore={this.props.contractDetailsStore}
                    contractWeb3Api={this.props.contractWeb3Api}
                    translation={tr}
                    locale={locale}
                    logger={this.props.logger}
                    accordionExtraItems={this.props.accordionExtraItems}
                />
            </ResponsiveContainer>
        : null;
    }
}
