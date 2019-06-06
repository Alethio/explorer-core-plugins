import * as React from "react";
import {
    AccordionHorizontal, IAccordionHorizontalProps
} from "@alethio/ui/lib/control/accordion/AccordionHorizontal";
import { Expander } from "@alethio/ui/lib/control/expander/Expander";
import { IAccordionItemConfig } from "@alethio/ui/lib/control/accordion/IAccordionItemConfig";
import { AccordionContentFrame } from "@alethio/ui/lib/control/accordion/AccordionContentFrame";
import { ScrollIntoView } from "@alethio/ui/lib/util/react/ScrollIntoView";
import { AccordionItemContentStatus } from "@alethio/ui/lib/control/accordion/AccordionItemContentStatus";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { ILogger } from "plugin-api/ILogger";
import { ThemeContext } from "plugin-api/ThemeContext";
import { ITranslation } from "plugin-api/ITranslation";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { NotAvailableBox } from "app/shared/component/NotAvailableBox";
import { LoadingBox } from "app/shared/component/LoadingBox";

const CONTENT_ANIM_SECONDS = .2;

const ExpanderWrapper = styled.div`
    &:first-child {
        margin-left: 0;
    }
    margin-left: 8px;
`;

const AccordionFrameWrapper = styled.div`
    margin-bottom: -${({theme}) => theme.spacing.contentBottom}px;
`;

export interface IContractAccordionItemConfig extends IAccordionItemConfig {
    label: string;
    disabled?: boolean;
    value?: number | undefined;
}

export interface IContractAccordionProps {
    contentHeight: number;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
}

export class ContractAccordion extends React.PureComponent<IContractAccordionProps> {
    render() {
        let { translation: tr } = this.props;

        return <>
            <AccordionHorizontal
                label={tr.get("accountView.contract.info.label")}
                noDataContent={<NotAvailableBox translation={tr} />}
                renderExpander={this.renderExpander}
                renderContent={this.renderContent}
                loadingText={`${tr.get("general.loading")}...`}
                contentAnimSeconds={CONTENT_ANIM_SECONDS}
                errorText={tr.get("general.error")}
                onContentError={(e, item) => {
                    this.props.logger.error(`Couldn't load content for contract details tab #${item.index}`, e);
                }}
            >{this.props.children}</AccordionHorizontal>
        </>;
    }

    private renderExpander: IAccordionHorizontalProps<IContractAccordionItemConfig>["renderExpander"] =
    ({config, isOpen, onClick}) => {
        return <ExpanderWrapper><Expander
            label={config.label}
            value={config.value}
            disabled={config.disabled}
            open={isOpen}
            locale={this.props.locale}
            onClick={onClick}
        /></ExpanderWrapper>;
    }

    private renderContent: IAccordionHorizontalProps<IContractAccordionItemConfig>["renderContent"] =
    ({content, status, arrowPosition}) => {

        return <ThemeContext.Consumer>{ theme =>
            <AccordionFrameWrapper style={{marginLeft: -theme.spacing.sidebarWidth}}>
                <AccordionContentFrame arrowPosition={arrowPosition ?
                    arrowPosition + theme.spacing.sidebarWidth :
                    void 0
                }>
                    {/* key ensure component remounts/scrolls into view whenever status changes*/}
                    {/* HACK: Seems waiting for height animation to finish is not enough so we add a bit extra */}
                    <ScrollIntoView delay={CONTENT_ANIM_SECONDS + .1} key={status}>
                        <div style={{ minHeight: this.props.contentHeight }}>
                            { status === AccordionItemContentStatus.Loaded ?
                                content :
                                status === AccordionItemContentStatus.Error ?
                                    <ErrorBox colors="secondary">
                                        {this.props.translation.get("accountView.contract.noData.text")}
                                    </ErrorBox> :
                                    <LoadingBox colors="secondary" translation={this.props.translation} />
                            }
                        </div>
                    </ScrollIntoView>
                </AccordionContentFrame>
            </AccordionFrameWrapper>
        }</ThemeContext.Consumer>;
    }
}
