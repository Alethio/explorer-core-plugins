import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxLiteByAccountMined } from "app/eth-extended/data/tx/lite/byAccount/mined/ITxLiteByAccountMined";
import { TxType } from "app/eth-extended/data/tx/TxType";

export class TxTypeRenderer implements IGridFieldRenderer<ITxLiteByAccountMined> {
    constructor(
        private translation: ITranslation
    ) {
    }

    render(f: ITxLiteByAccountMined) {
        return this.translation.get(
            "general.tx.type." + TxType[f.type]
        );
    }
}
