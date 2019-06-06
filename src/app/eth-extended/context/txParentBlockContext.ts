import { IContextDef } from "plugin-api/IContextDef";
import { ITxPageContext } from "app/eth-common/page/tx/txPage";
import { ITxParentBlockContext } from "app/shared/context/ITxParentBlockContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { isPendingTxDetails } from "app/eth-extended/data/tx/details/isPendingTxDetails";
import { txContextType } from "app/shared/context/txContextType";
import { txParentBlockContextType } from "app/shared/context/txParentBlockContextType";

export const txParentBlockContext: IContextDef<ITxPageContext, ITxParentBlockContext> = {
    parentContextType: txContextType,
    contextType: txParentBlockContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsExtended
    }],

    create(parentCtx, parentData) {
        let txDetails = parentData.get(AlethioAdapterType.TxDetailsExtended)!.data as ITxDetails;

        if (isPendingTxDetails(txDetails)) {
            return void 0;
        }

        let ctx: ITxParentBlockContext = {
            txHash: parentCtx.txHash,
            blockNumber: txDetails.block.id
        };
        return ctx;
    }
};
