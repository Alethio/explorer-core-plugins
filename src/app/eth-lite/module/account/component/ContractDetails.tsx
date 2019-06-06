import * as React from "react";
import { IAccordionItemConfig } from "@alethio/ui/lib/control/accordion/IAccordionItemConfig";
import { ILogger } from "plugin-api/ILogger";
import { ITranslation } from "plugin-api/ITranslation";
import { SourceCodeAsyncRenderer } from "app/shared/component/sourceCode/SourceCodeAsyncRenderer";
import { AccountCodeRenderer } from "app/shared/component/sourceCode/AccountCodeRenderer";
import { ContractAccordion } from "app/shared/component/sourceCode/ContractAccordion";
import { AccordionItem } from "@alethio/ui/lib/control/accordion/AccordionItem";

const ACCORDION_CONTENT_HEIGHT = 500;

interface IContractAccordionItemConfig extends IAccordionItemConfig {
    label: string;
    disabled?: boolean;
}

export interface IContractDetailsProps {
    accountCode: string;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
}

export class ContractDetails extends React.PureComponent<IContractDetailsProps> {
    render() {
        let { translation: tr, locale, logger } = this.props;
        let accountCode = this.props.accountCode;
        let sourceCodeAsyncRenderer = new SourceCodeAsyncRenderer(ACCORDION_CONTENT_HEIGHT);

        return <ContractAccordion
            contentHeight={ACCORDION_CONTENT_HEIGHT}
            locale={locale}
            translation={tr}
            logger={logger}
        >
            <AccordionItem<IContractAccordionItemConfig>
                label={tr.get("accountView.contract.accountCode.label")}
                disabled={!accountCode}
                content={async () => {
                    return new AccountCodeRenderer(sourceCodeAsyncRenderer).render(async () => accountCode, tr);
                }}
            />
        </ContractAccordion>;
    }
}
