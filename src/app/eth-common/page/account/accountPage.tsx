import React from "react";
import { IPageDef } from "plugin-api/IPageDef";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { AccountPageSlotType } from "./AccountPageSlotType";
import { AccountPageTemplate } from "./component/AccountPageTemplate";
import { accountContextType } from "app/shared/context/accountContextType";

export interface IAccountPageContext {
    accountHash: string;
}

export const accountPage: IPageDef<AccountPageSlotType, IAccountPageContext> = {
    contextType: accountContextType,
    paths: {
        "/address/:accountHash": params => `/account/0x${params.accountHash.replace(/^0x/, "")}`,
        "/Account_:accountHash": params => `/account/0x${params.accountHash.replace(/^0x/, "")}`,
        "/account/:accountHash([a-fA-F0-9]+)": params => `/account/0x${params.accountHash}`,
        "/account/0x:accountHash([a-fA-F0-9]+)": params => ({ accountHash: params.accountHash })
    },
    buildCanonicalUrl: ({ accountHash }) => `/account/0x${accountHash.replace(/^0x/, "")}`,
    getPageTemplate: () => AccountPageTemplate,
    getErrorPlaceholder(data) {
        let { translation } = data;

        return <ErrorBox>
            <span dangerouslySetInnerHTML={{__html: translation.get("accountView.content.noData.text") }} />
        </ErrorBox>;
    }
};
