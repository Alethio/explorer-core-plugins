import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { AccountBalance } from "app/eth-extended/data/account/balance/AccountBalance";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { AccountType } from "app/shared/data/account/AccountType";
import { AccountTypeBox } from "@alethio/explorer-ui/lib/box/account/AccountTypeBox";
import { NumberBox } from "@alethio/ui/lib/data/box/NumberBox";
import { CurrencyBox } from "@alethio/ui/lib/data/box/CurrencyBox";
import { AccountAliasBox } from "@alethio/explorer-ui/lib/box/account/AccountAliasBox";
import { AccountMinedBlocksBox } from "@alethio/explorer-ui/lib/box/account/AccountMinedBlocksBox";
import { UnclesCountBox } from "@alethio/explorer-ui/lib/box/block/UnclesCountBox";
import { QrCodeBox } from "@alethio/explorer-ui/lib/qrCode/QrCodeBox";
import { TotalPortfolio } from "./TotalPortfolio";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { CmIdBox } from "app/eth-extended/component/box/cm/CmIdBox";
import { isPrecompiledAccountDetails } from "../../../../data/account/details/isPrecompiledAccountDetails";
import { isProtocolAccountDetails } from "../../../../data/account/details/isProtocolAccountDetails";
import { AccountMeta } from "./AccountMeta";
import { ITranslation } from "plugin-api/ITranslation";
import { IAccountDetails } from "../../../../data/account/details/IAccountDetails";
import { ILogger } from "plugin-api/ILogger";
import { ITotalBalance } from "app/eth-extended/data/account/balance/ITotalBalance";
import { IAsyncData } from "plugin-api/IAsyncData";

export interface IAccountDetailsProps {
    accountHash: string;
    accountDetails: IAccountDetails;
    latestBalance: IAsyncData<AccountBalance>;
    totalBalance: ITotalBalance | undefined;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    usdPricesEnabled: boolean;
    logger: ILogger;
}

export class AccountDetails extends React.PureComponent<IAccountDetailsProps> {
    render() {
        let { translation: tr, accountDetails: account, locale, latestBalance, totalBalance, ethSymbol } = this.props;

        return <>
            <LayoutRow minWidth={660}>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.accountHash.label")}</Label>
                    <AddressHashBox noLink>
                        {this.props.accountHash}
                    </AddressHashBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.accountType.label")}</Label>
                    <AccountTypeBox>
                        { (() => {
                            if (isPrecompiledAccountDetails(account)) {
                                return tr.get("accountView.type.Precompiled");
                            }

                            if (isProtocolAccountDetails(account)) {
                                return tr.get("accountView.type.Protocol");
                            }
                            return tr.get("accountView.type." + AccountType[account.type]);
                        })()
                        }
                    </AccountTypeBox>
                    <QrCodeBox value={"0x" + this.props.accountHash} logger={this.props.logger} />
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow minWidth={960}>
                { account.alias ?
                <LayoutRowItem>
                    <Label>{ isPrecompiledAccountDetails(account) ?
                        tr.get("accountView.content.functionName.label") :
                        tr.get("accountView.content.alias.label")
                    }</Label>
                    <AccountAliasBox>{ account.alias }</AccountAliasBox>
                </LayoutRowItem>
                : null }
                { /**
                   * The two conditions below are to hide mined block and mined uncles
                   * because database inconsistency.
                   * TODO: Remove the conditions when the problem is fixed in db
                   */ }
                { false ?
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.minedBlocks.label")}</Label>
                    <AccountMinedBlocksBox locale={locale}>
                        { account.countMinedBlocks }
                    </AccountMinedBlocksBox>
                </LayoutRowItem>
                : null }
                { false ?
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.uncles.label")}</Label>
                    <UnclesCountBox locale={locale}>{ account.countMinedUncles }</UnclesCountBox>
                </LayoutRowItem>
                : null }
                { account.nonce !== void 0 ?
                <LayoutRowItem>
                    <Label>{tr.get("general.nonce")}</Label>
                    <NumberBox value={account.nonce} locale={locale} />
                </LayoutRowItem>
                : null }
            </LayoutRow>
            <AccountMeta locale={locale} translation={tr} account={account} ethSymbol={ethSymbol} />
            { account.createdAtBlock ?
            <LayoutRow minWidth={960}>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.createdAt.label")}</Label>
                    <BlockNumberBox>{account.createdAtBlock}</BlockNumberBox>
                </LayoutRowItem>
                { account.createdInMsg || account.createdInTx ?
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.createdOn.label")}</Label>
                    { account.createdInTx ?
                    <TxHashBox>{account.createdInTx}</TxHashBox>
                    : account.createdInMsg ?
                    <CmIdBox
                        txHash={account.createdInMsg.txHash}
                        txValidationIndex={account.createdInMsg.txValidationIndex}
                    />
                    : null }
                </LayoutRowItem>
                : null }
                { account.createdByAccount ?
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.createdBy.label")}</Label>
                    <AddressHashBox>{account.createdByAccount}</AddressHashBox>
                </LayoutRowItem>
                : null }
            </LayoutRow>
            : null}
            { account.tokenMeta ?
            <LayoutRow minWidth={960}>
                { account.tokenMeta.name ?
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.tokenName.label")}</Label>
                    <ValueBox>{account.tokenMeta.name}</ValueBox>
                </LayoutRowItem>
                : null }
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.tokenDecimals.label")}</Label>
                    <ValueBox>{account.tokenMeta.decimals}</ValueBox>
                </LayoutRowItem>
                { account.tokenMeta.totalSupply !== void 0 ?
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.tokenSupply.label")}</Label>
                    <CurrencyBox value={
                        account.tokenMeta.totalSupply.shiftedBy(-account.tokenMeta.decimals)
                    } symbol={account.tokenMeta.symbol} locale={locale} />
                </LayoutRowItem>
                : null }
            </LayoutRow>
            : null }
            { account.tokenTypes ?
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.tokenTypes.label")}</Label>
                    { account.tokenTypes.map(t => <ValueBox key={t}>{t}</ValueBox>)}
                </LayoutRowItem>
            </LayoutRow>
            : null }
            { this.props.usdPricesEnabled ?
            <TotalPortfolio
                latestBalance={latestBalance}
                totalBalance={totalBalance}
                isFreshAccount={!!account.isFresh}
                translation={tr}
                locale={locale}
                ethSymbol={ethSymbol}
            /> : null }
        </>;
    }
}
