import * as React from "react";
import { IPageTemplateProps } from "plugin-api/IPageDef";
import { Container } from "@alethio/ui/lib/layout/Container";
import { Content } from "@alethio/ui/lib/layout/Content";
import { TxPageSlotType } from "../TxPageSlotType";

export interface ITxPageTemplateProps extends IPageTemplateProps<TxPageSlotType> {

}

export class TxPageTemplate extends React.Component<ITxPageTemplateProps> {
    render() {
        return (
            <Container>
                { this.props.slots[TxPageSlotType.Sidebar] }
                <Content>
                    { this.props.slots[TxPageSlotType.Content] }
                </Content>
            </Container>
        );
    }
}
