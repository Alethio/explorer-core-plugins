import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { ITranslation } from "plugin-api/ITranslation";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { SourceCodeAsyncRenderer } from "app/shared/component/sourceCode/SourceCodeAsyncRenderer";
import { SourceCodeSection } from "app/eth-extended/module/account/contract/component/SourceCodeSection";
import { ConstructorArgsSection } from "./ConstructorArgsSection";
import { IContractAccountDetails } from "app/eth-extended/data/account/details/IContractAccountDetails";
import { ContractDetailsStore } from "app/eth-extended/data/contract/ContractDetailsStore";
import { StringData } from "@alethio/ui/lib/data/StringData";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { ReadContractSection } from "app/eth-extended/module/account/contract/component/ReadContractSection";
import { ContractWeb3Api } from "app/eth-extended/data/contract/ContractWeb3Api";
import { ILogger } from "plugin-api/ILogger";
import { AccountCodeRenderer } from "app/shared/component/sourceCode/AccountCodeRenderer";
import { ContractAccordion, IContractAccordionItemConfig } from "app/shared/component/sourceCode/ContractAccordion";
import { AccordionItem } from "@alethio/ui/lib/control/accordion/AccordionItem";

const ACCORDION_CONTENT_HEIGHT = 500;

export interface IContractDetailsProps {
    accountDetails: IContractAccountDetails;
    contractDetailsStore: ContractDetailsStore;
    contractWeb3Api: ContractWeb3Api;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
    accordionExtraItems: JSX.Element[] | undefined;
}

export class ContractDetails extends React.PureComponent<IContractDetailsProps> {
    render() {
        let { translation: tr, accountDetails, locale, logger } = this.props;
        let contractId = accountDetails.contractId;
        let sourceCodeAsyncRenderer = new SourceCodeAsyncRenderer(ACCORDION_CONTENT_HEIGHT);

        return <>
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.contract.compilerVersion.label")}</Label>
                    <ValueBox>{accountDetails.compilerVersion || "-"}</ValueBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.contract.optimizer.label")}</Label>
                    <ValueBox>{
                        accountDetails.optimizerEnabled !== void 0 ?
                            ( accountDetails.optimizerEnabled ?
                                tr.get("accountView.contract.optimizer.value.yes") :
                                tr.get("accountView.contract.optimizer.value.no")
                            ) : "-"
                    }</ValueBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.contract.runs.label")}</Label>
                    <ValueBox>{
                        accountDetails.optimizerRuns !== void 0 ?
                            accountDetails.optimizerRuns :
                            "-"
                        }</ValueBox>
                </LayoutRowItem>
            </LayoutRow>
            { accountDetails.swarmSource ?
            <LayoutRow>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.contract.swarmSource.label")}</Label>
                    <StringData>{accountDetails.swarmSource}</StringData>
                </LayoutRowItem>
            </LayoutRow>
            : null }
            <ContractAccordion
                contentHeight={ACCORDION_CONTENT_HEIGHT}
                locale={locale}
                translation={tr}
                logger={logger}
            >
                <AccordionItem<IContractAccordionItemConfig>
                    label={tr.get("accountView.contract.sourceCode.label")}
                    disabled={!accountDetails.hasContractSourceCode}
                    content={async () => {
                        let [sourceCode] = await Promise.all([
                            this.props.contractDetailsStore.fetchSourceCode(contractId)
                                .then(s => {
                                    if (!s) {
                                        throw new Error(`Server returned empty source code`);
                                    }
                                    return s;
                                }),
                            sourceCodeAsyncRenderer.load()
                        ]);

                        let sourceCodeEl = sourceCodeAsyncRenderer.render(sourceCode, "sol");

                        return <SourceCodeSection
                            sourceCode={sourceCode}
                            sourceCodeElement={sourceCodeEl}
                            contractAddress={accountDetails.address}
                            dataSource={accountDetails.contractDataSource}
                            translation={tr}
                        />;
                    }}
                />,
                <AccordionItem<IContractAccordionItemConfig>
                    label={tr.get("accountView.contract.abis.label")}
                    disabled={!accountDetails.hasContractAbi}
                    content={async () => {
                        let [contractAbi] = await Promise.all([
                            this.props.contractDetailsStore.fetchAbi(contractId)
                                .then(abi => {
                                    let abiRawData = abi.getRawData();
                                    if (!abiRawData) {
                                        throw new Error(`Server returned empty ABI`);
                                    }
                                    return abiRawData;
                                }),
                            sourceCodeAsyncRenderer.load()
                        ]);

                        // Format/prettify JSON
                        let formattedAbi = JSON.stringify(contractAbi, void 0, "\t");
                        let sourceCodeEl = sourceCodeAsyncRenderer.render(formattedAbi, "json");

                        return <SourceCodeSection
                            sourceCode={formattedAbi}
                            sourceCodeElement={sourceCodeEl}
                            contractAddress={accountDetails.address}
                            dataSource={accountDetails.contractDataSource}
                            translation={tr}
                        />;
                    }}
                />,
                <AccordionItem<IContractAccordionItemConfig>
                    label={tr.get("accountView.contract.accountCode.label")}
                    disabled={!accountDetails.hasContractAccountCode}
                    content={async () => {
                        return new AccountCodeRenderer(sourceCodeAsyncRenderer).render(
                            () => this.props.contractDetailsStore.fetchAccountCode(contractId)
                                .then(code => {
                                    if (!code) {
                                        throw new Error(`Server returned no account code`);
                                    }
                                    return code;
                                }),
                            tr
                        );
                    }}
                />,
                <AccordionItem<IContractAccordionItemConfig>
                    label={tr.get("accountView.contract.arguments.label")}
                    disabled={!accountDetails.constructorArgs.length}
                    content={async () => {
                        if (!accountDetails.constructorArgs.length) {
                            return <ErrorBox colors="secondary">
                                {this.props.translation.get("accountView.contract.arguments.noArguments.label")}
                            </ErrorBox>;
                        }
                        let constructorArgsRaw = accountDetails.constructorArgs.join("");
                        let constructorArgsFormatted = accountDetails.constructorArgs
                            .map((a, i) => `Arg [${i}] : ${a}`)
                            .join("\n");

                        await sourceCodeAsyncRenderer.load();
                        let byteCodeEl = sourceCodeAsyncRenderer.render(
                            constructorArgsRaw,
                            "",
                            { wordWrap: "on", lineNumbers: "off" }
                        );
                        let decodedArgsEl = sourceCodeAsyncRenderer.render(constructorArgsFormatted, "");

                        return <ConstructorArgsSection
                            byteCode={constructorArgsRaw}
                            byteCodeElement={byteCodeEl}
                            decodedArgs={constructorArgsFormatted}
                            decodedArgsElement={decodedArgsEl}
                            translation={tr}
                        />;
                    }}
                />,
                <AccordionItem<IContractAccordionItemConfig>
                    label={tr.get("accountView.contract.read.label")}
                    disabled={!accountDetails.hasContractAbi}
                    content={async () => {
                        let contractAbi = await this.props.contractDetailsStore.fetchAbi(contractId);
                        return <ReadContractSection
                            abi={contractAbi}
                            contractAddress={accountDetails.address}
                            contractWeb3Api={this.props.contractWeb3Api}
                            translation={tr}
                            logger={this.props.logger}
                        />;
                    }}
                />
                {this.props.accordionExtraItems}
            </ContractAccordion>
        </>;
    }
}
