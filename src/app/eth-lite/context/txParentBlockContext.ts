import { IContextDef } from "plugin-api/IContextDef";
import { ITxPageContext } from "app/eth-common/page/tx/txPage";
import { ITxParentBlockContext } from "app/shared/context/ITxParentBlockContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { txContextType } from "app/shared/context/txContextType";
import { ITxDetails } from "app/eth-lite/data/tx/details/ITxDetails";
import { txParentBlockContextType } from "app/shared/context/txParentBlockContextType";

export const txParentBlockContext: IContextDef<ITxPageContext, ITxParentBlockContext> = {
    parentContextType: txContextType,
    contextType: txParentBlockContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsLite
    }],

    create(parentCtx, parentData) {
        let txDetails = parentData.get(AlethioAdapterType.TxDetailsLite)!.data as ITxDetails;

        let ctx: ITxParentBlockContext = {
            txHash: parentCtx.txHash,
            blockNumber: txDetails.block.id
        };
        return ctx;
    }
};
