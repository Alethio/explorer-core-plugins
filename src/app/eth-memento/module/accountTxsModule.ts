import { IModuleDef } from "plugin-api/IModuleDef";
import { ISummaryProps } from "./component/Summary";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { accountContextType } from "app/shared/context/accountContextType";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { TxLiteByAccountStore } from "app/eth-memento/data/tx/byAccount/TxLiteByAccountStore";

export const accountTxsModule: (options: {
    store: TxLiteByAccountStore,
    ethSymbol: string;
}) => IModuleDef<ISummaryProps, IAccountContext> =
({ store, ethSymbol }) => ({
    contextType: accountContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.LatestBlockNumber
    }],
    getContentComponent: async () => import("./component/Summary").then(({ Summary }) => Summary),
    getContentProps(data) {
        let { locale, translation, logger, asyncData, context } = data;

        let latestBlockNumber = asyncData.get(AlethioAdapterType.LatestBlockNumber)!.data as number;
        let props: ISummaryProps = {
            accountHash: context.accountHash,
            locale,
            ethSymbol,
            logger,
            translation,
            latestBlockNumber,
            txLiteByAccountStore: store
        };
        return props;
    }
});
