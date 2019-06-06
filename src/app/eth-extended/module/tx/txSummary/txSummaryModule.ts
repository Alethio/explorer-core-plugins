import { IModuleDef } from "plugin-api/IModuleDef";
import { ITxSummaryProps } from "./component/TxSummary";
import { AlethioDataSource } from "../../../AlethioDataSource";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";
import { ITxContext } from "../../../../shared/context/ITxContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { txContextType } from "app/shared/context/txContextType";

export const txSummaryModule:
    (dataSource: AlethioDataSource) => IModuleDef<ITxSummaryProps, ITxContext> =
(dataSource) => ({
    contextType: txContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsExtended
    }],
    getContentComponent: async () => import("./component/TxSummary").then(({ TxSummary }) => TxSummary),
    getContentProps(data) {
        let { asyncData, locale, logger, translation } = data;

        let { cmLiteStore, logEventsStore, tokenTransferStore, txGraphStore } = dataSource.stores;
        let tx = asyncData.get(AlethioAdapterType.TxDetailsExtended)!.data as ITxDetails;

        let props: ITxSummaryProps = {
            cmLiteStore,
            locale,
            logEventsStore,
            logger,
            tokenTransferStore,
            translation,
            tx,
            txGraphStore
        };
        return props;
    }
});
