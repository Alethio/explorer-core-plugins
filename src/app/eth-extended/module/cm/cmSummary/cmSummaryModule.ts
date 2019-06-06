import { IModuleDef } from "plugin-api/IModuleDef";
import { ICmSummaryProps, CmSummary } from "./CmSummary";
import { ICmContext } from "../../../context/ICmContext";
import { AlethioDataSource } from "../../../AlethioDataSource";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";
import { cmContextType } from "app/shared/context/cmContextType";

export const cmSummaryModule:
    (dataSource: AlethioDataSource) => IModuleDef<ICmSummaryProps, ICmContext> =
(dataSource) => ({
    contextType: cmContextType,

    dataAdapters: [{
        ref: "adapter://aleth.io/cm/details"
    }],
    getContentComponent: async () => CmSummary,
    getContentProps(data) {
        let { asyncData, locale, logger, translation } = data;

        let { cmLiteStore, logEventsStore, tokenTransferStore } = dataSource.stores;
        let cm = asyncData.get("adapter://aleth.io/cm/details")!.data as ICmDetails;

        let props: ICmSummaryProps = {
            cmLiteStore,
            locale,
            logEventsStore,
            logger,
            tokenTransferStore,
            translation,
            cm
        };
        return props;
    }
});
