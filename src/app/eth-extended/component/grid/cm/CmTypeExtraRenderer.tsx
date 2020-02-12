import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { Tooltip } from "@alethio/ui/lib/overlay/tooltip/Tooltip";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { CmTypeRenderer } from "app/eth-extended/component/grid/cm/CmTypeRenderer";
import { ErrorSmallIcon } from "@alethio/ui/lib/icon/ErrorSmallIcon";

const ErrorWrapper = styled.div`
    position: absolute;
    left: -8px;
    top: -4px;
    transform: translateX(-100%);
`;

export class CmTypeExtraRenderer implements IGridFieldRenderer<ICmLite> {
    private cmTypeRenderer: CmTypeRenderer;

    constructor(
        private translation: ITranslation
    ) {
        this.cmTypeRenderer = new CmTypeRenderer(translation);
    }

    render(f: ICmLite) {
        return <div style={{ position: "relative" }}>
            { f.error ? <ErrorWrapper>
                <Tooltip placement="left" content={
                    typeof f.error === "string" ?
                        f.error :
                        this.translation.get("txView.content.txStatus.error")
                }>
                    <ErrorSmallIcon size={24} />
                </Tooltip>
            </ErrorWrapper> : null }
            {this.cmTypeRenderer.render(f)}
        </div>;
    }
}
