import { IGridFieldRenderer } from "@alethio/ui/lib/control/grid/state/IGridFieldRenderer";
import { ITranslation } from "plugin-api/ITranslation";
import { CmType } from "app/eth-extended/data/contractMsg/CmType";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";

export class CmTypeRenderer implements IGridFieldRenderer<ICmLite> {
    constructor(
        private translation: ITranslation
    ) {
    }

    render(f: ICmLite) {
        return this.translation.get(
            "general.contractMsg.type." + CmType[f.type]
        );
    }
}
