import * as React from "react";
import { IPageTemplateProps } from "plugin-api/IPageDef";
import { AccountPageSlotType } from "../AccountPageSlotType";
import { ContentTop } from "./ContentTop";
import { Content } from "./Content";
import { IdenticonWrapper } from "./IdenticonWrapper";
import { ContentBottom } from "./ContentBottom";
import { ContentLeftPadded } from "./ContentLeftPadded";
import { Spacer } from "@alethio/ui/lib/layout/Spacer";

export interface IAccountPageTemplateProps extends IPageTemplateProps<AccountPageSlotType> {

}

export class AccountPageTemplate extends React.Component<IAccountPageTemplateProps> {
    render() {
        let { slots } = this.props;

        return (
            <Content>
                <ContentTop>
                    <IdenticonWrapper>
                        { slots && slots[AccountPageSlotType.Identicon] }
                    </IdenticonWrapper>
                    <div style={{flex: "1 1 auto"}}>
                        { slots && slots[AccountPageSlotType.Top] }
                    </div>
                </ContentTop>
                { slots && slots[AccountPageSlotType.Balance] }
                <ContentBottom>
                    <ContentLeftPadded>
                        <Spacer height="10px" />
                        { slots && (slots[AccountPageSlotType.Bottom] || []).map((s, i) => <React.Fragment key={i}>
                            <Spacer height="48px" />
                            { s }
                        </React.Fragment>) }
                    </ContentLeftPadded>
                </ContentBottom>
            </Content>
        );
    }
}
