import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { MsgCountOutSmallIcon } from "@alethio/ui/lib/icon/MsgCountOutSmallIcon";
import { MsgCountInSmallIcon } from "@alethio/ui/lib/icon/MsgCountInSmallIcon";
import { TooltipRegular } from "@alethio/ui/lib/overlay/tooltip/TooltipRegular";
import { ITranslation } from "plugin-api/ITranslation";

let ICON_SIZE = 24;

// TODO: make grid cell padding configurable to avoid this hack
const DirectionWrapper = styled.div`
    position: relative;
    margin-top: -2px;

    > * {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }
`;

interface IFromTo {
    from: string;
    to: string;
}

export class TransferDirectionRenderer implements IGridFieldRenderer<IFromTo> {
    constructor(private accountAddress: string, private tr: ITranslation) {
    }

    render(f: IFromTo) {
        let directionOut = f.from === this.accountAddress;

        return <DirectionWrapper>
            { directionOut ?
                <TooltipRegular
                    content={this.tr.get("accountView.content.transferDirection.outgoing.tooltip")}
                >
                    <MsgCountOutSmallIcon size={ICON_SIZE}/>
                </TooltipRegular>
                 :
                <TooltipRegular
                    content={this.tr.get("accountView.content.transferDirection.incoming.tooltip")}
                >
                    <MsgCountInSmallIcon size={ICON_SIZE} />
                </TooltipRegular>
            }
        </DirectionWrapper>;
    }
}
