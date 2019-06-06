import * as React from "react";
import { IPageTemplateProps } from "plugin-api/IPageDef";
import { Container } from "@alethio/ui/lib/layout/Container";
import { Content } from "@alethio/ui/lib/layout/Content";
import { CmPageSlotType } from "./CmPageSlotType";

export interface ICmPageTemplateProps extends IPageTemplateProps<CmPageSlotType> {

}

export class CmPageTemplate extends React.Component<ICmPageTemplateProps> {
    render() {
        return (
            <Container>
                { this.props.slots[CmPageSlotType.Sidebar] }
                <Content>
                    { this.props.slots[CmPageSlotType.Content] }
                </Content>
            </Container>
        );
    }
}
