import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { Number } from "@alethio/ui/lib/data/Number";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { BigNumber } from "app/util/BigNumber";

const TokenBalanceGridDataRoot = styled.div`
    flex-grow: 1;
    display: flex;
`;
const TokenBalanceGridDataSymbol = styled.span`
    padding-right: 16px;
    color: ${({theme}) => theme.colors.accountSymbolGrid};
    flex-grow: 1;
    font-weight: 700;
`;

export class TokenBalanceRenderer<T> implements IGridFieldRenderer<T> {
    constructor(
        private locale: string,
        private balanceGetter: (f: T) => number | BigNumber,
        private symbolGetter: (f: T) => string
    ) {
    }

    render(f: T) {
        let bigN = this.balanceGetter(f);
        let symbol = this.symbolGetter(f);
        return (
            <TokenBalanceGridDataRoot style={{flexGrow: 1, display: "flex"}}>
                <TokenBalanceGridDataSymbol>{symbol}</TokenBalanceGridDataSymbol>
                <div>
                    <Number value={bigN} locale={this.locale} />
                </div>
            </TokenBalanceGridDataRoot>
        );
    }
}
