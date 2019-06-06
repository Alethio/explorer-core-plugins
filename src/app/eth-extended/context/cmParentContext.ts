import { IContextDef } from "plugin-api/IContextDef";
import { ICmPageContext } from "app/eth-extended/page/cm/cmPage";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";
import { ICmParentContext } from "./ICmParentContext";
import { cmContextType } from "app/shared/context/cmContextType";
import { cmParentContextType } from "app/eth-extended/context/cmParentContextType";

export const cmParentContext: IContextDef<ICmPageContext, ICmParentContext> = {
    parentContextType: cmContextType,
    contextType: cmParentContextType,

    dataAdapters: [{
        ref: "adapter://aleth.io/cm/details"
    }],

    create(parentCtx, parentData) {
        let txDetails = parentData.get("adapter://aleth.io/cm/details")!.data as ICmDetails;

        let ctx: ICmParentContext = {
            txHash: parentCtx.txHash,
            parentValidationIndex: txDetails.parentTxValidationIndex,
            validationIndex: parentCtx.validationIndex
        };
        return ctx;
    }
};
