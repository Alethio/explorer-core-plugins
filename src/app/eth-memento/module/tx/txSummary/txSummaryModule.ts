import { IModuleDef } from "plugin-api/IModuleDef";
import { ITxSummaryProps } from "./component/TxSummary";
import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { ITxContext } from "app/shared/context/ITxContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { txContextType } from "app/shared/context/txContextType";
import { MementoDataSource } from "app/eth-memento/MementoDataSource";

export const txSummaryModule:
    (options: { dataSource: MementoDataSource; ethSymbol: string; }) => IModuleDef<ITxSummaryProps, ITxContext> =
({ dataSource, ethSymbol }) => ({
    contextType: txContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.TxDetailsMemento
    }],

    getContentComponent: async () => import("./component/TxSummary").then(({ TxSummary }) => TxSummary),

    getContentProps(data) {
        let { asyncData, locale, logger, translation } = data;

        let { logEventsStore } = dataSource.stores;
        let tx = asyncData.get(AlethioAdapterType.TxDetailsMemento)!.data as ITxDetails;

        let props: ITxSummaryProps = {
            locale,
            logEventsStore,
            logger,
            ethSymbol,
            translation,
            tx
        };
        return props;
    },
    getHelpComponent: () => ({ translation }) => translation.get("txView.content.txSummary.help") as any
});
