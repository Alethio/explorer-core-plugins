import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { ThemeContext } from "plugin-api/ThemeContext";
import { ITranslation } from "plugin-api/ITranslation";
import { NotAvailableBox } from "app/shared/component/NotAvailableBox";
import { IAccordionItemConfig } from "@alethio/ui/lib/control/accordion/IAccordionItemConfig";
import { Expander } from "@alethio/ui/lib/control/expander/Expander";
import { TokenTransfersGrid } from "app/eth-extended/module/tx/txSummary/component/TokenTransfersGrid";
import { CmGrid } from "app/eth-extended/module/tx/txSummary/component/CmGrid";
import { AccordionVertical, IAccordionVerticalProps } from "@alethio/ui/lib/control/accordion/AccordionVertical";
import { AccordionItem } from "@alethio/ui/lib/control/accordion/AccordionItem";
import { AccordionContentFrame } from "@alethio/ui/lib/control/accordion/AccordionContentFrame";
import { CmLiteStore } from "app/eth-extended/data/contractMsg/lite/CmLiteStore";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";
import { AccordionItemContentStatus } from "@alethio/ui/lib/control/accordion/AccordionItemContentStatus";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { TokenTransferStore } from "app/eth-extended/data/token/transfer/TokenTransferStore";
import { LogEventsStore } from "app/eth-extended/data/logEvents/LogEventsStore";
import { LogEvents } from "app/eth-extended/module/tx/txSummary/component/LogEvents";
import { ILogger } from "plugin-api/ILogger";

interface ICmSummaryItemConfig extends IAccordionItemConfig {
    label: string;
    value: number;
    backgroundColor?(theme: ITheme): string;
    borderColor?(theme: ITheme): string;
}

export interface ICmSummaryProps {
    cm: ICmDetails;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    logger: ILogger;
    tokenTransferStore: TokenTransferStore;
    cmLiteStore: CmLiteStore;
    logEventsStore: LogEventsStore;
}

@observer
export class CmSummary extends React.Component<ICmSummaryProps> {
    @observable.shallow
    private items: React.ReactNode;

    constructor(props: ICmSummaryProps) {
        super(props);

        this.items = this.buildItems(this.props.cm);
    }

    componentDidUpdate(prevProps: ICmSummaryProps) {
        if (this.props.cm !== prevProps.cm || this.props.translation !== prevProps.translation) {
            this.items = this.buildItems(this.props.cm);
        }
    }

    render() {
        const { translation: tr } = this.props;

        return <AccordionVertical
            label={tr.get("cmView.content.cmSummary.label")}
            noDataContent={<NotAvailableBox translation={tr} />}
            renderExpander={this.renderExpander}
            renderContent={this.renderContent}
            loadingText={`${tr.get("general.loading")}...`}
            errorText={tr.get("general.error")}
            onContentError={(e, item) => {
                this.props.logger.error(`Couldn't load content for cm summary tab #${item.index}`, e);
            }}
        >
            {this.items}
        </AccordionVertical>;
    }

    private renderExpander: IAccordionVerticalProps<ICmSummaryItemConfig>["renderExpander"] =
    ({config, isOpen, onClick, isFullWidth}) => {
        return <Expander
            label={config.label}
            value={config.value}
            open={isOpen}
            onClick={onClick}
            fullWidth={isFullWidth}
            locale={this.props.locale}
        />;
    }

    private renderContent: IAccordionVerticalProps<ICmSummaryItemConfig>["renderContent"] =
    ({ content, status, arrowPosition, config }) => {
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
                        backgroundColor={
                            config.backgroundColor && config.backgroundColor(theme) || theme.colors.gridEvenRowBg}
                        borderColor={
                            config.borderColor && config.borderColor(theme) || theme.colors.gridBorder}
                        noBorder={!config.borderColor}
                    >{content}</AccordionContentFrame>
                }
            </ThemeContext.Consumer>
        );
    }

    private buildItems(cm: ICmDetails) {
        let { translation: tr, ethSymbol } = this.props;

        let items = <>
            <AccordionItem<ICmSummaryItemConfig>
                label={tr.get("cmView.content.cmSummary.contractMessages.label")}
                value={cm.msgsTriggered}
                content={async () => {
                    let contractMsgs = await this.props.cmLiteStore.fetchByCm(cm.txHash, cm.txValidationIndex);
                    return <CmGrid
                        items={contractMsgs} translation={tr} locale={this.props.locale} ethSymbol={ethSymbol}
                    />;
                }}
            />
            <AccordionItem<ICmSummaryItemConfig>
                label={tr.get("txView.content.txSummary.tokenTransfers.label")}
                value={cm.tokenTransferCount}
                content={async () => {
                    let tokenTransfers = await this.props.tokenTransferStore.fetchByCm(cm.txHash, cm.txValidationIndex);
                    return <TokenTransfersGrid items={tokenTransfers} translation={tr} locale={this.props.locale} />;
                }}
            />
            <AccordionItem<ICmSummaryItemConfig>
                label={tr.get("txView.content.txSummary.logEvents.label")}
                value={cm.logEventsCount}
                content={async () => {
                    let logEvents = await this.props.logEventsStore.fetchByCm(cm.txHash, cm.txValidationIndex);
                    return <LogEvents translation={tr} data={logEvents} />;
                }}
                backgroundColor={theme => theme.colors.logEventsSectionBg}
                borderColor={theme => theme.colors.logEventsBorder}
            />
        </>;

        return items;
    }
}
