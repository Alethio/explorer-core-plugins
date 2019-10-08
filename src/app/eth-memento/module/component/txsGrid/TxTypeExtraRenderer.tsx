import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxLiteByAccount } from "app/eth-memento/data/tx/byAccount/ITxLiteByAccount";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { TooltipRegular } from "@alethio/ui/lib/overlay/tooltip/TooltipRegular";
import { ErrorSmallIcon } from "@alethio/ui/lib/icon/ErrorSmallIcon";

const IconWrapper = styled.div`
    position: absolute;
    left: -8px;
    top: -4px;
    transform: translateX(-100%);
`;

export class TxTypeExtraRenderer implements IGridFieldRenderer<ITxLiteByAccount> {

    constructor(private translation: ITranslation) {}

    render(f: ITxLiteByAccount) {
        return <div style={{ position: "relative" }}>
            { f.error === false ?
            <IconWrapper>
                <TooltipRegular placement="left" content={this.translation.get("txView.content.txStatus.error")}>
                    <ErrorSmallIcon size={24} />
                </TooltipRegular>
            </IconWrapper>
            : null }
            {/* TODO: Move to translations */}
            Tx
        </div>;
    }
}
