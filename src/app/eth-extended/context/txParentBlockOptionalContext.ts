import { IContextDef } from "plugin-api/IContextDef";
import { ITxPageContext } from "app/eth-common/page/tx/txPage";
import { ITxParentBlockOptionalContext } from "app/eth-extended/context/ITxParentBlockOptionalContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { isPendingTxDetails } from "app/eth-extended/data/tx/details/isPendingTxDetails";
import { txContextType } from "app/shared/context/txContextType";
import { txParentBlockContextType } from "app/shared/context/txParentBlockContextType";

export const txParentBlockOptionalContext: IContextDef<ITxPageContext, ITxParentBlockOptionalContext> = {
    parentContextType: txContextType,
    contextType: txParentBlockContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsExtended
    }],

    create(parentCtx, parentData) {
        let txDetails = parentData.get(AlethioAdapterType.TxDetailsExtended)!.data as ITxDetails;

        let ctx: ITxParentBlockOptionalContext = {
            txHash: parentCtx.txHash,
            blockNumber: !isPendingTxDetails(txDetails) ? txDetails.block.id : void 0
        };
        return ctx;
    }
};
