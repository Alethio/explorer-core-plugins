import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxLiteByAccountMined } from "app/eth-extended/data/tx/lite/byAccount/mined/ITxLiteByAccountMined";
import { TxTypeRenderer } from "app/eth-extended/module/account/summary/component/txsGrid/TxTypeRenderer";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { Tooltip } from "@alethio/ui/lib/overlay/tooltip/Tooltip";
import { ErrorSmallIcon } from "@alethio/ui/lib/icon/ErrorSmallIcon";

const IconWrapper = styled.div`
    position: absolute;
    left: -8px;
    top: -4px;
    transform: translateX(-100%);
`;

export class TxTypeExtraRenderer implements IGridFieldRenderer<ITxLiteByAccountMined> {
    private txTypeRenderer: TxTypeRenderer;

    constructor(
        private translation: ITranslation
    ) {
        this.txTypeRenderer = new TxTypeRenderer(translation);
    }

    render(f: ITxLiteByAccountMined) {
        return <div style={{ position: "relative" }}>
            { f.error ?
            <IconWrapper>
                <Tooltip placement="left" content={
                    typeof f.error === "string" ?
                        f.error :
                        this.translation.get("txView.content.txStatus.error")
                }>
                    <ErrorSmallIcon size={24} />
                </Tooltip>
            </IconWrapper>
            : null }
            {this.txTypeRenderer.render(f)}
        </div>;
    }
}
