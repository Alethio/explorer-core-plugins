import { IContextDef } from "plugin-api/IContextDef";
import { ITxPageContext } from "app/eth-common/page/tx/txPage";
import { ITxParentBlockContext } from "app/shared/context/ITxParentBlockContext";
import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { isPendingTxDetails } from "app/eth-extended/data/tx/details/isPendingTxDetails";
import { txContextType } from "app/shared/context/txContextType";
import { txParentBlockContextType } from "app/shared/context/txParentBlockContextType";

export const txParentBlockContext: (options: {
    txDetailsAdapterUri: string;

}) => IContextDef<ITxPageContext, ITxParentBlockContext> = ({txDetailsAdapterUri}) => ({
    parentContextType: txContextType,
    contextType: txParentBlockContextType,

    dataAdapters: [{
        ref: txDetailsAdapterUri
    }],

    create(parentCtx, parentData) {
        let txDetails = parentData.get(txDetailsAdapterUri)!.data as ITxDetails;

        if (isPendingTxDetails(txDetails)) {
            return void 0;
        }

        let ctx: ITxParentBlockContext = {
            txHash: parentCtx.txHash,
            blockNumber: txDetails.block.id
        };
        return ctx;
    }
});
