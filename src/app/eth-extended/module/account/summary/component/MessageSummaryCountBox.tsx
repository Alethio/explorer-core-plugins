import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { Number } from "@alethio/ui/lib/data/Number";

const MessageSummaryCountBoxRoot = styled.div`
    display: flex;
    align-items: center;
`;

interface IMessageSummaryCountBoxProps {
    icon: React.ReactNode;
    count: number;
    locale: string;
}

export class MessageSummaryCountBox extends React.PureComponent<IMessageSummaryCountBoxProps> {
    render() {
        return (
            <MessageSummaryCountBoxRoot>
                { this.props.icon }
                <ValueBox><Number locale={this.props.locale} value={this.props.count} /></ValueBox>
            </MessageSummaryCountBoxRoot>
        );
    }
}
