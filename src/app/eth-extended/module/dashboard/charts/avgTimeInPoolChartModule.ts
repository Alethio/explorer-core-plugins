import { IModuleDef } from "plugin-api/IModuleDef";
import { IPendingPoolInfo } from "app/eth-extended/module/dashboard/charts/data/IPendingPoolInfo";
import { IAvgTimeInPoolProps, AvgTimeInPool } from "./component/AvgTimeInPool";
import { ILatestBlockRangeContext } from "../../../../shared/context/ILatestBlockRangeContext";
import { IBlockTxTimeInPool } from "app/eth-extended/data/block/txTimeInPool/IBlockTxTimeInPool";
import { blockRangeContextType } from "app/shared/context/blockRangeContextType";

export const avgTimeInPoolChartModule: IModuleDef<IAvgTimeInPoolProps, ILatestBlockRangeContext> = {
    contextType: blockRangeContextType,

    dataAdapters: [{
        ref: "adapter://aleth.io/avgTxTimeInPool"
    }, {
        ref: "adapter://aleth.io/pendingPoolInfo"
    }],

    getContentComponent() {
        return Promise.resolve(AvgTimeInPool);
    },

    getContentProps(data) {
        let { translation, asyncData, context } = data;

        let blockValues = asyncData.get("adapter://aleth.io/avgTxTimeInPool")!.data as (
            IBlockTxTimeInPool | undefined)[];
        let pendingPoolInfo = asyncData.get("adapter://aleth.io/pendingPoolInfo")!.data as IPendingPoolInfo;

        let props: IAvgTimeInPoolProps = {
            blockValues,
            context,
            pendingPoolInfo,
            translation
        };
        return props;
    }
};
