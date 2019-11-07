import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { ThemeContext } from "plugin-api/ThemeContext";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { NotAvailableBox } from "app/shared/component/NotAvailableBox";
import { IAccordionItemConfig } from "@alethio/ui/lib/control/accordion/IAccordionItemConfig";
import { Expander } from "@alethio/ui/lib/control/expander/Expander";
import { AccordionVertical, IAccordionVerticalProps } from "@alethio/ui/lib/control/accordion/AccordionVertical";
import { AccordionItem } from "@alethio/ui/lib/control/accordion/AccordionItem";
import { AccordionContentFrame } from "@alethio/ui/lib/control/accordion/AccordionContentFrame";
import { AccordionItemContentStatus } from "@alethio/ui/lib/control/accordion/AccordionItemContentStatus";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { LogEvents } from "app/shared/module/tx/txSummary/component/LogEvents";
import { ILogger } from "plugin-api/ILogger";
import { LayoutSection } from "@alethio/ui/lib/layout/content/LayoutSection";
import { LogEventsStore } from "app/eth-memento/data/logEvents/LogEventsStore";
import { isMementoTxDetails } from "app/eth-memento/data/tx/details/isMementoTxDetails";

interface ITxSummaryItemConfig extends IAccordionItemConfig {
    label: string;
    value: number;
    /** Header element shown beside the expander box */
    header?: React.ReactNode;
    backgroundColor?(theme: ITheme): string;
    borderColor?(theme: ITheme): string;
}

export interface ITxSummaryProps {
    tx: ITxDetails;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    logEventsStore: LogEventsStore;
    logger: ILogger;
}

@observer
export class TxSummary extends React.Component<ITxSummaryProps> {
    @observable.shallow
    private items: React.ReactNode;

    constructor(props: ITxSummaryProps) {
        super(props);

        window.addEventListener("resize", this.handleResize);
        this.handleResize();
        this.items = this.buildItems(this.props.tx);
    }

    componentDidUpdate(prevProps: ITxSummaryProps) {
        if (this.props.tx !== prevProps.tx || this.props.translation !== prevProps.translation) {
            this.items = this.buildItems(this.props.tx);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    private handleResize = () => {
        this.items = this.buildItems(this.props.tx);
    }

    render() {
        const { translation: tr } = this.props;

        return <LayoutSection useWrapper>
            <AccordionVertical
                label={tr.get("txView.content.txSummary.label")}
                noDataContent={<NotAvailableBox translation={tr} />}
                renderExpander={this.renderExpander}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                loadingText={`${tr.get("general.loading")}...`}
                errorText={tr.get("general.error")}
                onContentError={(e, item) => {
                    this.props.logger.error(`Couldn't load content for tx summary tab #${item.index}`, e);
                }}
            >
                {this.items}
            </AccordionVertical>
        </LayoutSection>;
    }

    private renderExpander: IAccordionVerticalProps<ITxSummaryItemConfig>["renderExpander"] =
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

    private renderHeader: IAccordionVerticalProps<ITxSummaryItemConfig>["renderHeader"] =
    ({config}) => {
        return config.header;
    }

    private renderContent: IAccordionVerticalProps<ITxSummaryItemConfig>["renderContent"] =
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
                        borderColor={config.borderColor && config.borderColor(theme) || theme.colors.gridBorder}
                        noBorder={!config.borderColor}
                    >{content}</AccordionContentFrame>
                }
            </ThemeContext.Consumer>
        );
    }

    private buildItems(tx: ITxDetails) {
        let { translation: tr } = this.props;

        let items = !isMementoTxDetails(tx) ? null : <>
            <AccordionItem<ITxSummaryItemConfig>
                label={tr.get("txView.content.txSummary.logEvents.label")}
                value={tx.logEventsCount}
                content={async () => {
                    let logEvents = await this.props.logEventsStore.fetchByTx(this.props.tx.hash);
                    return <LogEvents translation={tr} data={logEvents} />;
                }}
                backgroundColor={theme => theme.colors.logEventsSectionBg}
                borderColor={theme => theme.colors.logEventsBorder}
            />
        </>;

        return items;
    }
}
