import * as React from "react";
import { Container } from "@alethio/ui/lib/layout/Container";
import { Content } from "@alethio/ui/lib/layout/Content";
import { Sidebar } from "@alethio/ui/lib/layout/sidebar/Sidebar";
import { LogoContainer } from "@alethio/ui/lib/layout/sidebar/LogoContainer";
import { Spacer } from "@alethio/ui/lib/layout/Spacer";
import { SidebarPageTitle } from "@alethio/ui/lib/layout/sidebar/SidebarPageTitle";
import { Logo } from "./Logo";
import { PolicyContent } from "./PolicyContent";
import { IPageTemplateProps } from "plugin-api/IPageDef";

interface IPrivacyPolicyTemplateProps extends IPageTemplateProps<string> {
}

export class PrivacyPolicyTemplate extends React.Component<IPrivacyPolicyTemplateProps> {
    render() {
        return (
            <Container>
                <Sidebar sticky mobileVisible={this.props.sidebarVisible}>
                    <SidebarPageTitle>Privacy Policy</SidebarPageTitle>
                    <LogoContainer>
                        <Logo>Pp</Logo>
                    </LogoContainer>
                    <Spacer height="64px" />
                </Sidebar>
                <Content>
                    <PolicyContent />
                </Content>
            </Container>
        );
    }
}
