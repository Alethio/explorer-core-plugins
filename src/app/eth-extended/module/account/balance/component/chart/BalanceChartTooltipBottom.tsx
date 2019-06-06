import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { IBalanceAreaChartPayload } from "./IBalanceAreaChartPayload";
import { ShortDate } from "@alethio/ui/lib/data/ShortDate";

const Root = styled.div`
    padding: 3px 12px 5px 12px;
    font-size: 12px;
    line-height: 14px;
    font-weight: 600;
    color: ${props => props.theme.colors.valueBox.secondary.text};
`;

export interface IBalanceChartTooltipBottomProps {
    locale: string;
    payload: IBalanceAreaChartPayload;
}

export class BalanceChartTooltipBottom extends React.Component<IBalanceChartTooltipBottomProps> {
    render() {
        return (
            <Root>
                <ShortDate
                    timestamp={this.props.payload.timestamp}
                    locale={this.props.locale}
                />
            </Root>
        );
    }
}
