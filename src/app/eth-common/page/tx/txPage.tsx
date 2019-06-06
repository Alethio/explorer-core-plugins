import React from "react";
import { IPageDef } from "plugin-api/IPageDef";
import { TxPageSlotType } from "./TxPageSlotType";
import { TxPageTemplate } from "./component/TxPageTemplate";
import { txContextType } from "app/shared/context/txContextType";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";

export interface ITxPageContext {
    txHash: string;
}

export const txPage: IPageDef<TxPageSlotType, ITxPageContext> = {
    contextType: txContextType,
    paths: {
        "/Tx_:txHash": params => `/tx/0x${params.txHash.replace(/^0x/, "")}`,
        "/tx/:txHash([a-fA-F0-9]+)": params => `/tx/0x${params.txHash}`,
        "/tx/0x:txHash([a-fA-F0-9]+)": params => ({ txHash: params.txHash })
    },
    buildCanonicalUrl: ({ txHash }) => `/tx/0x${txHash.replace(/^0x/, "")}`,
    hasSidebar: true,
    getPageTemplate: () => TxPageTemplate,
    getErrorPlaceholder(data) {
        let { translation } = data;

        return <ErrorBox>
            <span dangerouslySetInnerHTML={{__html: translation.get("txView.content.noData.text") }} />
        </ErrorBox>;
    }
};
