import * as React from "react";
import { Container } from "@alethio/explorer-ui/lib/layout/Container";
import { Sidebar } from "@alethio/explorer-ui/lib/layout/sidebar/Sidebar";
import { Content } from "@alethio/explorer-ui/lib/layout/Content";
import { SidebarPageTitle } from "@alethio/explorer-ui/lib/layout/sidebar/SidebarPageTitle";
import { LogoContainer } from "@alethio/explorer-ui/lib/layout/sidebar/LogoContainer";
import { IPageTemplateProps } from "plugin-api/IPageDef";
import { UnclePageSlotType } from "../UnclePageSlotType";
import { Logo } from "./Logo";

export interface IUnclePageTemplateProps extends IPageTemplateProps<UnclePageSlotType> {

}

export class UnclePageTemplate extends React.Component<IUnclePageTemplateProps> {
    render() {
        let { translation: tr } = this.props;

        return (
            <Container>
                <Sidebar sticky>
                    <SidebarPageTitle>{ tr.get("uncleView.sidebar.title") }</SidebarPageTitle>
                    <LogoContainer>
                        <Logo>{tr.get("uncleView.sidebar.logo")}</Logo>
                    </LogoContainer>
                </Sidebar>
                <Content>
                    { this.props.slots[UnclePageSlotType.Content] }
                </Content>
            </Container>
        );
    }
}
