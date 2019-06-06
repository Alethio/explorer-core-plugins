import * as React from "react";
import { Sidebar } from "@alethio/ui/lib/layout/sidebar/Sidebar";
import { Spacer } from "@alethio/ui/lib/layout/Spacer";
import { LogoContainer } from "@alethio/ui/lib/layout/sidebar/LogoContainer";
import { SidebarPageTitle } from "@alethio/ui/lib/layout/sidebar/SidebarPageTitle";
import { Container } from "@alethio/ui/lib/layout/Container";
import { Content } from "@alethio/ui/lib/layout/Content";
import { IPageTemplateProps } from "plugin-api/IPageDef";
import { Logo } from "./Logo";
import { BlockPageSlotType } from "../BlockPageSlotType";

export class BlockPageTemplate extends React.Component<IPageTemplateProps<BlockPageSlotType>, {}> {
    render() {
        let tr = this.props.translation;

        return <Container>
            <Sidebar sticky mobileVisible={this.props.sidebarVisible}>
                <SidebarPageTitle>{ tr.get("blockView.sidebar.title") }</SidebarPageTitle>
                <LogoContainer>
                    <Logo>{tr.get("blockView.sidebar.logo")}</Logo>
                </LogoContainer>
                <Spacer height="48px" />
                { this.props.slots[BlockPageSlotType.Sidebar] }
            </Sidebar>
            <Content>
                { this.props.slots[BlockPageSlotType.Content] }
            </Content>
        </Container>;
    }
}
