import React from "react";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { IPageDef } from "plugin-api/IPageDef";
import { CmPageSlotType } from "./CmPageSlotType";
import { CmPageTemplate } from "./CmPageTemplate";
import { cmContextType } from "app/shared/context/cmContextType";

export interface ICmPageContext {
    txHash: string;
    validationIndex: number;
}

export const cmPage: IPageDef<CmPageSlotType, ICmPageContext> = {
    contextType: cmContextType,
    paths: {
        "/ContractMsg_0x:txHash([a-fA-F0-9]+)_:validationIdx(\\d+)": params =>
            `/tx/0x${params.txHash}/cm/${params.validationIdx}`,
        "/tx/:txHash([a-fA-F0-9]+)/cm/:validationIdx(\\d+)": params =>
            `/tx/0x${params.txHash}/cm/${params.validationIdx}`,
        "/tx/0x:txHash([a-zA-Z0-9]+)/cm/:validationIdx(\\d+)": params => ({
            txHash: params.txHash,
            validationIndex: Number(params.validationIdx)
        })
    },
    buildCanonicalUrl: ({ txHash, validationIndex }) => `/tx/0x${txHash.replace(/^0x/, "")}/cm/${validationIndex}`,
    hasSidebar: true,
    getPageTemplate: () => CmPageTemplate,
    getErrorPlaceholder(data) {
        let { translation } = data;

        return <ErrorBox>
            <span dangerouslySetInnerHTML={{__html: translation.get("cmView.content.noData.text") }} />
        </ErrorBox>;
    }
};
