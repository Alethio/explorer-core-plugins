import * as React from "react";
import { IPageTemplateProps } from "plugin-api/IPageDef";
import { AccountPageSlotType } from "../AccountPageSlotType";
import { IdenticonWrapper } from "./IdenticonWrapper";
import { Spacer } from "@alethio/ui/lib/layout/Spacer";
import { Container } from "@alethio/explorer-ui/lib/layout/Container";
import { Sidebar } from "@alethio/explorer-ui/lib/layout/sidebar/Sidebar";
import { Content } from "@alethio/explorer-ui/lib/layout/Content";
import styled from "@alethio/ui/lib/styled-components";

const SidebarTop = styled.div`
    /** Sidebar only has 38px padding, so we need to get to 48px total to align with the content */
    padding-top: 10px;
`;

export interface IAccountPageTemplateProps extends IPageTemplateProps<AccountPageSlotType> {

}

export class AccountPageTemplate extends React.Component<IAccountPageTemplateProps> {
    render() {
        let { slots } = this.props;

        return (
            <Container>
                <Sidebar sticky mobileVisible={this.props.sidebarVisible}>
                    <SidebarTop>
                        { slots && slots[AccountPageSlotType.Identicon] ?
                        <IdenticonWrapper>
                            { slots && slots[AccountPageSlotType.Identicon] }
                        </IdenticonWrapper>
                        : null }
                    </SidebarTop>
                    { slots && slots[AccountPageSlotType.Sidebar] }
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
