import * as React from "react";
import { IPageTemplateProps } from "plugin-api/IPageDef";
import { AccountPageSlotType } from "../AccountPageSlotType";
import { IdenticonWrapper } from "./IdenticonWrapper";
import { Spacer } from "@alethio/ui/lib/layout/Spacer";
import { Container } from "@alethio/ui/lib/layout/Container";
import { Sidebar } from "@alethio/ui/lib/layout/sidebar/Sidebar";
import { Content } from "@alethio/ui/lib/layout/Content";

export interface IAccountPageTemplateProps extends IPageTemplateProps<AccountPageSlotType> {

}

export class AccountPageTemplate extends React.Component<IAccountPageTemplateProps> {
    render() {
        let { slots } = this.props;

        return (
            <Container>
                <Sidebar sticky mobileVisible={this.props.sidebarVisible}>
                    <IdenticonWrapper>
                        { slots && slots[AccountPageSlotType.Identicon] }
                    </IdenticonWrapper>
                </Sidebar>
                <Content>
                    { slots && slots[AccountPageSlotType.Top] }
                    { slots && slots[AccountPageSlotType.Balance] }
                    <Spacer height="10px" />
                    { slots && (slots[AccountPageSlotType.Bottom] || []).map((s, i) => <React.Fragment key={i}>
                        <Spacer height="48px" />
                        { s }
                    </React.Fragment>) }
                </Content>
            </Container>
        );
    }
}
