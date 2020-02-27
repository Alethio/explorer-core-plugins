import * as React from "react";
import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxLiteByAccount } from "app/eth-memento/data/tx/byAccount/ITxLiteByAccount";
import { Tooltip } from "@alethio/ui/lib/overlay/tooltip/Tooltip";
import { ErrorSmallIcon } from "@alethio/ui/lib/icon/ErrorSmallIcon";

export class TxStatusRenderer implements IGridFieldRenderer<ITxLiteByAccount> {

    constructor(private translation: ITranslation) {}

    render(f: ITxLiteByAccount) {
        return <div>
            { f.success === false ?
                <Tooltip placement="left" content={this.translation.get("txView.content.txStatus.error")}>
                    <ErrorSmallIcon size={24} />
                </Tooltip>
            : null }
        </div>;
    }
}
