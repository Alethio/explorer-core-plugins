import * as React from "react";
import { UsdValueBox } from "@alethio/ui/lib/data/box/UsdValueBox";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { IBalanceAreaChartPayload } from "./IBalanceAreaChartPayload";
import { CHART_DATA_KEY } from "./BalanceChartData";
import { EthValueBox } from "@alethio/ui/lib/data/box/EthValueBox";
import { Currency } from "@alethio/ui/lib/data/Currency";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";

const Root = styled.div`
    padding: 9px 11px;
    display: flex;
`;

export interface IBalanceChartTooltipTopProps {
    locale: string;
    ethSymbol: string;
    usdPricesEnabled: boolean;
    payload: IBalanceAreaChartPayload;
}

export class BalanceChartTooltipTop extends React.Component<IBalanceChartTooltipTopProps> {
    render() {
        return (
            <Root>
                { this.props.payload.balanceWei !== void 0 ?
                <EthValueBox
                    locale={this.props.locale}
                    wei={this.props.payload.balanceWei}
                    symbol={this.props.ethSymbol}
                    variant="small"
                /> :
                <ValueBox variant="small">
                    <Currency value={this.props.payload.balanceToken!} symbol={this.props.ethSymbol}
                        locale={this.props.locale} />
                </ValueBox>
                }
                { this.props.usdPricesEnabled ?
                <UsdValueBox
                    locale={this.props.locale}
                    value={this.props.payload[CHART_DATA_KEY]}
                    variant="small"
                /> : null }
            </Root>
        );
    }
}
